import sideBar from "../components/SideBar";
import AnalyticsInsightsPage from "../pages/AnalyticsInsightsPage";
const fs = require("fs");
const path = require("path");

describe("Analytics & Insights - Asset Report", () => {
  beforeEach(() => {
    cy.login("superUser");
  });

  it("HRMIS_AI_12: Verify Asset Report download after selecting Asset Type and Owner", () => {
    const downloadsFolder = "cypress/downloads";
    // Step 1: Navigate using sidebar
    sideBar.navigateTo("Analytics & Insights", "Asset Report");
    AnalyticsInsightsPage.assetReportHeader.should("be.visible");

    // Step 2: Select data from all fields
    AnalyticsInsightsPage.selectAssetType("All");
    AnalyticsInsightsPage.selectOwner("SQE Labs");

    // Step 3: Click Download button
    cy.task("deleteAllXlsxFiles", downloadsFolder);
    AnalyticsInsightsPage.clickDownloadButton();
    cy.wait(3000);
    cy.readFile(`${downloadsFolder}/asset_list.xlsx`, { timeout: 20000 }).should("exist");
  });
});
