class BasePage {

    // Method to open any website
    open(path) {
        return cy.visit(path)
    }
}

export default BasePage;
