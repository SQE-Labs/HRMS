import Loaders from "../components/Loaders.js";

class SideBar {

    // Locators 
    get SideBarLocator() { return cy.get('a') }

    // Methods
    navigateTo(...navigationChain) {
        navigationChain.forEach(ch => {
            cy.wait(1000);
            cy.get('li a').contains(ch).scrollIntoView().wait(1000).click({ force: true });
            cy.wait(1000);
        });
        Loaders.threeDotLoading.should('not.exist');
        Loaders.overlay.should('not.exist');
    }

}

export default new SideBar();