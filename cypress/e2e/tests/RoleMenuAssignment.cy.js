import sideBar from "../components/SideBar";
import RoleMenuAssignMent from "../pages/RoleMenuAssignMent";
import ViewPolicyMgmt from "../pages/ViewPolicyMgmt";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  // login to Application
  cy.login("superUser");
});

describe("Role Menu Assignment", () => {
  it("HRMS_1 : Verify that 'Role management' tab expands, when user clicks on 'Role Management' accordion from left panel.", () => {
    sideBar.navigateTo("Role Management", "Menu Assignment");
    RoleMenuAssignMent.roleAssignmentHeader("Menu Assignment");
  });

  it("HRMS_2 : Verify that user is able to select any option from 'Select Employee' dropdown field", () => {
    cy.wait(2000);
    sideBar.navigateTo("Role Management", "Menu Assignment");

    RoleMenuAssignMent.selectRole();

    //Select checkbox
    RoleMenuAssignMent.clickOnDashboardCheckBox();
    RoleMenuAssignMent.clickOnSaveBtn();
    RoleMenuAssignMent.successMsg.should(
      "contain",
      "The menu has been successfully assigned to"
    );
    RoleMenuAssignMent.checkBoxAssert();
  });

  it("HRMS_3 : Verify that user is able to select any option from 'Select Employee' dropdown field", () => {
    cy.wait(2000);
    sideBar.navigateTo("Role Management", "Menu Assignment");

    RoleMenuAssignMent.selectRole();

    //Select checkbox
    RoleMenuAssignMent.clickOnDashboardCheckBox();
    RoleMenuAssignMent.clickOnSaveBtn();
    RoleMenuAssignMent.successMsg.should(
      "contain",
      "The menu has been successfully assigned to"
    );
    RoleMenuAssignMent.checkBoxAssertion();
  });
});
