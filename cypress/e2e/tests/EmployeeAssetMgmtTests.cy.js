import sideBar from "../components/SideBar";
import EmployeelistPage from "../pages/EmployeeListPage"
import EmployeeProfilePage from "../pages/EmployeeProfilePage";


describe("Employee Asset Managment Tests", () => {

    it("HRMIS_1: Verify Assets tab", () => {

        // login to Application
        cy.login();

        // Navigate To employee list Page 
        sideBar.navigateTo("Employee Management", "Employees List");
        
        // Validate employee list page
        EmployeelistPage.employeelistHeader.should('be.visible').and('have.text', "Employees List");
        
        // enter employee name 
        EmployeelistPage.enterEmployeeName("DDinesh D Kumar");
    
        // click on Employee Profile card
        EmployeelistPage.clickOnEmployeeCard("DDinesh D Kumar");

        // Click on Asset Tab 
        EmployeeProfilePage.clickOnAssetTab();

        // validate asset tab opens up and no record Available information 
        EmployeeProfilePage.validateNoRecordInfo();

        
       
    });

   

});
