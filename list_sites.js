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
    const gps = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "GPS!A4:O4",
    });

    const nhu = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NHU!A174:O174",
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

    const isc = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ISC!A20:O20",
    });

    const al = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AL!A4:O4",
    });

    const scaz = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "SCAZ!A4:O4",
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

    const bd = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BD!A4:O4",
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
        gps.data.values,
        nhu.data.values,
        fb.data.values,
        sj.data.values,
        azrs.data.values,
        kfd.data.values,
        isc.data.values,
        al.data.values,
        scaz.data.values,    
        i_n.data.values,
        np.data.values,
        frl.data.values,
        bd.data.values,
        cfhec.data.values,
        apj.data.values,
    ]

    console.log(sites.length);

    const site_name = [
        "GPS",
        "NHU",
        "FB",
        "SJ",
        "AZRS",
        "KFD",
        "ISC",
        "AL",
        "SCAZ",
        "IN",
        "NP",
        "FRL",
        "BD",
        "CFHEC",
        "APJ"
    ]

    for (let j = 0; j < site_name.length; j++) {
        sites[j][0].splice(0, 0, site_name[j]);
        sites[j][0].splice(13, 0, '');

    }

    const score = ['C', 'D', 'E', 'F'];

    try {
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
    } catch (error) {
        console.log(error);
    }
}


module.exports = { listSitesWithIssues };
