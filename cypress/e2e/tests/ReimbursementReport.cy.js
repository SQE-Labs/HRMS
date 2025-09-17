// cypress/e2e/tests/ReimbursementReport.cy.js
// Test: Verify navigation to 'Download Reimbursement' page via Analytics & Insights > Reimbursement Report

import sideBar from "../components/SideBar";
import AnalyticsInsightsPage from "../pages/AnalyticsInsightsPage";

describe("Analytics & Insights - Reimbursement Report", () => {
  beforeEach(() => {
    cy.login("superUser");
  });

  it("HRMIS_RR1: Verify navigation to 'Download Reimbursement' page", () => {
    // Step 1: Navigate using sidebar
    sideBar.navigateTo("Analytics & Insights", "Reimbursement Report");
    // Step 2: Assert page header
    cy.contains("Download Reimbursement").should("be.visible");
  });
});
