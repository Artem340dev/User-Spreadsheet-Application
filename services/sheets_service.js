const axios = require('axios');

const { google } = require('googleapis');
const { readFile } = require('fs').promises;

const createSpreadsheetWithData = async (clients) => {
    const credentials = JSON.parse(await readFile(process.env.SERVICE_ACCOUNT_FILE, 'utf-8'));
    const DATA_TO_WRITE = [['ID', 'Имя', 'Фамилия', 'Пол', 'Адрес', 'Город', 'Телефон', 'Email']].concat(clients);

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/spreadsheets'
        ],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const createResponse = await sheets.spreadsheets.create({
        requestBody: {
            properties: {
                title: 'Клиенты',
            },
        },
    });

    const spreadsheetId = createResponse.data.spreadsheetId;
    console.log(`Создана таблица с ID: ${JSON.stringify(createResponse.data)}`);

    const drive = google.drive({ version: 'v3', auth });

    await drive.permissions.create({
        fileId: spreadsheetId,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    const file = await drive.files.get({
        fileId: spreadsheetId,
        fields: 'webViewLink',
    });

    const range = 'Sheet1!A1';
    await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        requestBody: {
            values: DATA_TO_WRITE,
        },
    });

    const link = file.data.webViewLink;
    return link;
}

module.exports = {createSpreadsheetWithData}