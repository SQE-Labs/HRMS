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

  //All below tests are dependent on each other and should be executed in the given order

  it("HRMIS_PTF_1, HRMIS_PTF_2, HRMIS_PTF_9, HRMIS_PTF_11: Verify that user gets directed to 'Create Project' page, after clicking on 'Create Project' button, on 'Project List' page.", () => {
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

  it("HRMIS_PTF_3: Verify that relevent results appears, when user enters valid data in 'Search by Project Name' search bar, on 'Project List' page.", () => {
    sideBar.navigateTo("Project TeamFlow", "Project List");
    ProjectListPage.searchByProjectName(randomProjectName);
    ProjectListPage.verifyProjectCard(randomProjectName);
  });

  it("HRMIS_PTF_4: Verify that user is able to edit and update project details, on 'Project List' page. ", () => {
    sideBar.navigateTo("Project TeamFlow", "Project List");
    ProjectListPage.searchByProjectName(randomProjectName);
    ProjectListPage.toggleProjectAccordion(randomProjectName);
    ProjectListPage.verifyProjectDetailsInAccordion(testData.ProjectTeamFlow);
    ProjectListPage.clickOnEditProjectBtn();
    ProjectListPage.editProjectType(testData.ProjectTeamFlow.EditProjectType);
    ProjectListPage.editDeliveryLead(testData.ProjectTeamFlow.EditDeliveryLead);
    ProjectListPage.clickOnUpdateBtn();
    ProjectListPage.assertSuccessMsg_Update
        .should('be.visible')
        .and('contain.text', 'Project updated successfully.');
  });

  it("HRMIS_PTF_5, HRMIS_PTF_6: Verify that user is able to send notification to the team members, after clicking 'Yes' button, on confirmation message of 'Project list' page." , () => {
    sideBar.navigateTo("Project TeamFlow", "Project List");
    ProjectListPage.searchByProjectName(randomProjectName);
    ProjectListPage.toggleProjectAccordion(randomProjectName);
    ProjectListPage.clickOnNotifyTeamBtn();
    ProjectListPage.reasonForNotification("Project Completed");
    ProjectListPage.confirmSendBtn();
    ProjectListPage.confirmPopupMsg();
    ProjectListPage.clickOnYesBtn();
    ProjectListPage.assertSuccessMsg_Notification
        .should('be.visible')
        .and('contain.text', 'Mail sent successfully.');
  });
})