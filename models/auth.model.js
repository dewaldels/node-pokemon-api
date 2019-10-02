const { db } = require('./db.model');
const ApiResponse = require('./api-response.model');
const crypto = require('crypto');

class Auth {

    // Generate a new token
    async generateToken() {

        const apiResp = new ApiResponse();

        try {
            const newToken = crypto.randomBytes(32).toString('hex');
            const result = await db.pool.query('INSERT INTO auth_token (token, active) VALUES($1, 1)', [newToken]);

            if (result.rowCount > 0) {
                apiResp.data = {
                    token: newToken
                };
            } else {
                throw new Error('Could not generate a new token.');
            }
            
        }
        catch (e) {
            apiResp.status = 500;
            apiResp.error = e.message;
         }

        return apiResp;
    }


    // Validate an existing token.
    async validateToken(token) {

        try {

            const result = await db.pool.query('SELECT * FROM auth_token WHERE active = 1 AND token = $1', [token]);
            return result.rowCount > 0;

        }
        catch (e) {
            return false;
        }

    }

    getUnauthorizedResp(error = 'Unauthorized', status) {
        const response = new ApiResponse();
        response.status = status;
        response.error = error;
        return response;
    }

}

module.exports.auth = new Auth();