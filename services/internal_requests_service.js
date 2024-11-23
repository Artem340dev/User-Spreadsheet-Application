const axios = require('axios');

const authUser = async (username) => {
    try {
        const url = 'http://94.103.91.4:5000/auth/login';
        const body = {
            'username': username,
        };
    
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return {status: 200, message: 'Request of authenticating user has been successful!', data: response.data};
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return {status: 500, message: 'Internal server error!'}
    }
}

const getClients = async (token) => {
    try {
        const url = 'http://94.103.91.4:5000/clients';
    
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return {status: 200, message: 'The server responsed a result successfully!', data: response.data};
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return {status: 500, message: 'Internal server error!'}
    }
}

module.exports = {authUser, getClients}