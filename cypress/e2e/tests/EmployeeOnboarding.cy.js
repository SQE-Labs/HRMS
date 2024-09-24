import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/Invitations";
import L1ApprovalAction from "../pages/L1ApprovalAction";
import verifyPersonalEmailPopup from "../pages/popups/VerifyPersonalEmailPopup";
import HomePage from "../pages/HomePage";
import {
    generateRandomYopmail, generateRandomString,
    generateRandomCaeliusEmail, generateRandomNumber
} from '../../support/utils';
import HRApproval from "../pages/HRApproval";


describe("Employee Onboard Tests", () => {

    it("ONBRD_1: Verify that new hire is able to submit the onboarding form", () => {
        // Login
        cy.login();

        // Invite new Employee
        sideBar.navigateTo("Employee Onboard", "Invitations");
        invitations.clickInviteEmployeeButton();
        const joineePersonalMail = generateRandomYopmail(10);
        invitations.enterEmailID(joineePersonalMail);
        invitations.enterEmployeeName("Mattews");
        invitations.selectSamplePdf('cypress/fixtures/resources/dummy.pdf');
        invitations.clickSubmitButton();

        // Verify mail sent notification is displayed
        invitations.validateOnboardingEmailSentMsg('Onboarding welcome mail sent');

        // New Employee Details test Data
        const JoineeData = {
            JoineeEmail: joineePersonalMail,
            Firstname: generateRandomString(7),
            MiddleName: generateRandomString(4),
            LastName: generateRandomString(5),
            Gender: 'Female',
            BloodGroup: 'A+ve',
            DateOfBirth: '2000-09-24',
            AadharNumber: '232324324342',
            PanNumber: 'BSSSS1233D',
            DateOfJoining: '2024-09-23',
            MaritalStatus: 'Single',
            PassportNo: generateRandomString(1) + generateRandomNumber(11),
            PhoneNumber: '6448744833',
            AlternatePhone: '3673636733',
            RelationshipWithAlterNumber: 'Mother',
            AlterName: 'Mattews',
            PresentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
            PermanentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
            CaeliusEmail: generateRandomCaeliusEmail(6),
            Department: 'Marketing',
            Designation: 'Demooo',
            AssignManager: 'DDinesh D Kumar',
            EmployeeType: 'REGULAR'
        }

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
        EmployeeDetailPage.enterMiddleName(JoineeData.MiddleName);
        EmployeeDetailPage.enterLastName(JoineeData.LastName);
        EmployeeDetailPage.checkGender(JoineeData.Gender);
        EmployeeDetailPage.selectBloodGroup(JoineeData.BloodGroup);
        EmployeeDetailPage.selectDateOfBirth(JoineeData.DateOfBirth);
        EmployeeDetailPage.enterAdhaarNumber(JoineeData.AadharNumber);
        EmployeeDetailPage.enterPanNumber(JoineeData.PanNumber);
        EmployeeDetailPage.selectDateOfJoining(JoineeData.DateOfJoining);
        EmployeeDetailPage.selectMaritalStatus(JoineeData.MaritalStatus);
        EmployeeDetailPage.enterPassportNumber(JoineeData.PassportNo);
        EmployeeDetailPage.clickNextButton();

        // Providing Contact Details
        EmployeeDetailPage.enterPhoneNumber(JoineeData.PhoneNumber);
        EmployeeDetailPage.enterAlternateNumber(JoineeData.AlternatePhone);
        EmployeeDetailPage.selectRelationship(JoineeData.RelationshipWithAlterNumber);
        EmployeeDetailPage.enterAlternateName(JoineeData.AlterName);
        EmployeeDetailPage.enterPresentAddress(JoineeData.PresentAddress);
        EmployeeDetailPage.enterPermanentAddress(JoineeData.PermanentAddress);
        EmployeeDetailPage.clickNextButton();

        // Verify if valid information is reflected in last step        
        EmployeeDetailPage.getFieldValue("First Name").should('equal', JoineeData.Firstname);
        EmployeeDetailPage.getFieldValue("Middle Name").should('equal', JoineeData.MiddleName);
        EmployeeDetailPage.getFieldValue("Last Name").should('equal', JoineeData.LastName);
        EmployeeDetailPage.getFieldValue("Personal Email").should('equal', JoineeData.JoineeEmail);
        EmployeeDetailPage.getFieldValue("Gender").should('equal', JoineeData.Gender.toLowerCase());
        EmployeeDetailPage.getFieldValue("Blood Group").should('equal', JoineeData.BloodGroup);
        EmployeeDetailPage.getFieldValue("Date of Joining").should('equal', JoineeData.DateOfJoining);
        EmployeeDetailPage.getFieldValue("Marital Status").should('equal', JoineeData.MaritalStatus);
        EmployeeDetailPage.getFieldValue("Date of Birth").should('equal', JoineeData.DateOfBirth);
        EmployeeDetailPage.getFieldValue("Aadhar No.").should('equal', JoineeData.AadharNumber);
        EmployeeDetailPage.getFieldValue("PAN Card No.").should('equal', JoineeData.PanNumber);
        EmployeeDetailPage.getFieldValue("Passport No.").should('equal', JoineeData.PassportNo);
        EmployeeDetailPage.getFieldValue("Phone Number").should('equal', JoineeData.PhoneNumber);
        EmployeeDetailPage.getFieldValue("Alternate Name").should('equal', JoineeData.AlterName);
        EmployeeDetailPage.getFieldValue("Alternate Number").should('equal', JoineeData.AlternatePhone);
        EmployeeDetailPage.getFieldValue("Present Address").should('equal', JoineeData.PermanentAddress);
        EmployeeDetailPage.getFieldValue("Rel. with alternate").should('equal', JoineeData.RelationshipWithAlterNumber.toLowerCase());
        EmployeeDetailPage.getFieldValue("Permanent Address").should('equal', JoineeData.PermanentAddress);

        // Submit the Details 
        EmployeeDetailPage.clickSubmitButton();

        // Validating the Thank You Success message
        EmployeeDetailPage.validateSuccessMessage();

        // Navigate to Homepage > Employee Onboard > L1 Approval Action 
        HomePage.navigateToHomePage();

        sideBar.navigateTo("Employee Onboard", "L1 Approval");

        // Viewing Newly Onboard Invitation
        L1ApprovalAction.selectItemsPerPage();
        L1ApprovalAction.clickOnPagenationNextButton();
        L1ApprovalAction.SearchNewJoineeByName(JoineeData.Firstname);

        // L1ApprovalAction.validateEmailForNewJoinee();
        L1ApprovalAction.EmployeesTable.getRowsCount.should('equal', 1);
        L1ApprovalAction.EmployeesTable.viewApprvalByMailAddress(JoineeData.JoineeEmail);

        // Validating Personal Details for New Joinee
        L1ApprovalAction.firstName.should('be.visible').and('have.value', JoineeData.Firstname);
        L1ApprovalAction.lastName.should('have.value', JoineeData.LastName);
        L1ApprovalAction.personalEmail.should('have.value', JoineeData.JoineeEmail);
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
        L1ApprovalAction.alternateNumber.should('have.value', JoineeData.AlternatePhone);
        L1ApprovalAction.relationshipWithAlternateNo.should('have.value', JoineeData.RelationshipWithAlterNumber.toLowerCase());
        L1ApprovalAction.alternateName.should('have.value', JoineeData.AlterName);
        L1ApprovalAction.presentAddress.should('have.value', JoineeData.PresentAddress);
        L1ApprovalAction.permanentAddress.should('have.value', JoineeData.PermanentAddress);

        // Validating Approve Tab
        L1ApprovalAction.switchToApproveTab();
        L1ApprovalAction.firstNameOnApproveTab.should('be.visible').and('have.text', JoineeData.Firstname);
        L1ApprovalAction.lastNameOnApproveTab.should('have.text', JoineeData.LastName);
        L1ApprovalAction.enterCaeliusEmail(JoineeData.CaeliusEmail);
        L1ApprovalAction.clickOnSubmitButton();

        // Validating the Thank You Success message
        L1ApprovalAction.validateSuccessMessage();

        // Navigate to Homepage > HR Approval Page
        cy.wait(3000)
        HomePage.navigateToHomePage();
        sideBar.navigateTo("Employee Onboard", "HR Approval");

        // Viewing Newly Onboard Invitation to HR Approval Page
        L1ApprovalAction.selectItemsPerPage();
        L1ApprovalAction.clickOnPagenationNextButton();
        L1ApprovalAction.SearchNewJoineeByName(JoineeData.Firstname);

        // Verify that only single result appears
        L1ApprovalAction.EmployeesTable.getRowsCount.should('equal', 1);

        // L1ApprovalAction.viewButtonOnSearchedJoinee;
        L1ApprovalAction.EmployeesTable.viewApprvalByMailAddress(JoineeData.JoineeEmail);

        // Validating Personal Details for New Joinee
        L1ApprovalAction.firstName.should('be.visible').and('have.value', JoineeData.Firstname);
        L1ApprovalAction.lastName.should('have.value', JoineeData.LastName);
        L1ApprovalAction.personalEmail.should('have.value', JoineeData.JoineeEmail);
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
        L1ApprovalAction.alternateNumber.should('have.value', JoineeData.AlternatePhone);
        L1ApprovalAction.relationshipWithAlternateNo.should('have.value', JoineeData.RelationshipWithAlterNumber.toLowerCase());
        L1ApprovalAction.alternateName.should('have.value', JoineeData.AlterName);
        L1ApprovalAction.presentAddress.should('have.value', JoineeData.PresentAddress);
        L1ApprovalAction.permanentAddress.should('have.value', JoineeData.PermanentAddress);

        // Validating and Providing Approve Details
        L1ApprovalAction.switchToApproveTab();

        //HRApproval.caeliusEmail.should('have,text',JoineeData.CaeliusEmail);
        HRApproval.selectDepartment(JoineeData.Department);
        HRApproval.selectDesignation(JoineeData.Designation);
        HRApproval.selectAssignManager(JoineeData.AssignManager);
        HRApproval.selectEmployeeType(JoineeData.EmployeeType);
        


        HRApproval.clickApproveButton();

        // Validating the Thank You Success message
        HRApproval.validateSuccessMessage();
    })

    it("intercept", ()=> {
        cy.intercept('POST', '/v1/track').as('somethingas');

        cy.visit('https://qasource.com');

        cy.wait('@somethingas').then(data => {
            cy.log(data.response.headers.date);
        })
    })

    it.only("asdasdasdasdasd", ()=>{
        cy.visit("https://www.google.com");
        

        cy.wait(5000);

        cy.window().then((win) => {
            const newWindow = win.open('https://www.flipkart.com');
            cy.wait(5000);
            cy.visit("https://www.google.com");
            cy.wait(5000);
          });
    })

});
