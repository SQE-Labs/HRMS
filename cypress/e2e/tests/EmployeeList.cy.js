import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import UserDashboard from "../pages/UserDashboard";

describe("Employee Onboard Tests", () => {

    it("HRMIS_1: Verify that 'Employee List' page opens up, when user clicks on 'Employee Management'.", () => {

        // Employee List Details Test Data

        const EmployeeData = {
            FirstName: 'Auto',
            LastName: 'User',
            MiddleName: 'Mation',
            EmployeeID: 'CCIT/09_24/501',
            EmailID: 'AutomationUser@caeliusconsulting.com',
            
        }
        cy.login();
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameToSearch('invalidName');
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
        UserDashboard.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboard.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboard.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboard.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboard.getFieldValue("Email").should('equal', EmployeeData.EmailID);
        
        // Verify that data do not get saved on clicking 'Close' button.
        UserDashboard.clickOnEditButtonBasicInfo();
        UserDashboard.updateFirstName('Autom');
        UserDashboard.updateMiddleName('Mation1');
        UserDashboard.updateLastName('User1');
        UserDashboard.clickOnCloseButton();
        UserDashboard.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboard.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboard.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboard.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboard.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'close' button.
        UserDashboard.clickOnEditButtonBasicInfo();
        UserDashboard.updateFirstName('Auto');
        UserDashboard.updateMiddleName('Mation');
        UserDashboard.updateLastName('User');
        UserDashboard.clickOnUpdateButton();
        UserDashboard.validateSuccessMessage();
        UserDashboard.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboard.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboard.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboard.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboard.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        UserDashboard.clickOnBasicInfo();
        UserDashboard.validateAccordionCollapsed();

    });

})