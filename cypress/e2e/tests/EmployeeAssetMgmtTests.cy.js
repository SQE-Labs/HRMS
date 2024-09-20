import sideBar from "../components/SideBar";
import EmployeelistPage from "../pages/EmployeeListPage"
import EmployeeProfilePage from "../pages/EmployeeProfilePage";


describe("Employee Asset Managment Tests", () => {

    it("HRMIS_1: Verify Assets tab", () => {

        // login to Application
        cy.login();

        sideBar.navigateTo("Employee Management", "Employees List");
        EmployeelistPage.employeelistHeader.should('be.visible').and('have.text', "Employees List");
        EmployeelistPage.enterEmployeeName("DDinesh D Kumar");
        EmployeelistPage.clickOnEmployeeCard("DDinesh D Kumar");
        EmployeeProfilePage.clickOnAssetTab();
        EmployeeProfilePage.refershbutton.should('be.visible');
        EmployeeProfilePage.noRecordInfo.should('have.text','No records available'); 
       

        
       
    });

   

});
