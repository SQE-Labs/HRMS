import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils';
import Loaders from "../components/Loaders";

class EmployeeDetailPage extends BasePage {

    // Locaters
    get firstName() { return cy.get("input[name='firstName']") }
    get middleName() { return cy.get("input[name='middleName']") }
    get lastName() { return cy.get("input[name='lastName']") }
    get personalEmailInEmpDetails() { return cy.get("input[name='personalEmail']") }
    get gender() { return cy.get('div.custom-checkbox.small > div') }

    get bloodGroup() { return cy.get('#bloodGroup') }
    get dateOfBirth() { return cy.get("input[name='dob']") }
    get aadharNumber() { return cy.get("input[name='aadharNumber']") }
    get panNumber() { return cy.get("input[name='panCardNumber']") }
    get dateOfJoining() { return cy.get("input[name='joiningDate']") }
    get maritalStatus() { return cy.get('#maritalStatus') }
    get passportNo() { return cy.get("input[name='passportNumber']") }
    get nextButton() { return cy.get("button[class='theme-button']") }

    // Contact Details Locators
    get phoneNumber() { return cy.get("input[name='phoneNumber']") }
    get alternateNumber() { return cy.get("input[name='alternateNumber']") }

    get relationshipWithAlternateNo() { return cy.get('#relationWithAlternateNo') }
    get alternateName() { return cy.get("input[name='alternateName']") }
    get presentAddress() { return cy.get("textarea[name='presentAddress']") }
    get permanentAddress() { return cy.get("textarea[name='permanentAddress']") }
    get nextButtonOnContactDetails() { return cy.get("button[class='theme-button']") }

    // Submit Locators
    get submitButton() { return cy.get("button[class='theme-button']") }
    get thankYouSuccessMsg() { return cy.get('.fw-300') }

    // Methods
    enterFirstName(firstName) {
        this.firstName.type(firstName).should('have.value', firstName);
        cy.log("Entered First Name : ", firstName);
    }

    enterMiddleName(middleName) {
        this.middleName.type(middleName).should('have.value', middleName);
        cy.log("Entered Middle Name : ", middleName);
    }

    enterLastName(lastName) {
        this.lastName.type(lastName).should('have.value', lastName);
        cy.log("Entered Last Name");
    }

    enterPersonalEmailInEmpDetails(emailTxt) {
        this.personalEmailInEmpDetails.type(emailTxt).should('have.value', emailTxt);
        cy.log("Entered Personal Email ID");
    }

    checkGender(genderType) {
        this.gender.contains('label', genderType).click();
    }

    selectBloodGroup(bloodGroup) {
        this.bloodGroup.select(bloodGroup).should('contain', bloodGroup);
        cy.log("Blood Group is selected");
    }

    selectDateOfBirth(dob) {
        this.dateOfBirth.type(dob).should('have.value', dob);
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

    selectDateOfJoining(doj) {
        this.dateOfJoining.type(doj).should('have.value', doj);
        cy.log("Date of Joining is selected");
    }

    selectMaritalStatus(status) {
        this.maritalStatus.select(status).should('contain', status);
        cy.log("Marital Status is selected");
    }

    enterPassportNumber(passportNo) {
        this.passportNo.type(passportNo).should('have.value', passportNo);
        cy.log("Passport Number is Entered");
    }

    clickNextButton() {
        this.nextButton.click();
        cy.log("Clicked on Next button");
    }

    //Contact Details Methods 
    selectRelationship(relation) {
        this.relationshipWithAlternateNo.select(relation).should('contain', relation);
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
        this.presentAddress.type(presentAddress,{delay:500}).should('have.value', presentAddress);
        cy.log("Entered Present Address");
    }

    enterPermanentAddress(permanentAddress) {
        this.permanentAddress.type(permanentAddress,{delay:500}).should('have.value', permanentAddress);
        cy.log("Entered Permanent Address");
    }

    clickSubmitButton() {
        this.submitButton.click();
        cy.log("Clicked on Submit button");
        Loaders.threeDotLoading.should('not.exist');
    }

    validateSuccessMessage() {
        cy.contains('Thank you!').should('be.visible')
        cy.contains('Your submission has been sent successfully.').should('be.visible')
        cy.contains('HR will get back to you shortly.').should('be.visible')
        cy.log("Success message is displayed");
    }

    getFieldValue(label) {
        return cy.get('.row').find(`p:contains(${label})`).then($element => {
            // Get the parent container of the label
            const parent = $element.parent();
            
            // Find the index of the label in the parent container
            const index = parent.find('p').toArray().findIndex(p => Cypress.$(p).text().includes(label));
            
            // Return the value from the next row based on the calculated index
            return cy.get('.row').find(`p:contains(${label})`).parent().parent().next().find('p').eq(index)
                .invoke('text').then(text => {
                    return text.replace(/\u00A0/g, ' ').trim(); // Replace &nbsp; with space and trim
                });
        });
    }
      
}

export default new EmployeeDetailPage();
