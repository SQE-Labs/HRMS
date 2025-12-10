import sideBar from "../components/SideBar";
import ProjectListPage from "../pages/ProjectListPage";
import ShadowResourcesPage from "../pages/ShadowResourcesPage";
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

  //All below tests are dependent on each other and should be executed in the given order

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

    ProjectListPage.successMsg
      .should('be.visible')
      .and('contain.text', 'Project created successfully.');
  });
  it("Verify that 'Add New Member' pop up opens up after clicking on 'Add Member' button", () => {
      sideBar.navigateTo("Project TeamFlow", "Project List");
      ProjectListPage.searchByProjectName(randomProjectName);
      ProjectListPage.toggleProjectAccordion(randomProjectName);
      ProjectListPage.clickOnAddMembersBtn();
      ProjectListPage.newMemberPopupHeader();
      ProjectListPage.addEmployeeName(testData.ProjectTeamFlow.AddEmployeeName);
      ProjectListPage.addDesignation(testData.ProjectTeamFlow.Designation);
      ProjectListPage.enterStartDate();
      ProjectListPage.clickOnAddMemberBtn();
      ProjectListPage.assertSuccessMsg_AddMember
          .should('be.visible')
          .and('contain.text', 'Member assigned successfully.');
    });
    it("HRMIS_PTF_20: Verify that user gets directed to 'Shadow Resources' page, after clicking on 'Shadow Resources' subtab on 'Project TeamFlow' section.", () => {
        sideBar.navigateTo("Project TeamFlow", "Shadow Resources");
        ShadowResourcesPage.searchByProjectName(randomProjectName);
        ShadowResourcesPage.toggleProjectAccordion(randomProjectName);
        ShadowResourcesPage.clickOnAddMembersBtn();
        ShadowResourcesPage.addShadowMemberPopupHeader();
        ShadowResourcesPage.selectMainEmployee(testData.ProjectTeamFlow.AddEmployeeName);
        ShadowResourcesPage.shadowEmployeeName(testData.ProjectTeamFlow.ShadowEmployeeName);
        ShadowResourcesPage.shadowResourceDesignation(testData.ProjectTeamFlow.Designation);
        ShadowResourcesPage.joiningDate();
        ShadowResourcesPage.clickOnAddMemberBtn();
        ShadowResourcesPage.assertSuccessMsg_AddShadowMember
            .should('be.visible')
            .and('contain.text', 'Shadow member created successfully.');
    });

    it("HRMIS_PTF_21: Verify that relevent results appears, when user enters valid data in 'Search by Project Name' search bar, on 'Shadow Resources' page.", () => {
        sideBar.navigateTo("Project TeamFlow", "Shadow Resources");
        ShadowResourcesPage.searchByProjectName(randomProjectName);
        ShadowResourcesPage.toggleProjectAccordion(randomProjectName);
        ShadowResourcesPage.verifyShadowMembers(testData.ProjectTeamFlow);
    });

    it("HRMIS_PTFS_: Verify that the shadow member cannot be added in add member list in Project List module", ()=> {
        sideBar.navigateTo("Project TeamFlow", "Project List");
        ProjectListPage.searchByProjectName(randomProjectName);
        ProjectListPage.toggleProjectAccordion(randomProjectName);
        ProjectListPage.clickOnAddMembersBtn();
        ProjectListPage.newMemberPopupHeader();
        ProjectListPage.addEmployeeName(testData.ProjectTeamFlow.ShadowEmployeeName);
        ProjectListPage.addDesignation(testData.ProjectTeamFlow.Designation);
        ProjectListPage.enterStartDate();
        ProjectListPage.clickOnAddMemberBtn();
        ProjectListPage.assertValMsg_ShadowMember
            .should('be.visible')
            .and('contain.text', 'Employee is already assigned as a Shadow Employee in this project.');
    });
});