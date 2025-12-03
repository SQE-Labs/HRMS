import sideBar from "../components/SideBar";
import ProjectReportPage from "../pages/ProjectReportPage";
import { generateRandomString } from "../../support/utils";  
const fs = require("fs");
const path = require("path");

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  cy.login("superUser1");
});

describe("Project Team Flow - Project Report", () => {
  const downloadsFolder = "cypress/downloads";

  it("HRMIS_PTF_14,HRMIS_PTF_15: Verify that user gets directed to 'Project Report' page, after clicking on 'Project Report' subtab on 'Project TeamFlow' section.", () => {
    sideBar.navigateTo("Project TeamFlow", "Project Report");
    ProjectReportPage.projectReportHeader.should('be.visible').and('have.text', 'Project Report');
    ProjectReportPage.projectPerformanceHeader.should('be.visible').and('have.text', ' Project Performance Report');
    ProjectReportPage.selectFilter("Employee Name");
    ProjectReportPage.selectName(testData.EmployeeName);

    // Verify that user is able to download relevent report, after clicking 'Download' button when user selects any option from 'Select Filter' dropdown fields, on 'Project Report' page.
    cy.task("deleteAllXlsxFiles", downloadsFolder);
    ProjectReportPage.clickDownloadButton();
    cy.wait(3000);
    cy.readFile(`${downloadsFolder}/Project_Report_${testData.EmployeeData.FirstName}_${testData.EmployeeData.MiddleName}_${testData.EmployeeData.LastName}.xlsx`,
        { timeout: 20000 }).should("exist");
  });
});