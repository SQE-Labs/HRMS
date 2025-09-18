// cypress/e2e/tests/AttendanceReport.cy.js
// Test: Verify navigation to 'Download Attendance' page via Analytics & Insights > Attendance Report

import sideBar from "../components/SideBar";
import AnalyticsInsightsPage from "../pages/AnalyticsInsightsPage";

describe("Analytics & Insights - Attendance Report", () => {
  beforeEach(() => {
    cy.login("superUser");
  });

  it("HRMIS_AT1: Verify navigation to 'Download Attendance' page", () => {
    // Step 1: Navigate using sidebar
    sideBar.navigateTo("Analytics & Insights", "Attendance Report");
    // Step 2: Assert page header
    cy.contains("Download Attendance").should("be.visible");
  });
});
