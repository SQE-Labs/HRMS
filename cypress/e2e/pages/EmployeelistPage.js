import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils';
import Loaders from "../components/Loaders";


class EmployeelistPage extends BasePage {

    // Locators 

    get employeelistHeader() { return cy.get("div.page-heading > h1")}
    get searchByName(){return cy.get("input[name='search']")}

    get employeeCard(){return cy.get("div.card img")}

    
    // Methods 

    enterEmployeeName(searchByName){
        this.searchByName.type(searchByName).should('have.value',searchByName);
        cy.log("Enter Employee Name : ",searchByName);
    }


    clickOnEmployeeCard(){
        this.employeeCard.should('be.visible').click();
        Loaders.threeDotLoading.should('not.exist');
        cy.log("Employee card Clicked");
    }

    
}


export default new EmployeelistPage();