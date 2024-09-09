import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/Invitations";
import verifyPersonalEmailPopup from "../pages/popups/VerifyPersonalEmailPopup";


describe("Employee Onboard Tests", () => {

    let globalemail = null;
    before(() => {
        globalemail = invitations.randomEmailGenerator('@yopmail.com');

    });

    it("HRMIS_1: Verify onboarding email is sent to new hire", () => {
        cy.login();
        sideBar.navigateTo("Employee Onboard", "Invitations");
        invitations.clickInviteEmployeeButton();
        cy.wait(2000);
        invitations.enterEmailID(globalemail);
        invitations.enterEmployeeName("Mattews");
        invitations.selectFile('dummy.pdf');
        invitations.clickSubmitButton();
        invitations.validateOnboardingEmailSentMsg('Onboarding welcome mail sent');
    });

    it("HRMIS_2: Verify that new hire is able to submit the onboarding form", () => {
        cy.login();
        cy.wait(2000);
        cy.visit("https://topuptalent.com/create-employee?token=-k25zae93f1ws--1neuojwpwwesc",  
          { failOnStatusCode: false });
        cy.wait(2000);
        verifyPersonalEmailPopup.enterPersonalEmailID("otwj@yopmail.com"); 
        verifyPersonalEmailPopup.clickSubmitButton();
        EmployeeDetailPage.enterFirstName('Matt');
        EmployeeDetailPage.enterLastName('Haden');
        EmployeeDetailPage.checkGender('2');
        EmployeeDetailPage.selectBloodGroup('A+ve');
        EmployeeDetailPage.selectDateOfBirth();
        EmployeeDetailPage.enterAdhaarNumber('232324324342');
        EmployeeDetailPage.enterPanNumber('BSSSS1233D');
        EmployeeDetailPage.selectDateOfJoining();
        EmployeeDetailPage.selectMaritalStatus('Single');
        EmployeeDetailPage.clickNextButton();
    
        //   Contact Details   //

        EmployeeDetailPage.enterPhoneNumber('6448744833');
        EmployeeDetailPage.enterAlternateNumber('3673636733');
        EmployeeDetailPage.selectRelationship('Mother');
        EmployeeDetailPage.enterAlternateName('Mattews');
        EmployeeDetailPage.enterPresentAddress('Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016');
        EmployeeDetailPage.enterPermanentAddress('Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016');
        EmployeeDetailPage.clickNextButton();

        //Submit 


        EmployeeDetailPage.clickSubmitButton();
        cy.wait(5000);
        EmployeeDetailPage.validateThankYouSuccessMessage('Thank you!');



    })
    
});
