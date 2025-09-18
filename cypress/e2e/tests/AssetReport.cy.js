// cypress/e2e/tests/AssetReport.cy.js
// Test: Verify Asset Report download after selecting Asset Type and Owner

import sideBar from "../components/SideBar";
import AnalyticsInsightsPage from "../pages/AnalyticsInsightsPage";

describe("Analytics & Insights - Asset Report", () => {
  beforeEach(() => {
    cy.login("superUser");
  });

  it("HRMIS_AR1: Verify Asset Report download after selecting Asset Type and Owner", () => {
    // Step 1: Navigate using sidebar
    sideBar.navigateTo("Analytics & Insights", "Asset Report");
    AnalyticsInsightsPage.assetReportHeader.should("be.visible");

    // Step 2: Select data from all fields
    AnalyticsInsightsPage.selectAssetType("All");
    AnalyticsInsightsPage.selectOwner("SQE Labs");

    // Step 3: Click Download button
    AnalyticsInsightsPage.clickDownload();

    // Step 4: Assert file download (example: check downloads folder for file)
    // You may need to customize the filename and assertion based on your app
    const downloadsFolder = "cypress/downloads";
    cy.readFile(`${downloadsFolder}/Asset_Report.xlsx`, {
      timeout: 10000,
    }).should("exist");
  });
});
