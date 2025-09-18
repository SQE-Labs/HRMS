import BasePage from "./BasePage";

class AnalyticsInsightsPage extends BasePage {
  // User's Role Report page
  get usersRoleReportHeader() {
    return cy.contains("User's Role Report");
  }
  get searchEmployeeNameField() {
    return cy.get('input[placeholder="Search By Employee Name"]');
  }
  get departmentDropdown() {
    return cy.get("select").eq(0);
  }
  get statusDropdown() {
    return cy.get("select").eq(1);
  }
  getTableColumn(colName) {
    return cy.contains("th", colName);
  }

  assertUsersRoleReportHeader() {
    this.usersRoleReportHeader
      .should("be.visible")
      .and("have.text", "User's Role Report");
  }
  assertSearchFieldsVisible() {
    this.searchEmployeeNameField.should("be.visible");
    this.departmentDropdown.should("be.visible");
    this.statusDropdown.should("be.visible");
  }
  assertTableColumnsVisible(expectedColumns) {
    expectedColumns.forEach((col) => {
      this.getTableColumn(col).should("be.visible");
    });
  }

  // Asset Report page
  get assetReportHeader() {
    return cy.contains("Asset Report");
  }
  get assetTypeDropdown() {
    return cy.get("select").eq(0);
  }
  get ownerDropdown() {
    return cy.get("select").eq(1);
  }
  get downloadButton() {
    return cy.contains("button", "Download");
  }
  selectAssetType(type) {
    this.assetTypeDropdown.select(type);
  }
  selectOwner(owner) {
    this.ownerDropdown.select(owner);
  }
  clickDownloadButton() {
    this.downloadButton.click({ force: true });
  }
  assertAssetReportHeader() {
    this.assetReportHeader.should("be.visible");
  }

  // Attendance Report page
  get attendanceReportHeader() {
    return cy.contains("Download Attendance");
  }
  assertAttendanceReportHeader() {
    this.attendanceReportHeader.should("be.visible");
  }

  // Reimbursement Report page
  get reimbursementReportHeader() {
    return cy.contains("Download Reimbursement");
  }
  assertReimbursementReportHeader() {
    this.reimbursementReportHeader.should("be.visible");
  }
}

export default new AnalyticsInsightsPage();
