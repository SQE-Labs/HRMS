import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils'; 
import Loaders from "../components/Loaders";

class Invitations extends BasePage {

    // Locators

    get inviteEmplooyeeBtn() { return cy.get('div a.export');}
    get emailID() { return cy.get('input[name=email]'); }
    get employeeName() { return cy.get('input[name=employeeName]'); }
    get chooseFile() { return cy.get('#file-input'); }
    get submitBtn() { return cy.get("div[class='justify-content-center modal-footer'] button[type='submit']"); }
    get onBoardingSuccessMsg() { return cy.get("div.Toastify__toast-body"); }
    
    // Methods

    clickInviteEmployeeButton() {
        this.inviteEmplooyeeBtn.click();
        cy.log("Clicked on Invite Employee Button");

    }

    enterEmailID(randomEmail) { 
        this.emailID.wait(500).type(randomEmail)
            .should('have.value',randomEmail);
        cy.log("Email ID Entered");  
    }
    
    randomEmailGenerator(email) {
        const randomString = generateRandomString(3); 
        const newEmail = `${randomString}${email}`;   
        cy.log("Random Email is generated: " + newEmail);      
        return newEmail;                              
    }

    enterEmployeeName(employeeName) {
        this.employeeName.type(employeeName).should('have.value', employeeName);
        cy.log("Entered Employee Name");

    }

    selectSamplePdf(filePath) {
        this.chooseFile.selectFile(filePath);
        cy.log("PDF file is Selected");

    }

    clickSubmitButton() {
        this.submitBtn.click();
        Loaders.threeDotLoading.should('not.exist');    
        cy.log("Clicked on submit button");

    }

    validateOnboardingEmailSentMsg(successMsg) {
        this.onBoardingSuccessMsg.should('contain.text', successMsg);
        cy.log("Onboarding mail is sent");
    }
}

export default new Invitations();
