import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import UserDashboardPage from "../pages/UserDashboardPage";

let currentTestName = '';

describe("Employee Profile Tests", () => {

    beforeEach(function () {
        cy.login();
    });

    it("HRMIS_1: Verify that the 'Employee List' page and the User Dashboard load successfully.", () => {

        //Login and Navigate to Employees List Page
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('invalidName');
        EmployeeListPage.validateNoRecordsAppear('No Records Available');

        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('DDinesh');
        EmployeeListPage.getTotalEmployeescount(1);

    });

    it("HRMIS_2: Verify that the 'Basic Info' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        const EmployeeData = {
            FirstName: 'DDinesh',
            LastName: 'Kumar',
            MiddleName: 'D',
            EmployeeID: 'CCIT/08_22/409',
            EmailID: 'dinesh87@yopmail.com',

        }

        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        EmployeeListPage.navigateToUserDashboardPage("DDinesh");
        UserDashboardPage.clickOnBasicInfo();
        UserDashboardPage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboardPage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboardPage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboardPage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboardPage.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that data do not get saved on clicking 'Close' button.
        UserDashboardPage.clickOnEditBasicInfoDetails();
        UserDashboardPage.updateFirstName('Autom');
        UserDashboardPage.updateMiddleName('Mation1');
        UserDashboardPage.updateLastName('User1');
        UserDashboardPage.clickOnCloseButton();
        UserDashboardPage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboardPage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboardPage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboardPage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboardPage.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'Update' button.
        UserDashboardPage.clickOnEditBasicInfoDetails();
        UserDashboardPage.updateFirstName('DDinesh');
        UserDashboardPage.updateMiddleName('D');
        UserDashboardPage.updateLastName('Kumar');
        UserDashboardPage.clickOnUpdateButton();
        UserDashboardPage.validateSuccessMessage();
        UserDashboardPage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboardPage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboardPage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboardPage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboardPage.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        UserDashboardPage.clickOnBasicInfo();
        UserDashboardPage.validateAccordionCollapsed();
    });

    it("HRMIS_3: Verify that the 'Work' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        const EmployeeData = {
            Department: 'Technical',
            Designation: 'Senior Salesforce Developer',
            ReportingTo: 'chandler  shan',
            DOJ: '30-09-2024',
            EmployeeStatus: 'VERIFIED',
            EmployeeType: 'Full Time',
            UpdateDOJ: '2024-09-30',
            UpdatedDOJ: '30-09-2024',
            RecentDOJ: '2024-07-25',
        }

        // Verify that 'Work' accordion gets expanded, when user clicks 'Work' accordion.
        EmployeeListPage.navigateToUserDashboardPage("DDinesh");
        UserDashboardPage.clickOnWork();
        UserDashboardPage.getFieldValue("Department").should('equal', EmployeeData.Department);
        UserDashboardPage.getFieldValue("Designation").should('equal', EmployeeData.Designation);
        UserDashboardPage.getFieldValue("Reporting To").should('equal', EmployeeData.ReportingTo);
        UserDashboardPage.getFieldValue("Date of Joining").should('equal', EmployeeData.DOJ);
        UserDashboardPage.getFieldValue("Employee Status").should('equal', EmployeeData.EmployeeStatus);
        UserDashboardPage.getFieldValue("Employee Type").should('equal', EmployeeData.EmployeeType);

        //Verify that data do not get saved on clicking 'Close' button'
        UserDashboardPage.clickOnEditWorkDetails();
        UserDashboardPage.updateDOJ(EmployeeData.UpdateDOJ);
        UserDashboardPage.clickOnCloseButton();
        UserDashboardPage.getFieldValue("Date of Joining").should('equal', EmployeeData.DOJ);

        //Verify that data do not get saved on clicking 'Update' button'
        UserDashboardPage.clickOnEditWorkDetails();
        UserDashboardPage.updateDOJ(EmployeeData.UpdateDOJ);
        UserDashboardPage.clickOnUpdateButton();
        UserDashboardPage.validateSuccessMessage();
        UserDashboardPage.getFieldValue("Date of Joining").should('equal', EmployeeData.UpdatedDOJ);

        //Rollback Date Of Joining Under Work Into Accordion
        UserDashboardPage.clickOnEditWorkDetails();
        UserDashboardPage.updateDOJ(EmployeeData.RecentDOJ);
        UserDashboardPage.clickOnUpdateButton();

        //Verify that 'Work' accordion gets collapsed,  when user clicks on 'Work' accordion.
        UserDashboardPage.clickOnWork();
        UserDashboardPage.validateAccordionCollapsed();

    });

    it("HRMIS_4: Verify that the 'Personal Details' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        const EmployeeData = {
            DateOfBirth: '09-05-1994',
            OriginalDOB: '1994-05-09',
            AdhaarNumber: '477233425262',
            PassportNumber: 'A20964573432',
            PanNumber: 'GSSVS4225Y',
            PresentAddress: '#800 SMALL FLTAS, DHANAS, CHANDIGARH (PIN 160014)',
            BloodGroup: 'AB+ve',
            Gender: 'male',
            AlternateNumber: '9877455076',
            MaritalStatus: 'Married',
            PermanentAddress: '#800 SMALL FLTAS, DHANAS, CHANDIGARH (PIN 160014)',

            //Updated Employee Test Data
            UpdatedDateOfBirth: '2000-05-09',
            UpdatededDateOfBirth: '09-05-2000',
            AdhaarNumber2: '488123345262',
            PassportNumber2: 'B20964573432',
            PanNumber2: 'ABCD42215Y',
            PresentAddress2: '#1000 CHANDIGARH (PIN 160014)',
            BloodGroup2: 'A+ve',
            Gender2: 'female',
            AlternateNumber2: '7676767676',
            MaritalStatus2: 'Single',
            PermanentAddress2: '#1000 CHANDIGARH (PIN 160014)',

        }

        // Verify that 'Personal Details' accordion gets expanded, when user clicks 'Personal Details' accordion.
        EmployeeListPage.navigateToUserDashboardPage("DDinesh");
        UserDashboardPage.clickOnPersonalDetails();
        UserDashboardPage.getFieldValue("Date of Birth").should('equal', EmployeeData.DateOfBirth);
        UserDashboardPage.getFieldValue("Aadhar Card Number").should('equal', EmployeeData.AdhaarNumber);
        UserDashboardPage.getFieldValue("Passport Number").should('equal', EmployeeData.PassportNumber);
        UserDashboardPage.getFieldValue("PAN Number").should('equal', EmployeeData.PanNumber);
        UserDashboardPage.getFieldValue("Present Address").should('equal', EmployeeData.PresentAddress);
        UserDashboardPage.getFieldValue("Blood Group").should('equal', EmployeeData.BloodGroup);
        UserDashboardPage.getFieldValue("Gender").should('equal', EmployeeData.Gender);
        UserDashboardPage.getFieldValue("Marital Status").should('equal', EmployeeData.MaritalStatus);
        UserDashboardPage.getFieldValue("Alternate Number").should('equal', EmployeeData.AlternateNumber);
        UserDashboardPage.getFieldValue("Permanent Address").should('equal', EmployeeData.PermanentAddress);


        //Verify that data do not get saved on clicking 'Close' button' 
        UserDashboardPage.clickOnEditPersonalDetails();
        UserDashboardPage.updateDateOfBirth(EmployeeData.UpdatedDateOfBirth);
        UserDashboardPage.updateBloodGroup(EmployeeData.BloodGroup2);
        UserDashboardPage.updateAdhaarNumber(EmployeeData.AdhaarNumber2);
        UserDashboardPage.updateGender(EmployeeData.Gender2);
        UserDashboardPage.updatePassportNumber(EmployeeData.PassportNumber2);
        UserDashboardPage.updateMaritalStatus(EmployeeData.MaritalStatus2);
        UserDashboardPage.updatePanNumber(EmployeeData.PanNumber2);
        UserDashboardPage.updateAlternateNumber(EmployeeData.AlternateNumber2);
        UserDashboardPage.updatePermanentAddress(EmployeeData.PermanentAddress2);
        UserDashboardPage.updatePresentAddress(EmployeeData.PresentAddress2);
        UserDashboardPage.clickOnCloseButton();

        // Assert after clicking on close button
        UserDashboardPage.getFieldValue("Date of Birth").should('equal', EmployeeData.DateOfBirth);
        UserDashboardPage.getFieldValue("Aadhar Card Number").should('equal', EmployeeData.AdhaarNumber);
        UserDashboardPage.getFieldValue("Passport Number").should('equal', EmployeeData.PassportNumber);
        UserDashboardPage.getFieldValue("PAN Number").should('equal', EmployeeData.PanNumber);
        UserDashboardPage.getFieldValue("Present Address").should('equal', EmployeeData.PresentAddress);
        UserDashboardPage.getFieldValue("Blood Group").should('equal', EmployeeData.BloodGroup);
        UserDashboardPage.getFieldValue("Gender").should('equal', EmployeeData.Gender);
        UserDashboardPage.getFieldValue("Marital Status").should('equal', EmployeeData.MaritalStatus);
        UserDashboardPage.getFieldValue("Alternate Number").should('equal', EmployeeData.AlternateNumber);
        UserDashboardPage.getFieldValue("Permanent Address").should('equal', EmployeeData.PermanentAddress);

         //Verify that data do not get saved on clicking 'update' button' 
         UserDashboardPage.clickOnEditPersonalDetails();
         UserDashboardPage.updateDateOfBirth(EmployeeData.UpdatedDateOfBirth);
         UserDashboardPage.updateBloodGroup(EmployeeData.BloodGroup2);
         UserDashboardPage.updateAdhaarNumber(EmployeeData.AdhaarNumber2);
         UserDashboardPage.updateGender(EmployeeData.Gender2);
         UserDashboardPage.updatePassportNumber(EmployeeData.PassportNumber2);
         UserDashboardPage.updateMaritalStatus(EmployeeData.MaritalStatus2);
         UserDashboardPage.updatePanNumber(EmployeeData.PanNumber2);
         UserDashboardPage.updateAlternateNumber(EmployeeData.AlternateNumber2);
         UserDashboardPage.updatePermanentAddress(EmployeeData.PermanentAddress2);
         UserDashboardPage.updatePresentAddress(EmployeeData.PresentAddress2);
         UserDashboardPage.clickOnUpdateButton();


         // Assert after clicking on update button
        UserDashboardPage.getFieldValue("Date of Birth").should('equal', EmployeeData.UpdatededDateOfBirth);
        UserDashboardPage.getFieldValue("Aadhar Card Number").should('equal', EmployeeData.AdhaarNumber2);
        UserDashboardPage.getFieldValue("Passport Number").should('equal', EmployeeData.PassportNumber2);
        UserDashboardPage.getFieldValue("PAN Number").should('equal', EmployeeData.PanNumber2);
        UserDashboardPage.getFieldValue("Present Address").should('equal', EmployeeData.PresentAddress2);
        UserDashboardPage.getFieldValue("Blood Group").should('equal', EmployeeData.BloodGroup2);
        UserDashboardPage.getFieldValue("Gender").should('equal', EmployeeData.Gender2);
        UserDashboardPage.getFieldValue("Marital Status").should('equal', EmployeeData.MaritalStatus2);
        UserDashboardPage.getFieldValue("Alternate Number").should('equal', EmployeeData.AlternateNumber2);
        UserDashboardPage.getFieldValue("Permanent Address").should('equal', EmployeeData.PermanentAddress2);

        //Clean up and revert back to previous details
        UserDashboardPage.clickOnEditPersonalDetails();
        UserDashboardPage.updateDateOfBirth(EmployeeData.OriginalDOB);
        UserDashboardPage.updateBloodGroup(EmployeeData.BloodGroup);
        UserDashboardPage.updateAdhaarNumber(EmployeeData.AdhaarNumber);
        UserDashboardPage.updateGender(EmployeeData.Gender);
        UserDashboardPage.updatePassportNumber(EmployeeData.PassportNumber);
        UserDashboardPage.updateMaritalStatus(EmployeeData.MaritalStatus);
        UserDashboardPage.updatePanNumber(EmployeeData.PanNumber);
        UserDashboardPage.updateAlternateNumber(EmployeeData.AlternateNumber);
        UserDashboardPage.updatePermanentAddress(EmployeeData.PermanentAddress);
        UserDashboardPage.updatePresentAddress(EmployeeData.PresentAddress);
        UserDashboardPage.clickOnUpdateButton();


        UserDashboardPage.clickOnPersonalDetails();
        UserDashboardPage.editPersonalDetailsBtn.should('not.be.visible');

    });
})
