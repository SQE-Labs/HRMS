import sideBar from "../components/SideBar";
import AssignManagerPage from "../pages/AssignManagerPage";
import { selectDrpValueByText } from '../../support/utils';

describe("Employee Assign Manager Managment Tests", () => {

    it("HRMIS_1: Verify Assignee Manager Open when user click on Assing Manager Subtab", () => {

        const expectedTexts = ['Id', 'Name', 'Assigned Manager', 'Action'];


        // login to Application
        cy.login();
        sideBar.navigateTo("Employee Management", "Assign Manager");
        AssignManagerPage.assignManagerLbl.should('have.text', "Assign Manager");
        cy.wait(1000);
        selectDrpValueByText(AssignManagerPage.selectEmployeeDrp, "Auto Mation User", true, AssignManagerPage.selectEmployeeDrp);

        AssignManagerPage.tableHeadersLbl.each((headerText, index) => {
            cy.wrap(headerText).should('contain.text', expectedTexts[index])
        });
    });


    it("HRMIS_2: Verify Assign Manager Pop up opens up when user click on Re-Assigne button", () => {

        // login to Application
        cy.login();
        sideBar.navigateTo("Employee Management", "Assign Manager");
        cy.wait(1000);
        selectDrpValueByText(AssignManagerPage.selectEmployeeDrp, "Auto Mation User", true, AssignManagerPage.selectEmployeeDrp);
        AssignManagerPage.clickOnReAssigneBtn();
        AssignManagerPage.assigneeMangerPopupLbl.should('have.text', "Assign Manager");
        AssignManagerPage.clickOnSubmitBtn();
        cy.validateSuccessMessages("Successfully Assigned!");

    });


    it("HRMIS_3: Verify Assign Manager Pop up closed when user click on Close button", () => {

        // login to Application
        cy.login();
        sideBar.navigateTo("Employee Management", "Assign Manager");
        cy.wait(1000);
        selectDrpValueByText(AssignManagerPage.selectEmployeeDrp, "Auto Mation User", true, AssignManagerPage.selectEmployeeDrp);
        AssignManagerPage.clickOnReAssigneBtn();
        AssignManagerPage.assigneeMangerPopupLbl.should('have.text', "Assign Manager");
        AssignManagerPage.clickOnCancelBtn();
        AssignManagerPage.assigneeMangerPopupLbl.should('not.be.visible')

    });



    it("HRMIS_4: Verify that validation message appears, when user selects himself as manager, on 'Assign Manager' pop up.", () => {

        // login to Application
        cy.login();
        sideBar.navigateTo("Employee Management", "Assign Manager");
        cy.wait(1000);
        selectDrpValueByText(AssignManagerPage.selectEmployeeDrp, "Auto Mation User", true, AssignManagerPage.selectEmployeeDrp);
        AssignManagerPage.clickOnReAssigneBtn();
        selectDrpValueByText(AssignManagerPage.selectManagerDrp, "Auto Mation User", true, AssignManagerPage.selectManagerDrp);
        AssignManagerPage.clickOnSubmitBtn();
        cy.validateSuccessMessages("An employee cannot be their own manager");

    });


    it("HRMIS_5: Verify that user is able to re-assign manager", () => {

        // login to Application
        cy.login();
        sideBar.navigateTo("Employee Management", "Assign Manager");
        cy.wait(1000);
        selectDrpValueByText(AssignManagerPage.selectEmployeeDrp, "Auto Mation User", true, AssignManagerPage.selectEmployeeDrp);
        AssignManagerPage.clickOnReAssigneBtn();
        selectDrpValueByText(AssignManagerPage.selectManagerDrp, "Anmol Juneja", true, AssignManagerPage.selectManagerDrp);
        AssignManagerPage.clickOnSubmitBtn();
        cy.validateSuccessMessages("Successfully Assigned!");
        AssignManagerPage.assignedManagerLbl.should('have.text', "Anmol Juneja");

    });



});
