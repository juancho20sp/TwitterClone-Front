import React, { createContext } from 'react';

import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../../utils/aws/UserPool';

const AccountContext = createContext();

// CONTEXT TO VERIFY THAT THE USER IS LOGGED IN
const Account = ({ children }) => {
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

          resolve({ user, ...session, ...attributes });
        });
      } else {
        reject();
      }
    });
  };

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
        },
        onFailure: (err) => {
          console.log(err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log(data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();

    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
