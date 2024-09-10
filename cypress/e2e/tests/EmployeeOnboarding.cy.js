import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/Invitations";
import L1ApprovalAction from "../pages/L1ApprovalAction";
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

    it.only("Verify that record of new hire appears on 'L1 Approval' page", () => {

    // New Joinee Record    
        const JoineeData = {
        PersonalEmail: 'Mattew@yopmail.com',
        Firstname: 'Mattew',
        LastName: 'Haden',
        Gender: 'male',
        BloodGroup: 'A+ve',
        DateOfBirth: '2001-12-31',
        AadharNumber: '426225626522',
        PanNumber: 'DFDHD3435G',
        DateOfJoining: '2024-09-12',
        MaritalStatus: 'Single',
        PhoneNumber: '7362726232',
        AlternateNumber: '3434333434',
        Relationship: 'mother',
        AlternateName: 'Matt',
        PresentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016\n',
        PermanentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016\n',
        SuggestedPassword: 'MATT20011231',
        CaeliusEmail: 'shubh@caeliusconsulting.com'
        }

        // Login with Default User
        cy.login();    

        // Navigate to L1 Approval Action Page
        sideBar.navigateTo("Employee Onboard", "L1 Approval");

        // Viewing Newly Onboard Invitation
        L1ApprovalAction.clickOnViewButton();

        // Validating Personal Details
        L1ApprovalAction.firstName.should('be.visible').and('have.value', JoineeData.Firstname);
        L1ApprovalAction.lastName.should('have.value', JoineeData.LastName);
        L1ApprovalAction.personalEmail.should('have.value', JoineeData.PersonalEmail);
        L1ApprovalAction.gender.should('be.checked', JoineeData.Gender);
        L1ApprovalAction.bloodGroup.should('have.value', JoineeData.BloodGroup);
        L1ApprovalAction.dateOfBirth.should('have.value', JoineeData.DateOfBirth);
        L1ApprovalAction.aadharNumber.should('have.value', JoineeData.AadharNumber);
        L1ApprovalAction.panNumber.should('have.value', JoineeData.PanNumber);
        L1ApprovalAction.dateOfJoining.should('have.value', JoineeData.DateOfJoining);
        L1ApprovalAction.maritalStatus.should('have.value', JoineeData.MaritalStatus);

        // Validating Contact Details
        L1ApprovalAction.switchToContactDetailTab();
        L1ApprovalAction.phoneNumber.should('be.visible').and('have.value', JoineeData.PhoneNumber);
        L1ApprovalAction.alternateNumber.should('have.value', JoineeData.AlternateNumber);
        L1ApprovalAction.relationshipWithAlternateNo.should('have.value', JoineeData.Relationship);
        L1ApprovalAction.alternateName.should('have.value', JoineeData.AlternateName);
        L1ApprovalAction.presentAddress.should('have.value', JoineeData.PresentAddress);
        L1ApprovalAction.permanentAddress.should('have.value', JoineeData.PermanentAddress);

        // Validating Approve Tab
        L1ApprovalAction.switchToApproveTab();
        L1ApprovalAction.firstNameOnApproveTab.should('be.visible').and('have.text', JoineeData.Firstname);
        L1ApprovalAction.lastNameOnApproveTab.should('have.text', JoineeData.LastName);
        L1ApprovalAction.suggestedPassword.should('have.text', JoineeData.SuggestedPassword);
        L1ApprovalAction.enterCaeliusEmail(JoineeData.CaeliusEmail);
        // L1ApprovalAction.clickOnSubmitButton();











       
       
    })
    
});
