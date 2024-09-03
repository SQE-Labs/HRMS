import Loaders from "../components/Loaders.js";

class SideBar {

    // Locators 
    get SideBarLocator() { return cy.get('a')}

    // Methods
    navigateTo(...navigationChain){
        navigationChain.forEach(ch => {
            cy.get('a').contains(ch).click();
        });
        Loaders.threeDotLoading.should("not.exist");
    }
}

export default new SideBar();