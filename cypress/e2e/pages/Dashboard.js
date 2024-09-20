import BasePage from "./BasePage";

class Dashboard extends BasePage{
    
    // Locators
    get logoutButton() { return cy.get('.log-out > .text-center')}

    // Methods
    clickLogout() {
        cy.log("clicking logout")
        this.logoutButton.click();
    }
}

export default new Dashboard();