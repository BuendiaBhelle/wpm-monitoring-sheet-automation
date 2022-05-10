const {google} = require("googleapis");
require('dotenv').config();

async function displaySitesToBeReported() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.SPREADSHEETID;

    // Read rows from google sheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Summary!A7:Q21",
    });

    const data = getRows.data.values;

    const score = ['C', 'D', 'E', 'F'];

    console.log(data.length)

    // Security Score
    try {
        console.log("Security Score Fails:")
        for (let i = 0; i < data.length; i++) {
            var site = data[i][0];
            var security_score = data[i][5];
            var screenshot_link = data[i][12];
    
            if ((security_score === score[0] || security_score === score[1] || security_score === score[2] || security_score === score[3]) && (site !== "CFHEC" && site !== "EPS" && site !== "GPS" && site !== "CDG" && site !== "RLX" && site !== "IN" && site !== "ISC")) {
                console.log("* " + site + " - " + screenshot_link)
            }
        }
        console.log("-----------------------")
    } catch (error) {
        console.log(error);
    }

    // First Byte Time
    try {
        console.log("First Byte Time Fails:")
        for (let j = 0; j < data.length; j++) {
            var site = data[j][0];
            var first_byte_time = data[j][6];
            var screenshot_link = data[j][12];
    
            if ((first_byte_time === score[0] || first_byte_time === score[1] || first_byte_time === score[2] || first_byte_time === score[3]) && (site !== "CFHEC" && site !== "EPS" && site !== "GPS" && site !== "CDG" && site !== "RLX" && site !== "IN" && site !== "ISC")) {
                console.log("* " + site + " - " + screenshot_link)
            }
        }
        console.log("-----------------------")
    } catch (error) {
        console.log(error);
    }

    // Effective Use of CDN
    try {
        console.log("Effective Use of CDN Fails:")
        for (let k = 0; k < data.length; k++) {
            var site = data[k][0];
            var effective_use_of_cdn = data[k][11];
            var screenshot_link = data[k][12];
           
            if (effective_use_of_cdn === "X") {
                console.log("* " + site + " - " + screenshot_link)
            }
        }
    } catch (error) {
        console.log(error);
    }
}
displaySitesToBeReported();

module.exports = { displaySitesToBeReported };
