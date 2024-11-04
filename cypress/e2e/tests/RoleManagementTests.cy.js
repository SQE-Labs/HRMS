import { expect } from "chai";
import sideBar from "../components/SideBar";
import RoleListPage from "../pages/RoleListPage";
import process from 'process/browser.js';
import { generateRandomString } from '../../support/utils';




describe("Role Management Tests", () => {

  it("HRMIS_1: Verify 'Role List' page.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");
    RoleListPage.roleListLbl.should('be.visible').and('have.text','Role List');

    // select Item Per Page 20
    RoleListPage.selectItemPerPage('5');
    RoleListPage.itemPerPageDrp.should('have.value', '5');
    RoleListPage.gridRows.should('have.length', 5);

    // get and search valid data from the grid
    RoleListPage.searchPolicy();
    RoleListPage.assertSearchTitle();

    //search Inavlid data and Verfiy "No Record Available "
    RoleListPage.searchPolicy("Inavlid");
    RoleListPage.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available');

   
  })


  it("HRMIS_2: Verify 'Add Role' Pop up.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Role Management", "Role List");

    RoleListPage.clickOnAddRole();
    RoleListPage.addRoleHeader.should('be.visible').and('have.text', 'Add Role');

    RoleListPage.clickOnCancelBtn();
    RoleListPage.addRoleHeader.should('not.be.visible');
    cy.wait(500);
    RoleListPage.clickOnAddRole();
    RoleListPage.clickOnSubmit();
    RoleListPage.assertValidation(RoleListPage.roleTitleTxt,'Please fill out this field.')
    const randomString = generateRandomString(5); 
    cy.wait(1000);
    RoleListPage.enterRoleTitle("PolicyTitle"+randomString);

    RoleListPage.clickOnSubmit();
    RoleListPage.assertValidation(RoleListPage.descRoleTxt,'Please fill out this field.');
    cy.wait(1000);
    RoleListPage.enterRoleDesc("description Role"+randomString);

    RoleListPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully created.");

    RoleListPage.clickNextUntilDisabled();
    RoleListPage.lastRoleTitle.should('have.text',"PolicyTitle"+randomString);
    RoleListPage.lastRoleDesc.should('have.text',"description Role"+randomString);

  })


  
});