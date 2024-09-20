import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import UserDashboardPage from "../pages/UserDashboardPage";

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
        EmployeeListPage.noRecordAvailable.should('have.text', "No Records Available");
    
        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameToSearch('Automation');
        EmployeeListPage.countTotalEmployees(1);

        // Verify that the information message appears for the selected department with no records.
        EmployeeListPage.clickOnUserCard();
        UserDashboardPage.clickOnWorkExperience();
        UserDashboardPage.noRecordAvailable.should('have.text', "No records available");
        cy.log("No Records Appear")
       
        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        UserDashboardPage.clickOnBasicInfo();
        UserDashboardPage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboardPage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboardPage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboardPage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboardPage.getFieldValue("Email").should('equal', EmployeeData.EmailID);
        
        // Verify that data do not get saved on clicking 'Close' button.
        UserDashboardPage.clickOnEditButtonBasicInfo();
        UserDashboardPage.enterFirstName('Autom');
        UserDashboardPage.enterMiddleName('Mation1');
        UserDashboardPage.enterLastName('User1');
        UserDashboardPage.clickOnCloseButton();
        UserDashboardPage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboardPage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboardPage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboardPage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboardPage.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'update' button.
        UserDashboardPage.clickOnEditButtonBasicInfo();
        UserDashboardPage.enterFirstName('Auto');
        UserDashboardPage.enterMiddleName('Mation');
        UserDashboardPage.enterLastName('User');
        UserDashboardPage.clickOnUpdateButton();
        cy.validateSuccessMessages("success");
        UserDashboardPage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        UserDashboardPage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        UserDashboardPage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        UserDashboardPage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        UserDashboardPage.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        UserDashboardPage.clickOnBasicInfo();
        UserDashboardPage.editBasicInfo.should('not.be.visible');
        cy.log("Accordion Is Collapsed");

    });

})