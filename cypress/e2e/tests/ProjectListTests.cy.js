import sideBar from "../components/SideBar";
import ProjectListPage from "../pages/ProjectListPage";
import { generateRandomString } from "../../support/utils";

describe("Project TeamFlow - Create Project", () => {
  beforeEach(() => {
    cy.login("superUser");
  });

  it("HRMIS_PROJ_1: Verify creation of a new project from Project List", () => {
    // Step 1: Navigate to Project List
    sideBar.navigateTo("Project TeamFlow", "Project List");
    ProjectListPage.projectListHeader
      .should("be.visible")
      .and("have.text", "Project List");
    ProjectListPage.createProjectBtn.click();
    ProjectListPage.createProjectHeader
      .should("be.visible")
      .and("have.text", "Create Project");

    // Step 2: Fill the form
    const projectName = `Test Project ${generateRandomString(4)}`;
    ProjectListPage.enterProjectName(projectName);
    ProjectListPage.selectProjectType("Development");
    ProjectListPage.selectDeliveryLead("John Doe");
    ProjectListPage.selectProjectManager("Jane Smith");
    ProjectListPage.selectPrincipalSponsor("Sponsor Name");
    ProjectListPage.selectLeadBusinessAnalyst("Analyst Name");
    ProjectListPage.enterProjectDescription("This is a test project.");
    ProjectListPage.enterSOWStartDate("10/15/2025");
    ProjectListPage.enterSOWEndDate("10/20/2025");
    ProjectListPage.enterActualStartDate("10/15/2025");
    ProjectListPage.enterActualEndDate("10/20/2025");
    ProjectListPage.submitBtn.click();

    // Step 3: Assert success (update selector/message as per actual app)
    ProjectListPage.successMsg.should("be.visible");
  });
});
