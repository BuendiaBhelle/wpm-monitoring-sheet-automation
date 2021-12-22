const {google} = require("googleapis");
require('dotenv').config();

async function listSitesWithIssues() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const spreadsheetId = process.env.SPREADSHEETID;

    // Read rows from google sheets
    // ACC - LIG SITES ARE NOT INCLUDED YET SINCE SHEETS FOR THOSE AREN'T UNIFORM.
    const bcr = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BCR!A4:O4",
    });

    const gps = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "GPS!A4:O4",
    });

    const fb = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "FB!A175:O175",
    });

    const sj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "SJ!A4:O4",
    });

    const al = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AL!A4:O4",
    });

    const azrs = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AZRS!A4:O4",
    });

    const kfd = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "KFD!A4:O4",
    });

    const nhu = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NHU!A174:O174",
    });

    const isc = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ISC!A20:O20",
    });

    const i_n = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "IN!A4:O4",
    });

    const np = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NP!A4:O4",
    });

    const frl = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "FRL!A4:O4",
    });

    const eps = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "EPS!A4:O4",
    });

    const bd = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BD!A4:O4",
    });

    const scaz = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "SCAZ!A4:O4",
    });

    const cfhec = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "CFHEC!A4:O4",
    });

    const apj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "APJ!A4:O4",
    });

    const sites = [
        bcr.data.values,
        gps.data.values,
        fb.data.values,
        sj.data.values,
        al.data.values,
        azrs.data.values,
        kfd.data.values,
        nhu.data.values,
        isc.data.values,
        i_n.data.values,
        np.data.values,
        frl.data.values,
        eps.data.values,
        bd.data.values,
        scaz.data.values,
        cfhec.data.values,
        apj.data.values,
    ]

    console.log(sites.length);

    sites[0][0].splice(0, 0, 'BCR');
    sites[0][0].splice(13, 0, '');

    sites[1][0].splice(0, 0, 'GPS');
    sites[1][0].splice(13, 0, '');

    sites[2][0].splice(0, 0, 'FB');
    sites[2][0].splice(13, 0, '');

    sites[3][0].splice(0, 0, 'SJ');
    sites[3][0].splice(13, 0, '');

    sites[4][0].splice(0, 0, 'AL');
    sites[4][0].splice(13, 0, '');

    sites[5][0].splice(0, 0, 'AZRS');
    sites[5][0].splice(13, 0, '');

    sites[6][0].splice(0, 0, 'KFD');
    sites[6][0].splice(13, 0, '');

    sites[7][0].splice(0, 0, 'NHU');
    sites[7][0].splice(13, 0, '');

    sites[8][0].splice(0, 0, 'ISC');
    sites[8][0].splice(13, 0, '');

    sites[9][0].splice(0, 0, 'IN');
    sites[9][0].splice(13, 0, '');

    sites[10][0].splice(0, 0, 'NP');
    sites[10][0].splice(13, 0, '');

    sites[11][0].splice(0, 0, 'FRL');
    sites[11][0].splice(13, 0, '');

    sites[12][0].splice(0, 0, 'EPS');
    sites[12][0].splice(13, 0, '');

    sites[13][0].splice(0, 0, 'BD');
    sites[13][0].splice(13, 0, '');

    sites[14][0].splice(0, 0, 'SCAZ');
    sites[14][0].splice(13, 0, '');

    sites[15][0].splice(0, 0, 'CFHEC');
    sites[15][0].splice(13, 0, '');

    sites[16][0].splice(0, 0, 'APJ');
    sites[16][0].splice(13, 0, '');

    const score = ['C', 'D', 'E', 'F'];

    const getDate = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Summary!D25",
    });

    const previously_listed_date = new Date(getDate.data.values[0][0]);

    for (let i = 0; i < sites.length; i++) {
        for (let j = 0; j < sites[i].length; j++) {
            let security_score = sites[i][j][5];
            let site = sites[i][j][0];
            let url = sites[i][j][2];
            let date = sites[i][j][3];
            let first_byte_time = sites[i][j][6];
            let keep_alive_enabled = sites[i][j][7];
            let compress_transfer = sites[i][j][8];
            let compress_images = sites[i][j][9];
            let cache_static_content = sites[i][j][10];
            let effective_use_of_cdn = sites[i][j][11];

            const date_in_sheets = new Date(date);

            if (previously_listed_date.getDate() === date_in_sheets.getDate()) {
                console.log("Listed.");
            }
            else {
                if ((security_score === score[0] || security_score === score[1] || security_score === score[2] || security_score === score[3]) ||
                (first_byte_time === score[0] || first_byte_time === score[1] || first_byte_time === score[2] || first_byte_time === score[3]) ||
                (keep_alive_enabled === score[0] || keep_alive_enabled === score[1] || keep_alive_enabled === score[2] || keep_alive_enabled === score[3]) ||
                (compress_transfer === score[0] || compress_transfer === score[1] || compress_transfer === score[2] || compress_transfer === score[3]) ||
                (compress_images === score[0] || compress_images === score[1] || compress_images === score[2] || compress_images === score[3]) ||
                (cache_static_content === score[0] || cache_static_content === score[1] || cache_static_content === score[2] || cache_static_content === score[3]) ||
                (effective_use_of_cdn === "X")) {

                    console.log(site);

                    // Write rows to google sheet
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: "Summary!A7:Q17",
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    sites[i][j]
                                ]
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } 
    }  
}
listSitesWithIssues();