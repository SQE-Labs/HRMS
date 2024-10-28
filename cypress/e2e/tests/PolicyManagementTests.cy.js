import { expect } from "chai";
import sideBar from "../components/SideBar";
import PolicyMgmtPage from "../pages/PolicyMgmtPage";
import ViewPolicyMgmt from "../pages/ViewPolicyMgmt";
import process from 'process/browser.js';



describe("Policy Management Tests", () => {

  it("HRMIS_1: Verify 'Modify Policies' page.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Policy Management", "Modify Policy");
    PolicyMgmtPage.modifyPolicyLbl.should('be.visible');

    // select Item Per Page 20
    PolicyMgmtPage.selectItemPerPage('20');
    PolicyMgmtPage.itemPerPageDrp.should('have.value', '20');
    PolicyMgmtPage.gridRows.should('have.length', 20);

    // get and search valid data from the grid
    PolicyMgmtPage.searchPolicy();
    PolicyMgmtPage.assertSearchTitle();

    //search Inavlid data and Verfiy "No Record Available "
    PolicyMgmtPage.searchPolicy("Inavlid");
    PolicyMgmtPage.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available');

    // verify Policy should downloded
    PolicyMgmtPage.searchTxt.clear();
    PolicyMgmtPage.searchPolicy();
    cy.wait(1000);
    PolicyMgmtPage.clickOnView();
    PolicyMgmtPage.checkDownloadFile('cypress/downloads/ECardsCCIT112126022926502 (1) (6).pdf');


  })


  it("HRMIS_2: Verify 'Add Policy' Pop up.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Policy Management", "Modify Policy");

    PolicyMgmtPage.clickOnAddPolicy();
    PolicyMgmtPage.addPolicyHeader.should('be.visible').and('have.text', 'Add Policy')
    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertTitleValidation('Please fill out this field.');
    PolicyMgmtPage.enterPolicytitle('Demoo989');

    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertDocumentValidation('Please select a file.');
    PolicyMgmtPage.uploadePolicyFile('cypress/fixtures/resources/ECardsCCIT112126022926502 (2) (6).pdf');

    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertValidDateValidation('Please fill out this field.');
    PolicyMgmtPage.selectValidDate('2023-10-24');

    PolicyMgmtPage.clickOnSubmit();
    cy.wait(1000);
    PolicyMgmtPage.assertPolicyDescValidation('Please fill out this field.');
    PolicyMgmtPage.enterDescription("demooPolicy");
    PolicyMgmtPage.clickOnSubmit();
    cy.wait(1000);
    cy.validateSuccessMessages("Success");
    PolicyMgmtPage.selectItemPerPage('40');
    PolicyMgmtPage.clickNextUntilDisabled();
    PolicyMgmtPage.lastPolicyTitle.should('have.text', 'Demoo989');
    PolicyMgmtPage.lastPolicyDesc.should('have.text', 'demooPolicy');
    PolicyMgmtPage.lastValidDate.should('have.text', '24-10-2023');


  })


  it("HRMIS_3: Verify 'Update Policy' Pop up.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Policy Management", "Modify Policy");

    //search valid data from the grid
    PolicyMgmtPage.searchPolicy();
    cy.wait(1000);
    PolicyMgmtPage.clickOnEditBtn();
    PolicyMgmtPage.addPolicyHeader.should('be.visible').and('have.text', 'Update Policy');
    PolicyMgmtPage.clickOnCancel();
    PolicyMgmtPage.addPolicyHeader.should('not.be.visible')

    // cross Btn Check
    PolicyMgmtPage.clickOnEditBtn();
    PolicyMgmtPage.clickOnCrossBtn();
    PolicyMgmtPage.addPolicyHeader.should('not.be.visible')

    
    PolicyMgmtPage.clickOnEditBtn();
    PolicyMgmtPage.enterPolicytitle('Demoo999');
    PolicyMgmtPage.enterDescription("demooPolicy");
    PolicyMgmtPage.delete_Policy();
    PolicyMgmtPage.uploadePolicyFile('cypress/fixtures/resources/ECardsCCIT112126022926502 (2) (6).pdf');
    PolicyMgmtPage.selectValidDate('2023-10-24');
    PolicyMgmtPage.clickOnSubmit();
    cy.wait(1000);
    PolicyMgmtPage.policyTitle.should('have.text', 'Demoo999');
    PolicyMgmtPage.policyDesc.should('have.text', 'demooPolicy');
    PolicyMgmtPage.policyValidDate.should('have.text', '24-10-2023');


  })

 

  it("HRMIS_4: Verify 'view Policy' Page", () => {
    cy.login();

    //Navigate to View Policy Page
    sideBar.navigateTo("Policy Management", "View Policy");
    ViewPolicyMgmt.modifyPolicyLbl.should('be.visible').and("have.text", 'View Policy');

    // select Item Per Page 20
    ViewPolicyMgmt.selectItemPerPage('20');
    ViewPolicyMgmt.itemPerPageDrp.should('have.value', '20');
    ViewPolicyMgmt.gridRows.should('have.length', 20);

    // get and search valid data from the grid
    ViewPolicyMgmt.searchPolicy();
    ViewPolicyMgmt.assertSearchTitle();

    //search Inavlid data and Verfiy "No Record Available "
    ViewPolicyMgmt.searchPolicy("Inavlid");
    ViewPolicyMgmt.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available');

     // verify Policy should downloded
     ViewPolicyMgmt.searchTxt.clear();
     ViewPolicyMgmt.searchPolicy();
     cy.wait(1000);
     ViewPolicyMgmt.clickOnView();
     ViewPolicyMgmt.checkDownloadFile('cypress/downloads/ECardsCCIT112126022926502 (1) (6).pdf');

  })

});