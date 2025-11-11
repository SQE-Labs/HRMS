import sideBar from "../components/SideBar";
import DownloadAttendancePage from "../pages/DownloadAttendancePage";
import selectDrpValueByText from "../../support/utils";
const fs = require("fs");
const path = require("path");

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  cy.login("superUser");
});

describe("Attendance Management - Download Attendance", () => {
 
  it("HRMIS_A&L_54: Verify the reset button is working after setting the data", () => {
    //HRMIS_DA1: Verify navigation to 'Download Attendance' page
    sideBar.navigateTo("Attendance & Leaves", "Download Attendance");
    DownloadAttendancePage.downloadAttendanceHeader
      .should("be.visible")
      .and("have.text", "Download Attendance");
    DownloadAttendancePage.selectMonth(testData.AttendenceManagement.Month);
    DownloadAttendancePage.selectYear(testData.AttendenceManagement.Year);
    DownloadAttendancePage.selectEmpFlag(testData.EmployeeWorkData.EmployeeFlag);
    // DownloadAttendancePage.selectEmployee(testData.EmployeeName);
    DownloadAttendancePage.clickResetButton();

    // Verify dropdowns reset to default (current month/year and flag ALL)
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    const currentYear = currentDate.getFullYear().toString();

    DownloadAttendancePage.empMonth.should("have.value", currentMonth);
    DownloadAttendancePage.empYear.should("have.value", currentYear);
    DownloadAttendancePage.empFlag.should("have.value", "ALL");
  });

  it("HRMIS_A&L_58: Verify the download button is working after setting the data", () => {
    const downloadsFolder = "cypress/downloads";

    const monthFromData = testData.AttendenceManagement.Month;
    const yearFromData = testData.AttendenceManagement.Year;
    const employeeFlag = testData.EmployeeWorkData.EmployeeFlag;
    // const employee = testData.EmployeeWorkData.EmployeeName

    const expectedFileName = `${employeeFlag}_All Employees_Attendance_${monthFromData}_${yearFromData}_list.xlsx`;

    // Navigate + select values
    sideBar.navigateTo("Attendance & Leaves", "Download Attendance");
    DownloadAttendancePage.selectMonth(testData.AttendenceManagement.Month);
    DownloadAttendancePage.selectYear(testData.AttendenceManagement.Year);
    DownloadAttendancePage.selectEmpFlag(employeeFlag);

    // Remove old files, trigger download, and verify expected filename exists
    cy.task("deleteAllXlsxFiles", downloadsFolder);
    DownloadAttendancePage.clickDownloadButton();
    // Wait for download to appear
    cy.readFile(`${downloadsFolder}/${expectedFileName}`, { timeout: 30000 }).should("exist");
  });
});
