import sideBar from "../components/SideBar";
import EmployeelistPage from "../pages/EmployeeListPage"
import EmployeeProfilePage from "../pages/EmployeeProfilePage";
import {selectDrpValueByText } from '../../support/utils';


describe("Employee Asset Managment Tests", () => {

    it("HRMIS_1: Verify Assets tab", () => {

        // login to Application
        cy.login();

        sideBar.navigateTo("Employee Management", "Employees List");
        EmployeelistPage.enterNameToSearch("Auto Mation User");
        EmployeelistPage.clickOnUserCard("Auto Mation User");
        EmployeeProfilePage.clickOnAssetTab();
        EmployeeProfilePage.refershbutton.should('be.visible');
        EmployeeProfilePage.noRecordInfo.should('have.text','No records available'); 
       
    });


});