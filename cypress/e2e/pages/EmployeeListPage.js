import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class EmployeeListPage extends BasePage {

//Locators
get searchByName() { return cy.get("input[placeholder='Search By Name.']")}
get selectUser() { return cy.get(".card-title.text-primary")}
get employeeCount() { return cy.get('.total')}
get noRecordAvailable() { return cy.get('.fs-4.text-secondary.text-center')}
get department() { return cy.get("#department")}
get totalCount() { return cy.get("div[class='total'] span")}

//Methods
enterValidNameToSearch(nametxt) {
  this.searchByName.clear().type(nametxt).should('have.value', nametxt);
  cy.log("Entered Valid Name to Search")
  }

enterInvalidNameToSearch(nametxt) {
  this.searchByName.type(nametxt).should('have.value', nametxt);
  cy.log("Entered Invalid Name to Search")
  }  

validateNoRecordsAppear(){
  this.noRecordAvailable.should('have.text', "No Records Available");
  cy.log("No Records Appear")
  }    

countTotalEmployees(countEmployees){
  this.employeeCount.invoke('text')
  .then((text) => {
  const employeeCount = parseInt(text.replace('Total Employees : ', '').trim());
  expect(employeeCount).to.equal(countEmployees);  
  cy.log(`Total number of employees: ${employeeCount}`);
        });
      }

selectSearchedUser(){
  this.selectUser.click();
  Loaders.threeDotLoading.should('not.exist');    
  cy.log("Clicked on Searched User");
  } 

selectDepartment(departmentName) {
    this.department.wait(2000).select(departmentName).should('contain', departmentName);
    Loaders.threeDotLoading.should('not.exist');
    cy.log("Department is selected");
  }  
}
export default new EmployeeListPage();