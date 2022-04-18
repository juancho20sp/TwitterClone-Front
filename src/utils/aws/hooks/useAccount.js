import React from 'react';

// Navigation
import  routes  from '../../routing/routes';
import { useNavigate } from 'react-router-dom';


// Redux
import { useDispatch } from 'react-redux';
import { login, logout as reduxLogout, setUserData } from '../../../redux/slices/loginSlice';

// AWS
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

const useAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Used to retrieve the current user session
     * @returns The attributes of the user || error
     */
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();

            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject();
                    }

                    const attributes = await new Promise((resolve, reject) => {
                        user.getUserAttributes((err, attributes) => {
                        if (err) {
                            reject();
                        }

                        const results = {};
                        for (let attribute of attributes) {
                            const { Name, Value } = attribute;
                            results[Name] = Value;
                        }

                        resolve(results);
                        });
                    });

                    resolve({ user, ...session, attributes });
                });
            } else {
                reject();
            }
        });
    };

    /**
     * Used to authenticate an user
     * @param {*} Username -> Users username
     * @param {*} Password -> Users password
     * @returns The user data || An error object
     */
    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log(data);
                    resolve(data);

                    dispatch(login(JSON.stringify(data))); 
                    
                    // Set user attributes
                    getSession().then(({attributes}) =>{
                        dispatch(setUserData(attributes));
                    });

                    navigate(routes.home.path);                 
                },
                onFailure: (err) => {
                    console.log(err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log(data);
                    resolve(data);

                    dispatch(login(JSON.stringify(data)));

                    // Set user attributes
                    getSession().then(({attributes}) =>{
                        dispatch(setUserData(attributes));
                    });

                    navigate(routes.home.path); 
                },
            });
        });
    };

    /**
     * Logs out the current user
     */
    const logout = () => {
        const user = Pool.getCurrentUser();

        if (user) {
            user.signOut();
            dispatch(reduxLogout());
        }
    };

  return {
    getSession,
    authenticate,
    logout
  }
};

export default useAccount;
