import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/Invitations";
import L1ApprovalAction from "../pages/L1ApprovalAction";
import verifyPersonalEmailPopup from "../pages/popups/VerifyPersonalEmailPopup";
import { generateRandomYopmail, generateRandomString } from '../../support/utils';


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
        const JoineeData = {
            JoineeEmail: generateRandomYopmail(10),
            Firstname: generateRandomString(7),
            LastName: generateRandomString(5),
            Gender: 'Female',
            BloodGroup: 'A+ve',
            DateOfBirth: '2000-09-24',
            AadharNumber: '232324324342',
            PanNumber: 'BSSSS1233D',
            DateOfJoining: '2024-09-23',
            MaritalStatus: 'Single',
            PhoneNumber: '6448744833',
            AlternatePhone: '3673636733',
            RelationShip: 'Mother',
            AlterName: 'Mattews',
            PresentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
            PermanentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
        }

        // Login and Navigation to Invitation
        cy.login();
        sideBar.navigateTo("Employee Onboard", "Invitations");

        // Create invite
        invitations.clickInviteEmployeeButton();
        // let joineeEmail = generateRandomYopmail(10);
        invitations.enterEmailID(JoineeData.JoineeEmail);
        invitations.enterEmployeeName("Mattews");
        invitations.selectSamplePdf('cypress/fixtures/resources/dummy.pdf');
        invitations.clickSubmitButton();
        invitations.validateOnboardingEmailSentMsg('Onboarding welcome mail sent');

        // Wait for mail and navigate to the url received in the mail
        cy.wait(5000);
        cy.task('getConfirmaUrl', JoineeData.JoineeEmail).then(confirmationUrl => {
            cy.visit(String(confirmationUrl), { failOnStatusCode: false });
        });

        // Provide joinee's valid email to continue
        verifyPersonalEmailPopup.enterPersonalEmailID(JoineeData.JoineeEmail);
        verifyPersonalEmailPopup.clickSubmitButton();

        // Providing Personal Details  
        EmployeeDetailPage.enterFirstName(JoineeData.Firstname);
        EmployeeDetailPage.enterLastName(JoineeData.LastName);
        EmployeeDetailPage.checkGender(JoineeData.Gender);
        EmployeeDetailPage.selectBloodGroup(JoineeData.BloodGroup);
        EmployeeDetailPage.selectDateOfBirth(JoineeData.DateOfBirth);
        EmployeeDetailPage.enterAdhaarNumber(JoineeData.AadharNumber);
        EmployeeDetailPage.enterPanNumber(JoineeData.PanNumber);
        EmployeeDetailPage.selectDateOfJoining(JoineeData.DateOfJoining);
        EmployeeDetailPage.selectMaritalStatus(JoineeData.MaritalStatus);
        EmployeeDetailPage.clickNextButton();

        // Providing Contact Details
        EmployeeDetailPage.enterPhoneNumber(JoineeData.PhoneNumber);
        EmployeeDetailPage.enterAlternateNumber(JoineeData.AlternatePhone);
        EmployeeDetailPage.selectRelationship(JoineeData.RelationShip);
        EmployeeDetailPage.enterAlternateName(JoineeData.AlterName);
        EmployeeDetailPage.enterPresentAddress(JoineeData.PresentAddress);
        EmployeeDetailPage.enterPermanentAddress(JoineeData.PermanentAddress);
        EmployeeDetailPage.clickNextButton();


        // Verify if valid information is reflected in last step
        // let value = EmployeeDetailPage.getFieldValue("Gender")
        // cy.log(value);
        // Submit the Details 
        EmployeeDetailPage.clickSubmitButton();

        // Validating the Thank You Success message
        EmployeeDetailPage.validateSuccessMessage();


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
