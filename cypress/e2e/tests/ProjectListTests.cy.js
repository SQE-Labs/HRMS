import sideBar from "../components/SideBar";
import ProjectListPage from "../pages/ProjectListPage";
import { generateRandomString } from "../../support/utils";  

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  cy.login("superUser1");
});

describe("Project Team Flow - Project List", () => {
  const randomProjectName = "Project_" + generateRandomString(6);  

  it("HRMIS_PTF_1, HRMIS_PTF_2: Verify create project", () => {
    sideBar.navigateTo("Project TeamFlow", "Project List");

    ProjectListPage.projectListHeader.should('be.visible').and('have.text', 'Project List');

    ProjectListPage.createProjectBtn();
    ProjectListPage.createProjectHeader
      .scrollIntoView()
      .should('be.visible')
      .and('contain.text', 'Create Project');

    ProjectListPage.clickSubmitBtn();
    ProjectListPage.assertValMsg_PN();

    ProjectListPage.projectName(randomProjectName);
    ProjectListPage.clickSubmitBtn();

    ProjectListPage.assertValMsg_PT();
    ProjectListPage.projectType(testData.ProjectTeamFlow.ProjectType);
    ProjectListPage.clickSubmitBtn();

    ProjectListPage.assertValMsg_DL();
    ProjectListPage.deliveryLead(testData.ProjectTeamFlow.DeliveryLead);
    ProjectListPage.clickSubmitBtn();

    ProjectListPage.assertValMsg_PM();
    ProjectListPage.projectManager(testData.ProjectTeamFlow.ProjectManager);
    ProjectListPage.clickSubmitBtn();

    ProjectListPage.assertValMsg_PS();
    ProjectListPage.principalSponsor(testData.ProjectTeamFlow.PrincipalSponsor);
    ProjectListPage.leadBusinessAnalyst(testData.ProjectTeamFlow.LeadBusinessAnalyst);

    ProjectListPage.enterStartDate();
    ProjectListPage.enterEndDate();

    ProjectListPage.clickSubmitBtn();
    ProjectListPage.assertValMsg_PD();

    ProjectListPage.projectDescription("Commented");
    ProjectListPage.clickSubmitBtn();

    ProjectListPage.successMsg
      .should('be.visible')
      .and('contain.text', 'Project created successfully.');
  });

  it("Verify project appears in list", () => {
    sideBar.navigateTo("Project TeamFlow", "Project List");
    ProjectListPage.searchByProjectName(randomProjectName);
    ProjectListPage.verifyProjectCard(randomProjectName);
  });

});