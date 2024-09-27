import BasePage from "./BasePage";

class PromoteEmployeePage extends BasePage {


    //Locators
    get promoteEmployeeLbl() { return cy.get("div.page-heading h1") }
    get selectEmployeeDrp() { return cy.get("#react-select-2-input") }
    get tableHeadersLbl() { return cy.get("table.resume tr th") }
    get promoteBtn() { return cy.get("button[data-bs-target='#staticBackdropPromote']") }
    get cancelBtn() { return cy.get("div.justify-content-center button[type='button']") }
    get submitBtn() { return cy.get("div.justify-content-center button[type='submit']") }
    get promotePopHeaderLbl() { return cy.get("#staticBackdropLabel") }
    get crossIconBtn() { return cy.get("button[aria-label='Close'].btn-close") }
    get selectDepartmentDrp() { return cy.get("#department") }
    get selectDesignationDrp() { return cy.get("#designation") }

    //Methods

    clickOnPromote() {
        this.promoteBtn.click();
    }

    clickOnCancel() {
        this.cancelBtn.wait(500).click();
    }

    clickOnCrossIcon() {
        this.crossIconBtn.wait(500).click();
    }

    clickOnSubmitBtn() {
        this.submitBtn.wait(500).click();
    }


    getdesgnationOptions() {
        return this.selectDesignationDrp.find('option').should('have.length', 6)
    }


    selectEmployee(text) {
        cy.selectDrpValueByText(this.selectEmployeeDrp, text, true, this.selectEmployeeDrp);
    }

    selectDepartment(text) {
        cy.selectDrpValueByText(this.selectDepartmentDrp,text, false)
    }

    selectDesignation(text) {
        cy.selectDrpValueByText(this.selectDesignationDrp,text, false)
    }


}
export default new PromoteEmployeePage();