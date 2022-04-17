import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    // From AWS config window
    UserPoolId: 'us-east-1_lC8xfGpto',
    ClientId: '4una2d0ucjjsi3btle0lm857ei'
}

export default new CognitoUserPool(poolData);