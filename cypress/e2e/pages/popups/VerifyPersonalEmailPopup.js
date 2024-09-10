import BasePage from "../BasePage";
import { generateRandomString } from '../../../support/utils';
import Loaders from "../../components/Loaders";
import Loaders from "../../components/Loaders";

class VerifyPersonalEmailPopup extends BasePage {

//Locaters
get personalEmail() { return  cy.get ("input[class='border']")} 
get submitBtn() { return cy.get("button[class='theme-button ']")}



//Methods
randomEmailGenerator(email) {
  const randomString = generateRandomString(3); 
  const newEmail = `${randomString}${email}`;   
  cy.log("Random Email is generated: " + newEmail);      
  return newEmail;                              
}

enterPersonalEmailID(registeredUserEmail) {
  this.personalEmail.type(registeredUserEmail).should('have.value', registeredUserEmail)
  cy.log("Email ID Entered");                                        
}

clickSubmitButton() {
    this.submitBtn.click();    
    cy.log("Clicked on submit button");
    Loaders.threeDotLoading.should('not.exist');
   }
}

export default new VerifyPersonalEmailPopup();