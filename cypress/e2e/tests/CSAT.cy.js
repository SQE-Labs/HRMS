import { generateRandomString } from "../../support/utils";
import sideBar from "../components/SideBar";
import CSATPages from "../pages/CSATPages";
import ProjectReportPage from "../pages/ProjectReportPage";
import ProjectListPage from "../pages/ProjectListPage";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  cy.login("superUser1");
});

describe("Project TeamFlow - CSAT Rating", () => {
  const randomProjectName = "Project_" + generateRandomString(6);
  it("Verify that project is created when user enters valid data on 'Project List' page.", () => {
    sideBar.navigateTo("Project TeamFlow", "Project List");

    ProjectListPage.projectListHeader.should('be.visible').and('have.text', 'Project List');

    ProjectListPage.createProjectBtn();
    ProjectListPage.clickSubmitBtn();
    ProjectListPage.projectName(randomProjectName);
    ProjectListPage.projectType(testData.ProjectTeamFlow.ProjectType);
    ProjectListPage.deliveryLead(testData.ProjectTeamFlow.DeliveryLead);
    ProjectListPage.projectManager(testData.ProjectTeamFlow.ProjectManager);
    ProjectListPage.principalSponsor(testData.ProjectTeamFlow.PrincipalSponsor);
    ProjectListPage.leadBusinessAnalyst(testData.ProjectTeamFlow.LeadBusinessAnalyst);

    ProjectListPage.enterStartDate();
    ProjectListPage.enterEndDate();
    ProjectListPage.projectDescription("Commented");
    ProjectListPage.clickSubmitBtn();

    ProjectListPage.getToastMsg
      .should('be.visible')
      .and('contain.text', 'Project created successfully.');
  });

  it("HRMIS_PTF_25 - Verify Add CSAT Ratings navigation and UI", () => {
    sideBar.navigateTo("Project TeamFlow", "CSAT Rating");

    // Verify CSAT page header
    CSATPages.getCSATBreadcrumb()
      .should("be.visible")
      .and("contain.text", "CSAT Rating");

    // Verify Manage CSAT tab visible by default
    CSATPages.getManageCSATTab()
      .should("be.visible");

    // Click Add CSAT Ratings tab
    CSATPages.clickAddCSATTab();

    // Verify dropdowns
    CSATPages.getFilterByDropdown()
      .should("be.visible");

    CSATPages.getSelectOptionDropdown()
      .should("be.visible");
  });


  it.only("HRMIS_PTF_26 - Verify project accordions appear when filtered by Employee Name", () => {
    sideBar.navigateTo("Project TeamFlow", "CSAT Rating");

    // Click Add CSAT Ratings tab
    CSATPages.clickAddCSATTab();

    // Verify dropdowns
    CSATPages.getFilterByDropdown()
      .should("be.visible");

    CSATPages.getSelectOptionDropdown()
      .should("be.visible");

    CSATPages.FilterBy("Project Name");
    CSATPages.SelectEmployeeBy("Project_qchomr");

    CSATPages.checkList();
    CSATPages.clickOnNextButton();
    CSATPages.getAddCSATHeader.should('be.visible').and('have.text', 'Add CSAT Rating');
    CSATPages.enterRating("5");
    CSATPages.clickOnAddRatingButton();
    CSATPages.getToastMsg
      .should('be.visible')
      .and('contain.text', 'CSAT created successfully.');
  });
  
  it("Manage CSAT Ratings - Verify that relevent results appears, when user enters valid data in 'Search by Employee Name' search bar, on 'Manage CSAT Ratings' page.", () => {
    sideBar.navigateTo("Project TeamFlow", "CSAT Rating");
    
  });
});
