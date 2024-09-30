import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import sideBar from "../components/SideBar";

class EmployeeListPage extends BasePage {

//Locators
get searchByName() { return cy.get("input[name='search']")}
get user() { return cy.get(".card-title.text-primary")}
get employeeCount() { return cy.get('.total')}
get noRecordAvailable() { return cy.get('.fs-4.text-secondary.text-center')}
get department() { return cy.get("#department")}
get totalCount() { return cy.get("div[class='total'] span")}

//Methods
enterNameIntoSearchField(nametxt) {
  this.searchByName.clear().type(nametxt).should('have.value', nametxt);
  cy.log("Entered Name to Search")
  }  
   

getTotalEmployeescount() {
  return this.employeeCount.invoke('text')
    .then((text) => {
      return parseInt(text.replace('Total Employees : ', '').trim());
    });
}


clickOnUserCard(user){
  this.user.contains(user).click();
  Loaders.threeDotLoading.should('not.exist');    
  cy.log("Clicked on Searched User");
  } 

selectDepartment(departmentName) {
    this.department.wait(1000).select(departmentName).should('contain', departmentName);
    Loaders.threeDotLoading.should('not.exist');
    cy.log("Department is selected");
  }  
}
export default new EmployeeListPage();