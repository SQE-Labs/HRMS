// cypress/e2e/tests/AnalyticsInsights.cy.js
// Test: Verify that 'User's Role Report' page opens up after clicking on 'Analytics & Insights' > 'User's Role Report' subtab from the left panel, on 'Dashboard' page.

import sideBar from "../components/SideBar";
import AnalyticsInsightsPage from "../pages/AnalyticsInsightsPage";

describe("Analytics & Insights - User's Role Report", () => {
  beforeEach(() => {
    // login to Application (if needed)
    cy.login("superUser");
  });

  it("HRMIS_A1: Verify 'User's Role Report' page opens and displays required fields and table columns", () => {
    // Step 1: Navigate using sidebar
    sideBar.navigateTo("Analytics & Insights", "User's Role Report");
    AnalyticsInsightsPage.pageHeader
      .should("be.visible")
      .and("have.text", "User's Role Report");

    // Step 2: Verify fields
    AnalyticsInsightsPage.searchEmployeeName.should("be.visible");
    AnalyticsInsightsPage.departmentDropdown.should("be.visible");
    AnalyticsInsightsPage.statusDropdown.should("be.visible");

    // Step 3: Verify table columns
    const expectedColumns = [
      "S.No.",
      "Employee Name",
      "Email",
      "Employee Type",
      "Department",
      "Designation",
      "Roles",
      "Action",
    ];
    expectedColumns.forEach((col) => {
      AnalyticsInsightsPage.getTableColumn(col).should("be.visible");
    });
  });
});
