const {google} = require("googleapis");
require('dotenv').config();

async function insertRow() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const spreadsheetId = process.env.SPREADSHEETID;

    let requests = [{
        insertRange: {
            range: {
                sheetId: 282054145,
                startRowIndex: 6,
                endRowIndex: 25,
                startColumnIndex: 0,
            },
            shiftDimension: "ROWS"
        }
    }];

    const batchUpdateRequest = {requests};

    const addRows = await googleSheets.spreadsheets.batchUpdate({
        auth,
        spreadsheetId,
        resource: batchUpdateRequest,
        }, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log("rows added.");
        }
    });
}


module.exports = { insertRow };
