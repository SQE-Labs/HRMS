import sideBar from "../components/SideBar";
import AssignManagerPage from "../pages/AssignManagerPage";
import { selectDrpValueByText } from '../../support/utils';


beforeEach(() => {

    // login to Application
    cy.login();
    sideBar.navigateTo("Employee Management", "Assign Manager");
    cy.wait(1000);

})


describe("Employee Assign Manager Managment Tests", () => {

    it("HRMIS_1: Verify Assignee Manager Open when user click on Assing Manager Subtab", () => {

        const expectedTexts = ['Id', 'Name', 'Assigned Manager', 'Action'];
        AssignManagerPage.assertTextEquals(AssignManagerPage.assignManagerLbl, 'Assign Manager');
        cy.wait(1000);
        AssignManagerPage.selectEmployee("Auto Mation User");
        AssignManagerPage.assertExpectedTableLbl(expectedTexts);
    });


    it("HRMIS_2: Verify Assign Manager Pop up opens up when user click on Re-Assigne button", () => {

        AssignManagerPage.selectEmployee("Auto Mation User");
        AssignManagerPage.clickOnReAssigneBtn();
        AssignManagerPage.assigneeMangerPopupLbl.should('have.text', "Assign Manager");
        AssignManagerPage.clickOnSubmitBtn();
        cy.validateSuccessMessages("Successfully Assigned!");

    });


    it("HRMIS_3: Verify Assign Manager Pop up closed when user click on Close button", () => {

        AssignManagerPage.selectEmployee("Auto Mation User");
        AssignManagerPage.clickOnReAssigneBtn();
        AssignManagerPage.assigneeMangerPopupLbl.should('have.text', "Assign Manager");
        AssignManagerPage.clickOnCancelBtn();
        AssignManagerPage.assigneeMangerPopupLbl.should('not.be.visible')

    });



    it("HRMIS_4: Verify that validation message appears, when user selects himself as manager, on 'Assign Manager' pop up.", () => {

        AssignManagerPage.selectEmployee("Auto Mation User");
        AssignManagerPage.clickOnReAssigneBtn();
        AssignManagerPage.selectManager("Auto Mation User");
        AssignManagerPage.clickOnSubmitBtn();
        cy.validateSuccessMessages("An employee cannot be their own manager");

    });


    it("HRMIS_5: Verify that user is able to re-assign manager", () => {

        AssignManagerPage.selectEmployee("Auto Mation User");
        AssignManagerPage.clickOnReAssigneBtn();
        AssignManagerPage.selectManager("Anmol Juneja");
        AssignManagerPage.clickOnSubmitBtn();
        cy.validateSuccessMessages("Successfully Assigned!");
        AssignManagerPage.assignedManagerLbl.should('have.text', "Anmol Juneja");

    });


    it("HRMIS_6: Clean up Test Case", () => {

        AssignManagerPage.selectEmployee("Auto Mation User");
        AssignManagerPage.clickOnReAssigneBtn();
        AssignManagerPage.selectManager("Chandler");
        AssignManagerPage.clickOnSubmitBtn();
        cy.validateSuccessMessages("Successfully Assigned!");

    });





});
