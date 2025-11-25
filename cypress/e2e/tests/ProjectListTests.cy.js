import sideBar from "../components/SideBar";
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

describe("Project Team Flow - Project List", () => {

    it("HRMIS_PTF_1, HRMIS_PTF_2: Verify that user gets directed to 'Project List' page, after clicking on 'Project List", () => {
        sideBar.navigateTo("Project TeamFlow", "Project List");

        ProjectListPage.projectListHeader.should('be.visible').and('have.text', 'Project List');
        ProjectListPage.createProjectBtn();
        ProjectListPage.createProjectHeader.scrollIntoView().should('be.visible').and('contain.text', 'Create Project');
        ProjectListPage.clickSubmitBtn();
        ProjectListPage.assertValMsg_PN();
        ProjectListPage.projectName(testData.ProjectTeamFlow.ProjectName);
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
        ProjectListPage.successMsg.should('be.visible').and('contain.text', 'Project created successfully.');
    });

});