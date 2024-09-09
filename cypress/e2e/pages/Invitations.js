import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils'; 

class Invitations extends BasePage {

    // Locators
    get inviteEmplooyeeBtn() { return cy.get('.export.theme-button');}
    get emailID() { return cy.get('input.border[name=email]'); }
    get employeeName() { return cy.get('input.border[name=employeeName]'); }
    get chooseFile() { return cy.get('#file-input'); }
    get submitBtn() { return cy.get("div[class='justify-content-center modal-footer'] button[type='submit']"); }
    get onBoardingSuccessMsg() { return cy.get("div.Toastify__toast-body",{ timeout:10000}); }
    
    // Methods

    clickInviteEmployeeButton() {
        this.inviteEmplooyeeBtn.click();
        cy.log("Clicked on Invite Employee Button");

    }

    enterEmailID(randomEmail) { 
        this.emailID.type(randomEmail).should('have.value',randomEmail)
        cy.log("Email ID Entered");  
    }
    // enterPersonalID(registeredUserEmail) {
    //     this.personalEmail.type(registeredUserEmail).should('have.value',registeredUserEmail)
    //     cy.log("Email ID Entered");                                        
    // }
    randomEmailGenerator(email) {
        const randomString = generateRandomString(3); 
        const newEmail = `${randomString}${email}`;   
        cy.log("Random Email is generated: " + newEmail);      
        return newEmail;                              
    }


    enterEmployeeName(employeeName) {
        this.employeeName.type(employeeName).should('have.value', 'Mattews');
        cy.log("Entered Employee Name");

    }

    selectSamplePdf(filePath) {
        this.chooseFile.selectFile(filePath);
        cy.log("PDF file is Selected");

    }

    clickSubmitButton() {
        this.submitBtn.click();    
        cy.log("Clicked on submit button");

    }

    validateOnboardingEmailSentMsg(successMsg) {
        this.onBoardingSuccessMsg.should('contain.text', successMsg);
        cy.log("Assertion Pass");

    }
}

export default new Invitations();
