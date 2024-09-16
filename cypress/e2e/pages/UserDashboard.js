import BasePage from "./BasePage";

class UserDashboard extends BasePage{
    
// Locators    
get workExperience() { return cy.get("h2[id='heading4'] button[type='button']")}   
get noRecordAvailable() { return cy.get("div[id='collapse4'] div[class='fs-4 text-secondary text-center']")}
get basicInfo() { return cy.get("h2[id='heading1'] button[type='button']")}

// Methods
clickOnWorkExperience(){
    this.workExperience.click().should('be.visible');
    cy.log("Clicked on the Work Experience Option");
 }

clickOnBasicInfo(){
    this.basicInfo.wait(2000).click().should('be.visible');
    cy.log("Clicked on the Basic Info Option");
 } 

validateNoRecordsAppear(){
    this.noRecordAvailable.should('have.text', "No records available");
    cy.log("No Records Appear")
  
  }   
}

export default new UserDashboard();