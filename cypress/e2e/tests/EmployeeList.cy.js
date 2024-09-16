import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import UserDashboard from "../pages/UserDashboard";

describe("Employee Onboard Tests", () => {

    it("HRMIS_1: Verify that 'Employee List' page opens up, when user clicks on 'Employee Management'.", () => {
        cy.login();
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterInvalidNameToSearch('Tests');
        EmployeeListPage.validateNoRecordsAppear();

        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterValidNameToSearch('Aut');
        EmployeeListPage.countTotalEmployees();

        // Verify that the information message appears for the selected department with no records.
        EmployeeListPage.selectSearchedUser();
        UserDashboard.clickOnWorkExperience();
        UserDashboard.validateNoRecordsAppear();
        
        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        UserDashboard.clickOnBasicInfo();
    });
})