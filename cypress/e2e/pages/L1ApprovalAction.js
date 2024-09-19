import BasePage from "./BasePage";
import { generateRandomYopmail } from '../../support/utils';
import Loaders from "../components/Loaders";

class L1ApprovalAction extends BasePage {

//  Locators
get itemsPerPage() { return cy.get('#itemsPerPage')}
get pagenation() { return cy.get("li[class='page-item '] a[class='page-link']")}
get searchBox() { return cy.get("input[placeholder='Search By Name.']")}
get email() { return cy.get("td[data-title='Email']").invoke('text').then((email) => {
            cy.log("Email: " + email);  
            console.log("Email: " + email);  
        });
    }   
get viewButtonOnSearchedJoinee() { return cy.get("table[class='resume custom']")
    .contains('View') 
    .click({ force: true }); }    

//  Locators for Personal Detail Tab
get viewButton() { return cy.get('tbody tr:nth-child(3) td:nth-child(6)')}
get personalDetailTab() { return cy.get('#tab1-tab')}
get firstName() { return cy.get("input[placeholder='Enter First Name']")}
get lastName() { return cy.get("input[placeholder='Enter Last Name']")}
get personalEmail() { return cy.get("input[placeholder='Enter Personal Email']")}
get gender() { return cy.get('#female')}
get bloodGroup() { return cy.get('#bloodGroup')}
get dateOfBirth() { return cy.get("input[name='dob']")}
get aadharNumber() { return cy.get("input[name='aadharNumber']")}
get panNumber() { return cy.get("input[placeholder='XXX-XXX-XXXX']")}
get dateOfJoining() { return cy.get("input[name='joiningDate']")}
get maritalStatus() { return cy.get('#maritalStatus')}

//  Locators for Contact Details Tab
get contactDetailTab() { return cy.get('#tab2-tab')}
get phoneNumber() { return cy.get("input[placeholder='Enter Phone Number']")}
get alternateNumber() { return cy.get("input[placeholder='Enter Alternate Number']")}
get relationshipWithAlternateNo() { return cy.get('#relationWithAlternateNo')}
get alternateName() { return cy.get("input[placeholder='Enter Alternate Name']")}
get presentAddress() { return cy.get("textarea[name='presentAddress']")}
get permanentAddress() { return cy.get("textarea[name='permanentAddress']")}

//  Locators for Approve Tab
get approveTab() { return cy.get('#tab3-tab')}
get firstNameOnApproveTab() { return cy.get("div[class='row'] h6[class='truncate-text']")}
get lastNameOnApproveTab() { return cy.get("div[class='row mt-3'] h6[class='truncate-text']")}
get suggestedPassword() { return cy.get("div[id='tab3'] div:nth-child(3) div:nth-child(3) h6:nth-child(1)")}
get caeliusEmail() { return cy.get("input[placeholder='Enter employee email']")}
get submitButton() { return cy.get("button[type='submit']")}

//  Methods 
    selectItemsPerPage() {
    this.itemsPerPage.wait(500).select('40');
    cy.log("Items Index is Changed");
    }

    clickOnViewButtonNewJoinee() {
    this.viewButtonNewJoinee
    cy.log("Clicked On View Button");
    } 

    clickOnPagenationNextButton() {
    this.pagenation.click();
    cy.log("Clicked On Pagination Next Button");
    } 

    SearchNewJoineeByName(joineeName){
    this.searchBox.wait(500).type(joineeName).should('have.value',joineeName)
    cy.log("Searched New Joinee");
    }

    validateEmailForNewJoinee(){
    const randomEmail = generateRandomYopmail();
    this.email; 
    }

    validateSuccessMessage() {
        cy.contains('User Email has been successfully updated.').should('be.visible')
        cy.log("Success message is displayed");
    }

//  Methods for Personal Detail Tab
    clickOnViewButton() {
    this.viewButton.click();
    cy.log("Clicked On View Button");
    } 

    switchToPersonaldetailTab() {
    this.personalDetailTab.click();
    cy.log("Switch To Personal Detail Tab");
    }  

    // Methods for Contact Detail Tab
    switchToContactDetailTab() {
    this.contactDetailTab.click();
    cy.log("Switch To Contact Detail Tab");
    }  

    // Methods for Approve Tab
    switchToApproveTab() {
    this.approveTab.click();
    cy.log("Switch To Approve Tab");
    }  

    enterCaeliusEmail(caeliusEmailTxt) { 
    this.caeliusEmail.type(caeliusEmailTxt).should('have.value',caeliusEmailTxt)
    cy.log("Caelius Email is Entered");  
    }

    clickOnSubmitButton() {
    this.submitButton.click();
    Loaders.threeDotLoading.should('not.exist'); 
    cy.log("Clicked on Submit Button");
    }  
            
}

export default new L1ApprovalAction();