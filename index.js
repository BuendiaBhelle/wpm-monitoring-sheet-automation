const add_rows = require("./addrows");
const list_sites = require("./list_sites");
const display_issues = require("./display_issues");

async function index() {
    await add_rows.insertRow();
    await list_sites.listSitesWithIssues();
    // await display_issues.displaySitesToBeReported();
}
index();


