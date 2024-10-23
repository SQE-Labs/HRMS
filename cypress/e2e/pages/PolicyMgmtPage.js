import BasePage from "./BasePage";

class PolicyMgmtPage extends BasePage{
    
    // Locators
    get modifyPolicyLbl(){return cy.get("#showMenuBtn + h1")}
    get addPolicyBtn(){return cy.get("div.actions > a.export")}
    get searchTxt(){return cy.get("input[name='search']")}
    get editPolicyBtn(){return cy.get("button[data-bs-target='#staticBackdropPolicy']")}
    get addPolicyHeader(){return cy.get("#staticBackdropLabel")}
    get policyTitleTxt(){return cy.get("input[name='policyTitle']")}
    get policyDescTxt(){return cy.get("#description")}
    get submitBtn(){return cy.get("button[type='submit']")}
    get cancelBtn(){return cy.get("button[type='button'].theme-button")}



    // Methods
   
}

export default new PolicyMgmtPage();