import BasePage from "./BasePage";
import Loaders from "../components/Loaders";


class EmployeelistPage extends BasePage {

    // Locators 

    get employeelistHeader() { return cy.get("div.page-heading > h1")}
    get searchByName(){return cy.get("input[name='search']")}
    get employeeCard(){return cy.get("div.card div h6.card-title")}


    // Methods 

    enterEmployeeName(searchByName){
        this.searchByName.type(searchByName).should('have.value',searchByName);
        cy.log("Entered Employee Name : ",searchByName);
    }


    clickOnEmployeeCard(employtitle){
        this.employeeCard.contains(employtitle).click();
        Loaders.threeDotLoading.should('not.exist');
        cy.log("Employee card Clicked");
    }

    
}


export default new EmployeelistPage();