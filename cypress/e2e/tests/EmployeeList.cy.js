import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import UserDashboard from "../pages/UserDashboard";

let currentTestName = '';

describe("Employee Onboard Tests", () => {

    beforeEach(function () {

        currentTestName = this.currentTest.title;

        if (currentTestName !== "HRMIS_1: Verify that the 'Employee List' page and the User Dashboard load successfully.") {
            cy.login();
            EmployeeListPage.navigateToUserDashboardPage("DDinesh");
        }
    });

    it("HRMIS_1: Verify that the 'Employee List' page and the User Dashboard load successfully.", () => {

        //Login and Navigate to Employees List Page
        cy.login();
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('invalidName');
        EmployeeListPage.validateNoRecordsAppear();

        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('DDinesh');
        EmployeeListPage.countTotalEmployees(1);

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
        UserDashboard.clickOnBasicInfoAccord();
        UserDashboard.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboard.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboard.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboard.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboard.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that data do not get saved on clicking 'Close' button.
        UserDashboard.clickOnEditButtonBasicInfo();
        UserDashboard.updateFirstNameField('Autom');
        UserDashboard.updateMiddleNameField('Mation1');
        UserDashboard.updateLastNameField('User1');
        UserDashboard.clickOnCloseButton();
        UserDashboard.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboard.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboard.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboard.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboard.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'Update' button.
        UserDashboard.clickOnEditButtonBasicInfo();
        UserDashboard.updateFirstNameField('DDinesh');
        UserDashboard.updateMiddleNameField('D');
        UserDashboard.updateLastNameField('Kumar');
        UserDashboard.clickOnUpdateButton();
        UserDashboard.validateSuccessMessage();
        UserDashboard.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboard.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboard.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboard.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboard.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        UserDashboard.clickOnBasicInfoAccord();
        UserDashboard.validateAccordionCollapsed();
    });

    it("HRMIS_3: Verify that the 'Work' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        const EmployeeData = {
            Department: 'Technical',
            Designation: 'Senior Salesforce Developer',
            ReportingTo: '-',
            DOJ: '25-07-2024',
            EmployeeStatus: 'VERIFIED',
            EmployeeType: 'Full Time',
            UpdateDOJ: '2024-09-30',
            UpdatedDOJ: '30-09-2024',
            RecentDOJ: '2024-07-25',
        }

        // Verify that 'Work' accordion gets expanded, when user clicks 'Work' accordion.
        UserDashboard.clickOnWorkAccord();
        UserDashboard.getFieldValue("Department").should('equal', EmployeeData.Department);
        UserDashboard.getFieldValue("Designation").should('equal', EmployeeData.Designation);
        UserDashboard.getFieldValue("Reporting To").should('equal', EmployeeData.ReportingTo);
        UserDashboard.getFieldValue("Date of Joining").should('equal', EmployeeData.DOJ);
        UserDashboard.getFieldValue("Employee Status").should('equal', EmployeeData.EmployeeStatus);
        UserDashboard.getFieldValue("Employee Type").should('equal', EmployeeData.EmployeeType);

        //Verify that data do not get saved on clicking 'Close' button'
        UserDashboard.clickOnEditButtonWorkInfo();
        UserDashboard.updateDOJPicker(EmployeeData.UpdateDOJ);
        UserDashboard.clickOnCloseButton();
        UserDashboard.getFieldValue("Date of Joining").should('equal', EmployeeData.DOJ);

        //Verify that data do not get saved on clicking 'Update' button'
        UserDashboard.clickOnEditButtonWorkInfo();
        UserDashboard.updateDOJPicker(EmployeeData.UpdateDOJ);
        UserDashboard.clickOnUpdateButton();
        UserDashboard.validateSuccessMessage();
        UserDashboard.getFieldValue("Date of Joining").should('equal', EmployeeData.UpdatedDOJ);

        //Rollback Date Of Joining Under Work Into Accordion
        UserDashboard.clickOnEditButtonWorkInfo();
        UserDashboard.updateDOJPicker(EmployeeData.RecentDOJ);
        UserDashboard.clickOnUpdateButton();

        //Verify that 'Work' accordion gets collapsed,  when user clicks on 'Work' accordion.
        UserDashboard.clickOnWorkAccord();
        UserDashboard.validateAccordionCollapsed();

    });

    it("HRMIS_4: Verify that the 'Personal Details' accordion expands, and validate the update and close functionalities.", () => {

         //Employee Details Test Data
         const EmployeeData = {
            DateOfBirth: '09-05-1994',
            AdhaarNumber: '477233425262',
            PassportNumber: 'A20964573432',
            PanNumber: 'GSSVS4225Y',
            PresentAddress: '#800 SMALL FLTAS, DHANAS, CHANDIGARH (PIN 160014)',
            BloodGroup: 'AB+ve',
            Gender: 'male',
            AlternateNumber: '9877455076',
            MaritalStatus:'Married',
            PermanentAddress: '#800 SMALL FLTAS, DHANAS, CHANDIGARH (PIN 160014)',

          //Updated Employee Test Data
            DateOfBirth: '09-05-2000',
            AdhaarNumber: '488123345262',
            PassportNumber: 'B20964573432',
            PanNumber: 'ABCD4225Y',
            PresentAddress: '#1000 CHANDIGARH (PIN 160014)',
            BloodGroup: 'A+ve',
            Gender: 'female',
            AlternateNumber: '7676767676',
            MaritalStatus:'Single',
            PermanentAddress: '#1000 CHANDIGARH (PIN 160014)',

        }

        // Verify that 'Personal Details' accordion gets expanded, when user clicks 'Personal Details' accordion.
        UserDashboard.clickOnPersonalDetailsAccord();
        UserDashboard.getFieldValue("Date of Birth").should('equal', EmployeeData.DateOfBirth);
        UserDashboard.getFieldValue("Aadhar Card Number").should('equal', EmployeeData.AdhaarNumber);
        UserDashboard.getFieldValue("Passport Number").should('equal', EmployeeData.PassportNumber);
        UserDashboard.getFieldValue("PAN Number").should('equal', EmployeeData.PanNumber);
        UserDashboard.getFieldValue("Present Address").should('equal', EmployeeData.PresentAddress);
        UserDashboard.getFieldValue("Blood Group").should('equal', EmployeeData.BloodGroup);
        UserDashboard.getFieldValue("Gender").should('equal', EmployeeData.Gender);
        UserDashboard.getFieldValue("Marital Status").should('equal', EmployeeData.MaritalStatus);
        UserDashboard.getFieldValue("Alternate Number").should('equal', EmployeeData.AlternateNumber);
        UserDashboard.getFieldValue("Permanent Address").should('equal', EmployeeData.PermanentAddress);


         //Verify that data do not get saved on clicking 'Close' button'
        UserDashboard.clickOnEditButtonWorkInfo();
        
        });
    })
