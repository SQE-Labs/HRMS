import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/Invitations";
import verifyPersonalEmailPopup from "../pages/popups/VerifyPersonalEmailPopup";


describe("Employee Onboard Tests", () => {

    let globalemail = null;
    beforeEach(() => {
        globalemail = invitations.randomEmailGenerator('@yopmail.com');

    });

    it("HRMIS_1: Verify onboarding email is sent to new hire", () => {
        cy.login();
        sideBar.navigateTo("Employee Onboard", "Invitations");
        invitations.clickInviteEmployeeButton();
        cy.wait(2000);
        invitations.enterEmailID(globalemail);
        invitations.enterEmployeeName("Mattews");
        invitations.selectSamplePdf('cypress/fixtures/resources/dummy.pdf');
        invitations.clickSubmitButton();
        invitations.validateOnboardingEmailSentMsg('Onboarding welcome mail sent');
    });

    it("HRMIS_2: Verify that new hire is able to submit the onboarding form", () => {
        // Login with Default User
        cy.login();
        cy.wait(2000);

        // Redirect to the Invitation URL
        cy.visit("https://topuptalent.com/create-employee?token=-16t4gdv0jr0v--1f0nmsz3fq22v",  
          { failOnStatusCode: false });
        cy.wait(2000);

        // Providing Employee Details  
        verifyPersonalEmailPopup.enterPersonalEmailID("snm@yopmail.com"); 
        verifyPersonalEmailPopup.clickSubmitButton();
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
    
        // Providing Contact Details   //
        EmployeeDetailPage.enterPhoneNumber('6448744833');
        EmployeeDetailPage.enterAlternateNumber('3673636733');
        EmployeeDetailPage.selectRelationship('Mother');
        EmployeeDetailPage.enterAlternateName('Mattews');
        EmployeeDetailPage.enterPresentAddress('Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016');
        EmployeeDetailPage.enterPermanentAddress('Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016');
        EmployeeDetailPage.clickNextButton();

        // Submitting the Details 
        EmployeeDetailPage.clickSubmitButton();
        cy.wait(5000);

        // Validating the Thank You Success message
        EmployeeDetailPage.validateThankYouSuccessMessage('Thank you!');



    })
    
});
