// cypress/e2e/tests/AnalyticsInsights.cy.js
// Test: Verify that 'User's Role Report' page opens up after clicking on 'Analytics & Insights' > 'User's Role Report' subtab from the left panel, on 'Dashboard' page.

import sideBar from "../components/SideBar";
import AnalyticsInsightsPage from "../pages/AnalyticsInsightsPage";

describe("Analytics & Insights - User's Role Report", () => {
  let testData;
  before(function () {
    cy.fixture("data").then((data) => {
      testData = data;
    });
  });
  beforeEach(() => {
    // login to Application (if needed)
    cy.login("superUser");
  });

  it("HRMIS_A1: Verify 'User's Role Report' page opens and displays required fields and table columns", () => {
    // Step 1: Navigate using sidebar
    sideBar.navigateTo("Analytics & Insights", "User's Role Report");
    AnalyticsInsightsPage.assertUsersRoleReportHeader();

    // Step 2: Verify fields
    AnalyticsInsightsPage.searchEmployeeNameField;
    AnalyticsInsightsPage.departmentDropdown;
    AnalyticsInsightsPage.statusDropdown;

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
      AnalyticsInsightsPage.getTableColumn(col);
    });
  });

  it("HRMIS_A2: Verify search by employee name shows correct results", () => {
    // Step 1: Navigate
    sideBar.navigateTo("Analytics & Insights", "User's Role Report");
    AnalyticsInsightsPage.assertUsersRoleReportHeader();

    // Step 2: Search employee by name
    AnalyticsInsightsPage.searchEmployeeByName(testData.EmployeeName);

    // Step 3: Verify result in table
    AnalyticsInsightsPage.assertEmployeeInTable(testData.EmployeeName);
  });
});
