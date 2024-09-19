import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class UserDashboard extends BasePage{
    
// Locators    
get workExperience() { return cy.get("h2[id='heading4'] button[type='button']")}   
get noRecordAvailable() { return cy.get("div[id='collapse4'] div[class='fs-4 text-secondary text-center']")}
get basicInfo() { return cy.get("h2[id='heading1'] button[type='button']")}
get firstName() { return cy.get("#collapse1 .row div:nth-child(2) p:first-child")}
get lastName() { return cy.get("#collapse1 .row > div:nth-child(2) > div:first-child > p:nth-child(2)")}
get middleName() { return cy.get("#collapse1 .row div:nth-child(4) p:first-child")}
get employeeID() { return cy.get("#collapse1 .row div:nth-child(2) p:last-child")}
get email() { return cy.get("#collapse1 .row div:nth-child(4) p:last-child")}
get editBasicInfo() { return cy.xpath("//div[@id='collapse1']//i[contains(@class,'fa fa-edit')]")}
get closeButton() { return cy.get("button[class='btn btn-secondary btn-sm ms-2']")}
get editFirstName() { return cy.get("input[value='Auto']")}
get editLastName() { return cy.get("input[value='User']")}
get editMiddleName() { return cy.get("input[value='Mation']")}
get updateButton() { return cy.get("button[class='btn btn-primary btn-sm']")}

// Methods
clickOnWorkExperience(){
    this.workExperience.click();
    cy.log("Clicked on the Work Experience Option");
 }

clickOnBasicInfo(){
    this.basicInfo.wait(2000).click();
    cy.log("Clicked on the Basic Info Option");
 } 

validateNoRecordsAppear(){
    this.noRecordAvailable.should('have.text', "No records available");
    cy.log("No Records Appear")
}

validateAccordionCollapsed(){
  this.firstName.should('not.be.visible');
  cy.log("Accordion Is Collapsed")
 } 

clickOnEditButtonBasicInfo(){
  this.editBasicInfo.click();
  cy.log("Clicked on the Edit button Under Basic Info Accordion");
}  

updateFirstName(firstNameText){
  this.editFirstName.type(`{selectall}{backspace}${firstNameText}`).should('have.value',firstNameText)
  cy.log("Updated First Name Text");
}

updateMiddleName(middleNameText){
  this.editMiddleName.type(`{selectall}{backspace}${middleNameText}`).should('have.value',middleNameText)
  cy.log("Updated Middle Name Text");
}

updateLastName(lastNameText){
  this.editLastName.type(`{selectall}{backspace}${lastNameText}`).should('have.value',lastNameText)
  cy.log("Updated Last Name Text");
}

clickOnCloseButton(){
  this.closeButton.click();
  cy.log("Clicked on the Close Button under Basic Info Accordion");
} 

clickOnUpdateButton(){
  this.updateButton.click();
  cy.log("Clicked on the Update Button under Basic Info Accordion");
  Loaders.threeDotLoading.should('not.exist');
}   

verifyFirstName(firstNameTxt){
  this.firstName.should('have.text',firstNameTxt);
  cy.log("First Name is Verified")
}

verifyMiddleName(middleNameTxt){
  this.middleName.should('have.text',middleNameTxt);
  cy.log("Middle Name is Verified")
}

verifyLastName(lastNameTxt){
  this.lastName.should('have.text',lastNameTxt);
  cy.log("Last Name is Verified")
}

verifyEmployeeID(employeeId){
  this.employeeID.should('have.text',employeeId);
  cy.log("Emplooyee ID is Verfied")
}

verifyEmailID(emailID){
  this.email.should('have.text',emailID);
  cy.log("Email is Verfied")
}

validateSuccessMessage() {
  cy.contains("success").should('be.visible')
  cy.log("Success message is displayed");
 }
}

export default new UserDashboard();