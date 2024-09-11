import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/Invitations";
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

        EmployeeDetailPage.viewJoineeApplication()
    })

});
