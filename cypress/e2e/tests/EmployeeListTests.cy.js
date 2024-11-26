import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";

describe("Employee List Tests", () => {

    let testData;
    before(function () {
        cy.fixture('data').then((data) => {
            testData = data;
        });
    })

    beforeEach(() => {

        // login to Application
        cy.login();
    })

    it("HRMIS_1: Verify that 'Employee List' page opens up, when user clicks on 'Employee Management'.", () => {
        
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('invalidName');
        EmployeeListPage.noRecordAvailable.should('have.text', "No Record Available");

        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField(testData.EmployeeName);
        EmployeeListPage.getTotalEmployeescount().then((employcount) => {
            expect(employcount).to.equal(1);
        });


        // Verify that the information message appears for the selected department with no records.
        EmployeeListPage.clickOnUserCard(testData.EmployeeName);
        EmployeeProfilePage.clickOnWorkExperience();
        EmployeeProfilePage.noRecordAvailableInfo.should('have.text', "No records available");
        cy.log("No Records Appear")

        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that data do not get saved on clicking 'Close' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Autom');
        EmployeeProfilePage.updateMiddleName('Mation1');
        EmployeeProfilePage.updateLastName('User1');
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'update' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Autom');
        EmployeeProfilePage.updateMiddleName('Mation');
        EmployeeProfilePage.updateLastName('User');
        EmployeeProfilePage.clickOnUpdateButton();
        cy.validateSuccessMessages("success");
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.editBasicInfoBtn.should('not.be.visible');
        cy.log("Accordion Is Collapsed");

    });

})