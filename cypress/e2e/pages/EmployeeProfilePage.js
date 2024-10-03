import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils';
import Loaders from "../components/Loaders";


class EmployeeProfilePage extends BasePage {

    // Locators 

    get assetTab() { return cy.get("#tab4-tab") }
    get noRecordInfo() { return cy.get("#tab4 div.table-responsive div ") }
    get refershbutton() { return cy.get("#tab4 div button") }
    get workExperienceAccord() { return cy.get("h2[id='heading4'] button") }
    get noRecordAvailableInfo() { return cy.get("#collapse4 div.table-responsive div") }
    get basicInfoAccord() { return cy.get("h2[id='heading1'] button") }
    get editBasicInfoBtn() { return cy.get("#collapse1 a i") }
    get closeBtn() { return cy.get("button[class='btn btn-secondary btn-sm ms-2']") }
    get editFirstNameTxt() { return cy.get("input[name='firstName']:not(:disabled)") }
    get editLastNameTxt() { return cy.get("input[name='lastName']:not(:disabled)") }
    get editMiddleNameTxt() { return cy.get("input[name='middleName']:not(:disabled)") }
    get updateBtn() { return cy.get("button[class='btn btn-primary btn-sm']") }
    get workAccord() { return cy.get("h2[id='heading2'] button") }
    get editWorkInfoBtn() { return cy.get('#collapse2 a i') }
    get editDateOfJoiningPicker() { return cy.get("div[class='input-group'] [class='border']") }
    get personalDetailsAccord() { return cy.get("h2[id='heading3'] button") }
    get editPersonalDetailsBtn() { return cy.get('#collapse3 a i') }
    get editDateOfBirthPicker() { return cy.get("#collapse3 input[type='date']") }
    get editPassportNumberTxt() { return cy.get("input[name='passportNumber']:not(:disabled)") }
    get editPanNumberTxt() { return cy.get("input[name='panCardNumber']:not(:disabled)") }
    get editAdhaarNumberTxt() { return cy.get("input[name='aadharNumber']:not(:disabled)") }
    get editPresentAddressTxt() { return cy.get("textarea[name='presentAddress']:not(:disabled)") }
    get editPermanentAddressTxt() { return cy.get("textarea[name='permanentAddress']:not(:disabled)") }
    get editAlternateNumberTxt() { return cy.get("input[name='alternateNumber']:not(:disabled)") }
    get editBloodGroupDrp() { return cy.get("div [id='bloodGroup']:not(:disabled)") }
    get editMaritalStatusDrp() { return cy.get("select[id='maritalStatus']:not(:disabled)") }
    get editGenderBtn() { return cy.get("#female:not(:disabled)") }
    genderRadioBtn(value) { return cy.get(`input[type='radio']:not(:disabled)[value='${value}']`) }
    get workExpColLbl() { return cy.get('#collapse4 table.resume th') };
    get eduAccor() { return cy.get("#heading5 button") };
    get workEduColLbl() { return cy.get('#collapse5 table.resume th') };
    get workDependentsColLbl() { return cy.get('#collapse6 table.resume th') };

    // Methods 
    clickOnAssetTab() {
        this.assetTab.click();
        Loaders.threeDotLoading.should('not.exist');
    }

    clickOnWorkExperience() {
        this.workExperienceAccord.wait(500).click();
        cy.log("Clicked on the Work Experience Option");
    }

    clickOnPersonalDetails() {
        this.personalDetailsAccord.click();
        cy.log("Clicked on the Work Experience Option");
    }

    clickOnBasicInfo() {
        this.basicInfoAccord.wait(500).click();
        cy.log("Clicked on the Basic Info Option");
    }

    clickOnWork() {
        this.workAccord.click();
        cy.log("Clicked on the Work Option");
    }

    clickOnPersonalDetails() {
        this.personalDetailsAccord.click();
        cy.log("Clicked on the Personal Details Option");
    }

    updateDOJ(doj) {
        this.editDateOfJoiningPicker.type(doj).should('have.value', doj);
        cy.log("Updated Date of Joining");
    }

    validateNoRecordsAppear() {
        this.noRecordAvailableInfo.should('have.text', "No records available");
        cy.log("No Records Appear")
    }

