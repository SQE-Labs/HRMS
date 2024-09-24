import sideBar from "../components/SideBar";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import invitations from "../pages/InvitationsPage";
import L1ApprovalActionPage from "../pages/L1ApprovalActionPage";
import verifyPersonalEmailPopup from "../pages/popups/VerifyPersonalEmailPopup";
import HomePage from "../pages/HomePage";
import { generateRandomYopmail, generateRandomString, 
    generateRandomCaeliusEmail, generateRandomNumber,selectDrpValueByText } from '../../support/utils';
import HRApprovalPage from "../pages/HRApprovalPage";


describe("Employee Onboard Tests", () => {

    it.only("ONBRD_1: Verify that new hire is able to submit the onboarding form", () => {
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
        invitations.onBoardingSuccessMsg.should('contain.text', 'Onboarding welcome mail sent');
      
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
            PassportNo: generateRandomString(1)+generateRandomNumber(11),
            PhoneNumber: '6448744833',
            AlternatePhone: '3673636733',
            RelationshipWithAlterNumber: 'Mother',
            AlterName: 'Mattews',
            PresentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
            PermanentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
            CaeliusEmail: generateRandomCaeliusEmail(6),
            Department: 'Marketing',
            Designation:'Demooo',
            AssignManager: 'DDinesh D Kumar',
            EmployeeType: 'REGULAR',
            messagesToValidate : [
                'Thank you!',
                'Your submission has been sent successfully.',
                'HR will get back to you shortly.'
            ]
        }

        // Wait for mail and navigate to the url received in the mail
        cy.wait(3000);
        cy.task('getConfirmaUrl', JoineeData.JoineeEmail).then(confirmationUrl => {
            cy.visit(String(confirmationUrl), { failOnStatusCode: false });
        });

        // Provide joinee's valid email to continue
        verifyPersonalEmailPopup.enterPersonalEmailID(JoineeData.JoineeEmail);

       // cy.pause();
        verifyPersonalEmailPopup.clickSubmitButton();

        // Providing Personal Details  
        EmployeeDetailPage.enterFirstName(JoineeData.Firstname);
        EmployeeDetailPage.enterMiddleName(JoineeData.MiddleName);
        EmployeeDetailPage.enterLastName(JoineeData.LastName);
        EmployeeDetailPage.checkGender(JoineeData.Gender);
        selectDrpValueByText(EmployeeDetailPage.bloodGroup,JoineeData.BloodGroup)
        EmployeeDetailPage.selectDateOfBirth(JoineeData.DateOfBirth);
        EmployeeDetailPage.enterAdhaarNumber(JoineeData.AadharNumber);
        EmployeeDetailPage.enterPanNumber(JoineeData.PanNumber);
        EmployeeDetailPage.selectDateOfJoining(JoineeData.DateOfJoining);
        selectDrpValueByText(EmployeeDetailPage.maritalStatus,JoineeData.MaritalStatus);
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
        cy.validateSuccessMessages(JoineeData.messagesToValidate);

        // Navigate to Homepage > Employee Onboard > L1 Approval Action 
        HomePage.navigateToHomePage();

        sideBar.navigateTo("Employee Onboard", "L1 Approval");
        
        // Viewing Newly Onboard Invitation
        L1ApprovalActionPage.selectItemsPerPage();
        L1ApprovalActionPage.clickOnPagenationNextButton();
        L1ApprovalActionPage.clickOnPagenationNextButton();
        L1ApprovalActionPage.SearchNewJoineeByName(JoineeData.Firstname);

        // L1ApprovalAction.validateEmailForNewJoinee();
        L1ApprovalActionPage.EmployeesTable.getRowsCount.should('equal', 1);
        L1ApprovalActionPage.EmployeesTable.viewApprvalByMailAddress(JoineeData.JoineeEmail);

        // Validating Personal Details for New Joinee
        L1ApprovalActionPage.firstName.should('be.visible').and('have.value', JoineeData.Firstname);
        L1ApprovalActionPage.lastName.should('have.value', JoineeData.LastName);
        L1ApprovalActionPage.personalEmail.should('have.value', JoineeData.JoineeEmail);
        L1ApprovalActionPage.gender.should('be.checked', JoineeData.Gender);
        L1ApprovalActionPage.bloodGroup.should('have.value', JoineeData.BloodGroup);
        L1ApprovalActionPage.dateOfBirth.should('have.value', JoineeData.DateOfBirth);
        L1ApprovalActionPage.aadharNumber.should('have.value', JoineeData.AadharNumber);
        L1ApprovalActionPage.panNumber.should('have.value', JoineeData.PanNumber);
        L1ApprovalActionPage.dateOfJoining.should('have.value', JoineeData.DateOfJoining);
        L1ApprovalActionPage.maritalStatus.should('have.value', JoineeData.MaritalStatus);

        // Validating Contact Details
        L1ApprovalActionPage.switchToContactDetailTab();
        L1ApprovalActionPage.phoneNumber.should('be.visible').and('have.value', JoineeData.PhoneNumber);
        L1ApprovalActionPage.alternateNumber.should('have.value', JoineeData.AlternatePhone);
        L1ApprovalActionPage.relationshipWithAlternateNo.should('have.value', JoineeData.RelationshipWithAlterNumber.toLowerCase());
        L1ApprovalActionPage.alternateName.should('have.value', JoineeData.AlterName);
        L1ApprovalActionPage.presentAddress.should('have.value', JoineeData.PresentAddress);
        L1ApprovalActionPage.permanentAddress.should('have.value', JoineeData.PermanentAddress);

        // Validating Approve Tab
        L1ApprovalActionPage.switchToApproveTab();
        L1ApprovalActionPage.firstNameOnApproveTab.should('be.visible').and('have.text', JoineeData.Firstname);
        L1ApprovalActionPage.lastNameOnApproveTab.should('have.text', JoineeData.LastName);
        
        L1ApprovalActionPage.enterCaeliusEmail(JoineeData.CaeliusEmail);
        L1ApprovalActionPage.clickOnSubmitButton();

        // Validating the Thank You Success message
        cy.validateSuccessMessages('User Email has been successfully updated.');

        // Navigate to Homepage > HR Approval Page
        cy.wait(3000)
        HomePage.navigateToHomePage();
        sideBar.navigateTo("Employee Onboard", "HR Approval");

        // Viewing Newly Onboard Invitation to HR Approval Page
        L1ApprovalActionPage.selectItemsPerPage();
        L1ApprovalActionPage.clickOnPagenationNextButton();
        L1ApprovalActionPage.SearchNewJoineeByName(JoineeData.Firstname);

        // Verify that only single result appears
        L1ApprovalActionPage.EmployeesTable.getRowsCount.should('equal', 1);

        // L1ApprovalAction.viewButtonOnSearchedJoinee;
        L1ApprovalActionPage.EmployeesTable.viewApprvalByMailAddress(JoineeData.JoineeEmail);
        
        // Validating Personal Details for New Joinee
        L1ApprovalActionPage.firstName.should('be.visible').and('have.value', JoineeData.Firstname);
        L1ApprovalActionPage.lastName.should('have.value', JoineeData.LastName);
        L1ApprovalActionPage.personalEmail.should('have.value', JoineeData.JoineeEmail);
        L1ApprovalActionPage.gender.should('be.checked', JoineeData.Gender);
        L1ApprovalActionPage.bloodGroup.should('have.value', JoineeData.BloodGroup);
        L1ApprovalActionPage.dateOfBirth.should('have.value', JoineeData.DateOfBirth);
        L1ApprovalActionPage.aadharNumber.should('have.value', JoineeData.AadharNumber);
        L1ApprovalActionPage.panNumber.should('have.value', JoineeData.PanNumber);
        L1ApprovalActionPage.dateOfJoining.should('have.value', JoineeData.DateOfJoining);
        L1ApprovalActionPage.maritalStatus.should('have.value', JoineeData.MaritalStatus);

        // Validating Contact Details
        L1ApprovalActionPage.switchToContactDetailTab();
        L1ApprovalActionPage.phoneNumber.should('be.visible').and('have.value', JoineeData.PhoneNumber);
        L1ApprovalActionPage.alternateNumber.should('have.value', JoineeData.AlternatePhone);
        L1ApprovalActionPage.relationshipWithAlternateNo.should('have.value', JoineeData.RelationshipWithAlterNumber.toLowerCase());
        L1ApprovalActionPage.alternateName.should('have.value', JoineeData.AlterName);
        L1ApprovalActionPage.presentAddress.should('have.value', JoineeData.PresentAddress);
        L1ApprovalActionPage.permanentAddress.should('have.value', JoineeData.PermanentAddress);

        // Validating and Providing Approve Details
        L1ApprovalActionPage.switchToApproveTab();

        //HRApproval.caeliusEmail.should('have,text',JoineeData.CaeliusEmail);
        HRApprovalPage.selectDepartment(JoineeData.Department);
        HRApprovalPage.selectDesignation(JoineeData.Designation);
        HRApprovalPage.selectAssignManager(JoineeData.AssignManager);
        HRApprovalPage.selectEmployeeType(JoineeData.EmployeeType);
        HRApprovalPage.clickApproveButton();

        // Validating the Thank You Success message
        cy.validateSuccessMessages("Employee's HRMIS account created ");
    })

});
