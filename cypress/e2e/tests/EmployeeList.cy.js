import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import UserDashboard from "../pages/UserDashboard";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";

describe("Employee Onboard Tests", () => {

    it("HRMIS_1: Verify that 'Employee List' page opens up, when user clicks on 'Employee Management'.", () => {
        cy.login();
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameToSearch('Tests');
        EmployeeListPage.validateNoRecordsAppear();

        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameToSearch('Automation');
        EmployeeListPage.countTotalEmployees(1);

        // Verify that the information message appears for the selected department with no records.
        EmployeeListPage.selectUser();
        UserDashboard.clickOnWorkExperience();
        UserDashboard.validateNoRecordsAppear();
        
        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        UserDashboard.clickOnBasicInfo();
       // EmployeeDetailPage.getFieldValue('First Name').should('be.visible');
        EmployeeDetailPage.getFieldValue("First Name").should('be.visible');
        UserDashboard.middleName.should('be.visible');
        UserDashboard.lastName.should('be.visible');
        UserDashboard.employeeID.should('be.visible');
        UserDashboard.email.should('be.visible');
        
        // Verify that data do not get saved on clicking 'Close' button.
        UserDashboard.clickOnEditButtonBasicInfo();
        UserDashboard.updateFirstName('Autom');
        UserDashboard.updateMiddleName('Mation1');
        UserDashboard.updateLastName('User1');
        UserDashboard.clickOnCloseButton();
        UserDashboard.verifyFirstName('Auto');
        UserDashboard.verifyMiddleName('Mation');
        UserDashboard.verifyLastName('User');
        UserDashboard.verifyEmployeeID('CCIT/09_24/501');
        UserDashboard.verifyEmailID('AutomationUser@caeliusconsulting.com');

        // Verify that data gets saved on clicking 'close' button.
        UserDashboard.clickOnEditButtonBasicInfo();
        UserDashboard.updateFirstName('Auto');
        UserDashboard.updateMiddleName('Mation');
        UserDashboard.updateLastName('User');
        UserDashboard.clickOnUpdateButton();
        UserDashboard.validateSuccessMessage();
        UserDashboard.verifyFirstName('Auto');
        UserDashboard.verifyMiddleName('Mation');
        UserDashboard.verifyLastName('User');
        UserDashboard.verifyEmployeeID('CCIT/09_24/501');
        UserDashboard.verifyEmailID('AutomationUser@caeliusconsulting.com');

        // Verify that 'Basic Info' accordion gets collapsed.
        UserDashboard.clickOnBasicInfo();
        UserDashboard.validateAccordionCollapsed();

    });

})