    validateAccordionCollapsed() {
        this.editBasicInfoBtn.should('not.be.visible');
        cy.log("Accordion Is Collapsed")
    }


    clickOnEditBasicInfoDetails() {
        this.editBasicInfoBtn.click();
        cy.log("Clicked on the Edit button");
    }

    clickOnEditWorkDetails() {
        this.editWorkInfoBtn.click();
        cy.log("Clicked on the Edit button");
    }

    clickOnEditPersonalDetails() {
        this.editPersonalDetailsBtn.click();
        cy.log("Clicked on the Edit button");
    }

    clickOnCloseButton() {
        this.closeBtn.click();
        cy.log("Clicked on the Edit button");
    }

    updateFirstName(firstNameText) {
        this.editFirstNameTxt.clear().type(firstNameText).should('have.value', firstNameText)
        cy.log("Updated First Name Text");
    }

    updateMiddleName(middleNameText) {
        this.editMiddleNameTxt.clear().type(middleNameText).should('have.value', middleNameText)
        cy.log("Updated Middle Name Text");
    }

    updateLastName(lastNameText) {
        this.editLastNameTxt.clear().type(lastNameText).should('have.value', lastNameText)
        cy.log("Updated Last Name Text");
    }

    clickOnCloseButton() {
        this.closeBtn.click();
        cy.log("Clicked on the Close Button");
    }

    clickOnUpdateButton() {
        this.updateBtn.click();
        cy.log("Clicked on the Update Button");
        Loaders.threeDotLoading.should('not.exist');
    }

    validateSuccessMessage() {
        cy.contains("success").should('be.visible')
        cy.log("Success message is displayed");
    }

    updateDateOfBirth(dob) {
        this.editDateOfBirthPicker.type(dob).should('have.value', dob);
        cy.log("Date of Birth is selected");
    }

    updatePermanentAddress(permanentAddressTxt) {
        this.editPermanentAddressTxt.clear().type(permanentAddressTxt).should('have.value', permanentAddressTxt);
        cy.log("Entered Permanent Address");
    }
    updatePresentAddress(presentAddressTxt) {
        this.editPresentAddressTxt.clear().type(presentAddressTxt).should('have.value', presentAddressTxt);
        cy.log("Entered Present Address");
    }
    updateAdhaarNumber(adhaarNumberTxt) {
        this.editAdhaarNumberTxt.clear().type(adhaarNumberTxt).should('have.value', adhaarNumberTxt);
        cy.log("Adhaar Number is Entered");
    }

    updatePanNumber(panNumberTxt) {
        this.editPanNumberTxt.clear().type(panNumberTxt).should('have.value', panNumberTxt);
        cy.log("Pan Number is Entered");
    }
    updatePassportNumber(passportNo) {
        this.editPassportNumberTxt.clear().type(passportNo).should('have.value', passportNo);
        cy.log("Passport Number is Entered");
    }

    updateBloodGroup(bloodGroup) {
        this.editBloodGroupDrp.select(bloodGroup).should('contain', bloodGroup);
        cy.log("Blood Group is selected");
    }

    updateMaritalStatus(status) {
        cy.selectDrpValueByText(this.editMaritalStatusDrp, status, false);
        cy.log("Marital Status is selected");
    }

    updateAlternateNumber(alternateNumber) {
        this.editAlternateNumberTxt.clear().type(alternateNumber).should('have.value', alternateNumber);
        cy.log("Entered Alternate Number");
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

    updateGender(value) {
        this.genderRadioBtn(value).click();
    }

    getActualTableTexts(element) {
        const actualTexts = [];
        return element.each(($el) => {
            const text = Cypress.$($el).text().trim();
            actualTexts.push(text);
        }).then(() => actualTexts); // Return the collected texts after the iteration
    }

    assertExpectedTableLbl(locator, expectedTexts) {
        this.getActualTableTexts(locator).then((actualTexts) => {
            expectedTexts.forEach((expectedText, index) => {
                console.log(actualTexts[index]);
                console.log(expectedText[index]);
                expect(actualTexts[index]).to.eq(expectedText);
            });
        });
    }

    clickOnEducationDetail() {
        this.eduAccor.click();
        cy.log("Clicked on the Education Detail Option");
    }



}


export default new EmployeeProfilePage();