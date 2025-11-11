import { expect } from "chai";
import sideBar from "../components/SideBar";
import RoleListPage from "../pages/RoleListPage";
import process from "process/browser.js";
import { generateRandomString } from "../../support/utils";

beforeEach(() => {
  // login to Application
  cy.login("superUser");
});

describe("Role Management Tests", () => {
  it("HRMIS_RM_1: Verify 'Role List' page.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");
    RoleListPage.roleListLbl.should("be.visible").and("have.text", "Role List");

    // select Item Per Page 20
    RoleListPage.selectItemPerPage("5");
    RoleListPage.itemPerPageDrp.should("have.value", "5");
    RoleListPage.gridRows.should("have.length", 5);

    // get and search valid data from the grid
    RoleListPage.searchRole();
    RoleListPage.assertSearchTitle();

    //search Inavlid data and Verfiy "No Record Available "
    RoleListPage.searchRole("Inavlid");
    RoleListPage.noRecordeLbl
      .should("be.visible")
      .and("have.text", "No Record Available");
  });

  it("HRMIS_RM_4: Verify user is able to click on Next button.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");

    //search valid data from the grid
    RoleListPage.selectItemPerPage("10");
    cy.wait(500);
    RoleListPage.clickNextUntilDisabled();
    cy.wait(500);
  });

  it("HRMIS_RM_5: Verify user is able to click on previous button.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");

    //search valid data from the grid
    RoleListPage.selectItemPerPage("10");
    cy.wait(500);
    RoleListPage.clickNextUntilDisabled();
    cy.wait(500);

    RoleListPage.clickPreviousUntilDisabled();
    cy.wait(500);
  });

  it("HRMIS_RM_17: Verify 'Add Role' Pop up.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");

    RoleListPage.clickOnAddRole();
    RoleListPage.addUpdateRoleHeader
      .should("be.visible")
      .and("have.text", "Add Role");

    RoleListPage.clickOnCancelBtn();
    RoleListPage.addUpdateRoleHeader.should("not.be.visible");
    cy.wait(500);

    RoleListPage.clickOnAddRole();
    RoleListPage.clickOnCrossIcon();
    RoleListPage.addUpdateRoleHeader.should("not.be.visible");
    cy.wait(500);

    RoleListPage.clickOnAddRole();
    RoleListPage.clickOnSubmit();
    RoleListPage.assertValidation(
      RoleListPage.roleTitleTxt,
      "Please fill out this field."
    );
    const randomString = generateRandomString(5);
    cy.wait(1000);
    RoleListPage.enterRoleTitle("Role Title " + randomString);

    RoleListPage.clickOnSubmit();
    RoleListPage.assertValidation(
      RoleListPage.descRoleTxt,
      "Please fill out this field."
    );
    cy.wait(1000);
    RoleListPage.enterRoleDesc("description Role " + randomString);

    RoleListPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully created.");

    RoleListPage.clickNextUntilDisabled();
    RoleListPage.lastRoleTitle.should(
      "have.text",
      "Role Title " + randomString
    );
    RoleListPage.lastRoleDesc.should(
      "have.text",
      "description Role " + randomString
    );
  });

  it("HRMIS_RM_8: Verify 'Update Role' Pop up.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");
    // select Item Per Page 20
    RoleListPage.selectItemPerPage("40");
    cy.wait(1000);
    RoleListPage.clickNextUntilDisabled();
    const roleTitle = "NewRole " + generateRandomString(5);
    const roleDesc = "NewRole Desc " + generateRandomString(5);

    // Pop open and close
    RoleListPage.clickOnEditRole();
    RoleListPage.addUpdateRoleHeader
      .should("be.visible")
      .and("have.text", "Update Role");
    RoleListPage.clickOnCancelBtn();
    RoleListPage.addUpdateRoleHeader.should("not.be.visible");
    cy.wait(500);
    RoleListPage.clickOnEditRole();
    RoleListPage.clickOnCrossIcon();
    RoleListPage.addUpdateRoleHeader.should("not.be.visible");
    cy.wait(500);

    RoleListPage.clickOnEditRole();
    RoleListPage.roleTitleTxt.clear();
    RoleListPage.clickOnSubmit();
    RoleListPage.assertValidation(
      RoleListPage.roleTitleTxt,
      "Please fill out this field."
    );
    cy.wait(1000);
    RoleListPage.enterRoleTitle(roleTitle);

    RoleListPage.descRoleTxt.clear();
    RoleListPage.clickOnSubmit();
    RoleListPage.assertValidation(
      RoleListPage.descRoleTxt,
      "Please fill out this field."
    );
    cy.wait(1000);
    RoleListPage.enterRoleDesc(roleDesc);

    RoleListPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully updated.");

    RoleListPage.clickNextUntilDisabled();
    RoleListPage.lastRoleTitle.should("have.text", roleTitle);
    RoleListPage.lastRoleDesc.should("have.text", roleDesc);
  });

  it("HRMIS_RM_14: Verify 'Delete Role' Pop up.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");
    // select Item Per Page 20
    RoleListPage.selectItemPerPage("40");
    cy.wait(1000);
    RoleListPage.clickNextUntilDisabled();

    let title;
    RoleListPage.lastRoleTitle.invoke("text").then((text) => {
      title = text.trim();
    });
    RoleListPage.clickOnDelete();
    RoleListPage.deletePopUpHeader
      .should("be.visible")
      .and("have.text", "Are you sure you want to delete this role?");

    RoleListPage.clickOnDeleteYes();
    RoleListPage.deletePopUpHeader.should("not.be.visible");

    RoleListPage.clickOnDelete();
    RoleListPage.clickOnDeleteYes();
    cy.then(() => {
      RoleListPage.assertDeletedRole(title);
    });
  });
});
