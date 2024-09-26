import sideBar from "../components/SideBar";
import PromoteEmployeePage from "../pages/PromoteEmployeePage";
import { selectDrpValueByText } from '../../support/utils';


beforeEach(() => {

    // login to Application
    cy.login();
    sideBar.navigateTo("Employee Management", "Promote Employee");
    cy.wait(1000);

})


describe("Employee Managment Promote Employee Tests", () => {

    it("HRMIS_1: Verify Promote Open when user click on Promote Employee Subtab under Employee Managment", () => {

        const expectedTexts = ['Employee Id', 'Name', 'Department', 'Designation' ,'Action'];

        PromoteEmployeePage.promoteEmployeeLbl.should('have.text', "Promote Employee");
        cy.wait(1000);
        selectDrpValueByText(PromoteEmployeePage.selectEmployeeDrp, "Auto Mation User", true, PromoteEmployeePage.selectEmployeeDrp);

        PromoteEmployeePage.tableHeadersLbl.each((headerText, index) => {
            cy.wrap(headerText).should('contain.text', expectedTexts[index])
        });
    });


});
