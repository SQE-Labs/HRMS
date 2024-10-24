import { expect } from "chai";
import sideBar from "../components/SideBar";
import PolicyMgmtPage from "../pages/PolicyMgmtPage";
import process from 'process/browser.js';



describe("Policy Management Tests", () => {

  it("HRMIS_1: Verify 'Modify Policies' page.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Policy Management", "Modify Policy");
    PolicyMgmtPage.modifyPolicyLbl.should('be.visible');
    
    // select Item Per Page 20
    PolicyMgmtPage.selectItemPerPage('20');
    PolicyMgmtPage.itemPerPageDrp.should('have.value','20');
    PolicyMgmtPage.gridRows.should('have.length',20);

    // get and search valid data from the grid
    PolicyMgmtPage.searchPolicy();
    PolicyMgmtPage.assertSearchTitle();

     //search Inavlid data and Verfiy "No Record Available "
    PolicyMgmtPage.searchPolicy("Inavlid");
    PolicyMgmtPage.noRecordeLbl.should('be.visible').and('have.text','No Record Available');
    
    // verify Policy should downloded
    PolicyMgmtPage.searchTxt.clear();
    PolicyMgmtPage.searchPolicy();
    cy.wait(1000);
    PolicyMgmtPage.clickOnView();
    PolicyMgmtPage.checkDownloadFile('cypress/downloads/ECardsCCIT112126022926502 (1) (6).pdf');


  })


  it.only("HRMIS_2: Verify 'Update Policy' Pop up.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Policy Management", "Modify Policy");

    //search valid data from the grid
    PolicyMgmtPage.searchPolicy();
    cy.wait(1000);
    PolicyMgmtPage.clickOnEditBtn();
    PolicyMgmtPage.addPolicyHeader.should('be.visible').and('have.text','Update Policy')

    PolicyMgmtPage.enterPolicytitle('Demoo999');
    PolicyMgmtPage.enterDescription("demooPolicy");
    PolicyMgmtPage.delete_Policy();
    PolicyMgmtPage.uploadePolicyFile('cypress/fixtures/resources/ECardsCCIT112126022926502 (2) (6).pdf');
    PolicyMgmtPage.selectValidDate('2023-10-24');
    PolicyMgmtPage.clickOnSubmit();
    cy.wait(1000);
    PolicyMgmtPage.policyTitle.should('have.text','Demoo999');
    PolicyMgmtPage.policyDesc.should('have.text','demooPolicy');
    PolicyMgmtPage.policyValidDate.should('have.text','24-10-2023');

   
  })
    
});