import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import sideBar from "../components/SideBar";

class EmployeeListPage extends BasePage {

//Locators
get searchByName() { return cy.get("input[placeholder='Search By Name.']")}
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

navigateToUserDashboardPage(nametxt){
  sideBar.navigateTo("Employee Management", "Employees List");
  this.searchByName.clear().type(nametxt).should('have.value', nametxt);
  this.user.click();

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

selectUser(){
  this.user.should('be.visible').click();
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