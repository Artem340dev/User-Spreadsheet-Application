const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const { authUser, getClients } = require('./services/internal_requests_service');
const { createSpreadsheetWithData } = require('./services/sheets_service');

const app = express();
const port = process.env.PORT;

// Middleware of authorizating the user
const authenticateUser = async (req, res, next) => {
    const username = req.query.username;
    const response = await authUser(username);
    if (response.status == 200) {
        req.user = response.data.token;
        next();
    } else {
        res.status(403).json({401: 'Token is empty!'});
    }
}

app.get('/clients', authenticateUser, async (req, res) => {
    const response = await getClients(await req.user);
    
    const clients = response.data.map((client) => Object.entries(client).map(([key, value]) => value));
    
    const linkToSheet = await createSpreadsheetWithData(clients);
    res.send(`<a href=\'${linkToSheet}\'>Go to table</a>`);
});

app.listen(port, () => {
    console.log('The server is running now');
})