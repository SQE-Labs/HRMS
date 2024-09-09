import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils';



class EmployeeDetailPage extends BasePage {

//Locaters

get firstName() { return cy.get("input[placeholder='Ted']")}
get lastName() { return cy.get("input[placeholder='Mosby']")}
get personalEmailInEmpDetails() { return cy.get("input[placeholder='ted@gmail.com']")}
get gender() { return cy.get('div.custom-checkbox.small>div>label')}
get bloodGroup() { return cy.get('#bloodGroup')}
get dateOfBirth() { return cy.get("input[name='dob']")}
get aadharNumber() { return cy.get("input[name='aadharNumber']")}
get panNumber() { return cy.get("input[placeholder='XXX-XXX-XXXX']")}
get dateOfJoining() { return cy.get("input[name='joiningDate']")}
get maritalStatus() { return cy.get('#maritalStatus')}
get nextButton() { return cy.get("button[class='theme-button']")}

// Contact Details Locators

get phoneNumber() { return cy.get("input[placeholder='9876543210'][name='phoneNumber']")}
get alternateNumber() { return cy.get("input[placeholder='9876543210'][name='alternateNumber']")}
get relationshipWithAlternateNo() { return cy.get('#relationWithAlternateNo')}
get alternateName() { return cy.get("input[name='alternateName']")}
get presentAddress() { return cy.get("textarea[name='presentAddress']")}
get permanentAddress() { return cy.get("textarea[name='permanentAddress']")}
get nextButtonOnContactDetails() { return cy.get("button[class='theme-button']")}

// Submit Locators

get submitButton() { return cy.get("button[class='theme-button']")}
get thankYouSuccessMsg() { return cy.get('.fw-300')}

//Methods


enterFirstName(firstNameTxt) {

    const randomString = generateRandomString(3); 
    const firstName = randomString+firstNameTxt;
    this.firstName.type(firstName).should('have.value', firstName);
    cy.log("Entered First Name");

}

enterLastName(lastNameTxt) {

    const randomString = generateRandomString(3); 
    const lastName = randomString+lastNameTxt;
    this.lastName.type(lastName).should('have.value', lastName);
    cy.log("Entered Last Name");

}

enterPersonalEmailInEmpDetails(emailTxt) {
    this.personalEmailInEmpDetails.type(emailTxt).should('have.value', emailTxt);
    cy.log("Entered Personal Email ID");

}

checkGender(indexNumber){
    this.gender.eq(indexNumber).click();
    cy.log("Gender is selected");

}

selectBloodGroup(){
    this.bloodGroup.select(1).should('contain', 'A+ve');
    cy.log("Blood Group is selected");

  }


selectDateOfBirth(){
    this.dateOfBirth.type('2000-09-24').should('have.value','2000-09-24')
    cy.log("Date of Birth is selected");

  }

enterAdhaarNumber(adhaarNumberTxt) {
    this.aadharNumber.type(adhaarNumberTxt).should('have.value', adhaarNumberTxt);
    cy.log("Adhaar Number is Entered");

}

enterPanNumber(panNumberTxt) {
    this.panNumber.type(panNumberTxt).should('have.value', panNumberTxt);
    cy.log("Pan Number is Entered");

}

selectDateOfJoining(){
    this.dateOfJoining.type('2024-09-23').should('have.value','2024-09-23')
    cy.log("Date of Joining is selected");

  }

selectMaritalStatus(){
    this.maritalStatus.select(1).should('contain', 'Single');
    cy.log("Marital Status is selected is selected");
  }

  randomEmailGenerator(email) {
    const randomString = generateRandomString(3); 
    const randomEmail = `${randomString}${email}`;   
    cy.log("Random Email is generated: " + randomEmail);      
    return randomEmail;                              
}

clickNextButton() {
    this.nextButton.click();    
    cy.log("Clicked on Next button");

   }

//Contact Details Methods 

selectRelationship(){
    this.relationshipWithAlternateNo.select(1).should('contain', 'Mother');
    cy.log("Relationship With Alternate Number is selected");

  }

enterPhoneNumber(phoneNumber) {
    this.phoneNumber.type(phoneNumber).should('have.value', phoneNumber);
    cy.log("Entered Phone Number");

}

enterAlternateNumber(alternateNumber) {
    this.alternateNumber.type(alternateNumber).should('have.value', alternateNumber);
    cy.log("Entered Alternate Number");

}


enterAlternateName(alternateName) {
    this.alternateName.type(alternateName).should('have.value', alternateName);
    cy.log("Entered Alternate Name");

}

enterPresentAddress(presentAddress) {
    this.presentAddress.type(presentAddress).should('have.value', presentAddress);
    cy.log("Entered Present Address");

}

enterPermanentAddress(permanentAddress) {
    this.permanentAddress.type(permanentAddress).should('have.value', permanentAddress);
    cy.log("Entered Permanent Address");

}

clickNextButton() {
    this.nextButtonOnContactDetails.click();    
    cy.log("Clicked on Next button");
   }


// Submit Methods

clickSubmitButton() {
    this.submitButton.click();    
    cy.log("Clicked on Submit button");
   }

validateThankYouSuccessMessage(thankYouMsg) {
    this.thankYouSuccessMsg.should('contain.text', thankYouMsg);
    cy.log("Assertion Pass");

}  


}
export default new EmployeeDetailPage();
