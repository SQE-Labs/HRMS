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
    AnalyticsInsightsPage.clickDownloadButton();

    // Step 4: Get system Downloads path dynamically via task
    cy.task("getDownloadFolder").then((downloadsFolder) => {
      const filePath = `${downloadsFolder}/asset_list.xlsx`;
      cy.readFile(filePath, { timeout: 40000 }).should("exist");
    });
  });
});
