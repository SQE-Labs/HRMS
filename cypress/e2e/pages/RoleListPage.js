import BasePage from "./BasePage";

class RoleListPage extends BasePage {

    // Locators
    get roleListLbl() { return cy.get("#showMenuBtn + h1") }
    get itemPerPageDrp(){return cy.get("#itemsPerPage")}
    get gridRows() { return cy.get("tbody tr") }
    get searchTxt() { return cy.get("input[name='search']") }
    get policyTitle() { return cy.get("tbody tr:nth-child(1) td:nth-child(2)") }
    get noRecordeLbl() { return cy.get("div.fs-4") }
    get addRoleBtn() { return cy.get("div.actions > a.export") }
    get addRoleHeader() { return cy.get("#staticBackdropLabel") }
    get cancelBtn(){return cy.xpath("//button[@type='button'][text()='Cancel']")}
    get submitBtn(){return cy.get("button[type='Submit']")}
    get roleTitleTxt() {return cy.get("input[name='title']")}
    get descRoleTxt(){return cy.get("textarea[name='description']")}
    get lastRoleTitle() {return cy.get("tbody tr:last-of-type td:nth-child(2)")}
    get lastRoleDesc(){return cy.get("tbody tr:last-of-type td:nth-child(3)")}
  
    // Methods


    clickOnAddRole(){
        this.addRoleBtn.click();
    }

    clickOnCancelBtn(){
        this.cancelBtn.wait(1000).click();
    }

    clickOnSubmit(){
        this.submitBtn.click();
    }

    getValidationMessage(element) {
        return element.invoke('prop', 'validationMessage');
    }

    assertValidation(element,expectedMessage) {
        this.getValidationMessage(element).then((message) => {
            expect(message).to.equal(expectedMessage);
        });
    }

    enterRoleTitle(title){
        this.roleTitleTxt.type(title);
    }

    enterRoleDesc(desc){
        this.descRoleTxt.type(desc);    }


    selectItemPerPage(count) {
        cy.selectDrpValueByText(this.itemPerPageDrp, count, false)
    }

    getPolicyTitle() {
        return this.policyTitle.invoke('text');
    }

    searchPolicy(title) {

        if (title) {
            this.searchTxt.clear().type(title).should('have.value', title);
        }
        else {
            this.getPolicyTitle().then((title) => {
                this.searchTxt.clear().type(title).should('have.value', title);
            })
        }
    }

    assertSearchTitle() {
        this.searchTxt.invoke('val').then((text1) => {
            this.policyTitle.invoke('text').then((text2) => {
                expect(text1.trim()).to.equal(text2.trim());
            })
        })
    }


    clickNextUntilDisabled() {
        cy.get('ul.pagination li').contains('Next').should('be.visible').then(($nextButton) => {
          if (!$nextButton.parent().hasClass('disabled')) {
            cy.wrap($nextButton).click({ force: true });
            cy.wait(1000);
            this.clickNextUntilDisabled();
          }
        });
      }


}

export default new RoleListPage();