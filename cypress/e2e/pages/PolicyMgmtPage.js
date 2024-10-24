import BasePage from "./BasePage";

class PolicyMgmtPage extends BasePage {

    // Locators
    get modifyPolicyLbl() { return cy.get("#showMenuBtn + h1") }
    get addPolicyBtn() { return cy.get("div.actions > a.export") }
    get searchTxt() { return cy.get("input[name='search']") }
    get editPolicyBtn() { return cy.get("button[data-bs-target='#staticBackdropPolicy']") }
    get addPolicyHeader() { return cy.get("#staticBackdropLabel") }
    get policyTitleTxt() { return cy.get("input[name='policyTitle']") }
    get policyDescTxt() { return cy.get("#description") }
    get submitBtn() { return cy.get("button[type='submit']") }
    get cancelBtn() { return cy.get("button[type='button'].theme-button") }
    get itemPerPageDrp() { return cy.get("#itemsPerPage") }
    get gridRows() { return cy.get("tbody tr") }
    get policyTitle() { return cy.get("tbody tr[kwy='0'] td:nth-child(2)") }
    get noRecordeLbl() { return cy.get("div.fs-4") }
    get viewBtn() { return cy.get("tr[kwy='0'] a") }
    get editBtn() { return cy.get("tbody tr:nth-child(1) button.export") }
    get deletePolicy(){return cy.get("a.text-danger i")}
    get uploadeFile(){return cy.get("#file-input")}
    get policyDesc() { return cy.get("tbody tr[kwy='0'] td:nth-child(4)") }
    get policyValidDate() { return cy.get("tbody tr[kwy='0'] td:nth-child(3)") }



    // Methods

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


    clickOnView() {
        this.viewBtn.click();
    }

    checkDownloadFile(path) {
        cy.readFile(path)
            .should('exist')
    }

    clickOnEditBtn() {
        this.editBtn.click();
    }

    enterPolicytitle(title){
        this.policyTitleTxt.clear().wait(500).type(title);
    }

    enterDescription(desc){
        this.policyDescTxt.clear().type(desc);
    }

    delete_Policy(){
        this.deletePolicy.click();
    }

    uploadePolicyFile(filePath){
        this.uploadeFile.selectFile(filePath);
    }

    selectValidDate(date){
        cy.get('input[type="date"]').type(date).should('have.value', date);

    }

    clickOnSubmit(){
        this.submitBtn.click();
    }

}

export default new PolicyMgmtPage();