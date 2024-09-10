import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/Invitations";
import verifyPersonalEmailPopup from "../pages/popups/VerifyPersonalEmailPopup";
import { generateRandomYopmail } from '../../support/utils'; 
import { namename } from '../../support/utils'; 


describe("Employee Onboard Tests", () => {

    it("HRMIS_1: Verify onboarding email is sent to new hire", () => {
        cy.login();
        sideBar.navigateTo("Employee Onboard", "Invitations");
        invitations.clickInviteEmployeeButton();
        let randomMail = generateRandomYopmail(10);
        invitations.enterEmailID(randomMail); 
        invitations.enterEmployeeName("Mattews");
        invitations.selectSamplePdf('cypress/fixtures/resources/dummy.pdf');
        invitations.clickSubmitButton();
        invitations.validateOnboardingEmailSentMsg('Onboarding welcome mail sent');
    });

    it.only("HRMIS_2: Verify that new hire is able to submit the onboarding form", () => {

        const joineeData = {
            
        }
    
        // Login and Navigation to Invitation
        cy.login();
        sideBar.navigateTo("Employee Onboard", "Invitations");

        // Create invite
        invitations.clickInviteEmployeeButton();
        let joineeEmail = generateRandomYopmail(10);
        invitations.enterEmailID(joineeEmail); 
        invitations.enterEmployeeName("Mattews");
        invitations.selectSamplePdf('cypress/fixtures/resources/dummy.pdf');
        invitations.clickSubmitButton();
        invitations.validateOnboardingEmailSentMsg('Onboarding welcome mail sent');

        // Wait for mail and navigate to the url received in the mail
        cy.wait(5000);
        cy.task('getConfirmaUrl', joineeEmail).then(confirmationUrl =>{
            cy.visit(String(confirmationUrl), {failOnStatusCode: false });
        });
        
        // Provide joinee's valid email to continue
        verifyPersonalEmailPopup.enterPersonalEmailID(joineeEmail); 
        verifyPersonalEmailPopup.clickSubmitButton();

        // Providing Personal Details  
        EmployeeDetailPage.enterFirstName('Matt');
        EmployeeDetailPage.enterLastName('Haden');
        EmployeeDetailPage.checkGender('Female');
        EmployeeDetailPage.selectBloodGroup('A+ve');
        EmployeeDetailPage.selectDateOfBirth();
        EmployeeDetailPage.enterAdhaarNumber('232324324342');
        EmployeeDetailPage.enterPanNumber('BSSSS1233D');
        EmployeeDetailPage.selectDateOfJoining();
        EmployeeDetailPage.selectMaritalStatus('Single');
        EmployeeDetailPage.clickNextButton();
    
        // Providing Contact Details
        EmployeeDetailPage.enterPhoneNumber('6448744833');
        EmployeeDetailPage.enterAlternateNumber('3673636733');
        EmployeeDetailPage.selectRelationship('Mother');
        EmployeeDetailPage.enterAlternateName('Mattews');
        EmployeeDetailPage.enterPresentAddress('Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016');
        EmployeeDetailPage.enterPermanentAddress('Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016');
        EmployeeDetailPage.clickNextButton();

        // Submit the Details 
        EmployeeDetailPage.clickSubmitButton();

        // Validating the Thank You Success message
        EmployeeDetailPage.validateSuccessMessage();
    })
    
});
