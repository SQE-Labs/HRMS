import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";

describe("Employee List Tests", () => {

    it("HRMIS_1: Verify that 'Employee List' page opens up, when user clicks on 'Employee Management'.", () => {

        // Employee List Details Test Data

        const EmployeeData = {
            FirstName: 'Auto',
            LastName: 'User',
            MiddleName: 'Mation',
            EmployeeID: 'CCIT/10_24/559',
            EmailID: 'autouser@caeliusconsulting.com',
            
        }
        cy.login();
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('invalidName');
        EmployeeListPage.noRecordAvailable.should('have.text', "No Record Available");
    
        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('Auto Mation User');
        EmployeeListPage.getTotalEmployeescount().then((employcount) => {
            expect(employcount).to.equal(1);
            });
      

        // Verify that the information message appears for the selected department with no records.
        EmployeeListPage.clickOnUserCard('Auto Mation User');
        EmployeeProfilePage.clickOnWorkExperience();
        EmployeeProfilePage.noRecordAvailableInfo.should('have.text', "No records available");
        cy.log("No Records Appear")
       
        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', EmployeeData.EmailID);
        
        // Verify that data do not get saved on clicking 'Close' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Autom');
        EmployeeProfilePage.updateMiddleName('Mation1');
        EmployeeProfilePage.updateLastName('User1');
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'update' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Auto');
        EmployeeProfilePage.updateMiddleName('Mation');
        EmployeeProfilePage.updateLastName('User');
        EmployeeProfilePage.clickOnUpdateButton();
        cy.validateSuccessMessages("success");
        EmployeeProfilePage.getFieldValue("First Name").should('equal', EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.editBasicInfoBtn.should('not.be.visible');
        cy.log("Accordion Is Collapsed");

    });

})