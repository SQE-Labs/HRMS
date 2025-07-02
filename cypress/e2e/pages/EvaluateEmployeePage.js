import { debug } from "util";
import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class EvaluateEmployeePage extends BasePage {
  //Locators
  get evaluateEmployeeTxt() {
    return cy.get("div[class='page-heading'] h1");
  }
  get employeeDrp() {
    return cy.get(".css-19bb58m");
  }
  get evaluateFormTxt() {
    return cy.get("form[id='assign-asset'] div[class='card'] h3");
  }
  get formInputsTxt() {
    return cy.get("div.input-group input");
  }
  get resetBtn() {
    return cy.xpath("//button[text()='Reset']");
  }
  get remarkTxt() {
    return cy.get("textarea[name='remarks']");
  }
  get formMockTxt() {
    return cy.get("div.input-group input[name='mock'][type='tel']");
  }
  get formCRSTxt() {
    return cy.get("div.input-group input[name='classroom'][type='tel']");
  }
  get formcoffeeNLearnTxt() {
    return cy.get("div.input-group input[name='coffeeNLearn'][type='tel']");
  }
  get formMuleQuizTxt() {
    return cy.get("div.input-group input[name='muleSoftQuizRank'][type='tel']");
  }
  get formMuleMeetUpTxt() {
    return cy.get("div.input-group input[name='muleSoftMeetups'][type='tel']");
  }
  get formmentorsTxt() {
    return cy.get("div.input-group input[name='mentors'][type='tel']");
  }
  get formprojectTxt() {
    return cy.get("div.input-group input[name='project'][type='tel']");
  }
  get formselfEvaluationTxt() {
    return cy.get("div.input-group input[name='selfEvaluation'][type='tel']");
  }
  get formfutureGoalTxt() {
    return cy.get("div.input-group input[name='futureGoal'][type='tel']");
  }
  get submitBtn() {
    return cy.get("div.action button[type='Submit']");
  }
  get viewBtn() {
    return cy.get("div.actions a.export");
  }
  get evalutationLbl() {
    return cy.get("#showMenuBtn ~ h1");
  }
  get exportBtn() {
    return cy.get("div.actions a");
  }
  get backArrow() {
    return cy.get("#showMenuBtn ~a");
  }

  //Methods
  selectEmployee(text) {
    cy.selectDrpValueByText(this.employeeDrp, text, true, this.employeeDrp);
  }

  clickOnReset() {
    this.resetBtn.focus().should("have.length", 1).click();
  }

  assertFieldsEmpty() {
    this.formInputsTxt.each(($input) => {
      cy.wrap($input).should("have.value", "");
    });
  }

  sendTextToMock(marks) {
    this.formMockTxt.focus();
    this.formMockTxt.click();
    // this.formCRSTxt.should('be.focused');
    this.formMockTxt.type(marks);
  }

  sendTextToClassRoom(marks) {
    this.formCRSTxt.focus();
    this.formCRSTxt.click();
    this.formCRSTxt.should("be.focused");
    this.formCRSTxt.type(marks);
  }
  sendTextToCoffeLearn(marks) {
    this.formcoffeeNLearnTxt.focus();
    this.formcoffeeNLearnTxt.click();
    this.formcoffeeNLearnTxt.should("be.focused");
    this.formcoffeeNLearnTxt.type(marks);
  }
  sendTextToMQuiz(marks) {
    this.formMuleQuizTxt.focus();
    this.formMuleQuizTxt.click();
    this.formMuleQuizTxt.type(marks);
  }
  sendTextToMeetUp(marks) {
    this.formMuleMeetUpTxt.focus();
    this.formMuleMeetUpTxt.click();
    this.formMuleMeetUpTxt.type(marks);
  }
  sendTextToMentors(marks) {
    this.formmentorsTxt.focus();
    this.formmentorsTxt.click();
    this.formmentorsTxt.type(marks);
  }
  sendTextToProjec(marks) {
    this.formprojectTxt.focus();
    this.formprojectTxt.click();
    this.formprojectTxt.type(marks);
  }
  sendTextToSEvaluation(marks) {
    this.formselfEvaluationTxt.focus();
    this.formselfEvaluationTxt.click();
    this.formselfEvaluationTxt.type(marks);
  }
  sendTextToFGoal(marks) {
    this.formfutureGoalTxt.focus();
    this.formfutureGoalTxt.click();
    this.formfutureGoalTxt.type(marks);
  }
  sendTextToRemark(marks) {
    this.remarkTxt.focus();
    this.remarkTxt.click();
    this.remarkTxt.type(marks);
  }

  clickOnSubmit() {
    this.submitBtn.wait(1000).click();
  }

  clickOnViewBtn() {
    this.viewBtn.click();
    Loaders.threeDotLoading.should("not.exist");
  }

  clickOnExportBtn() {
    this.exportBtn.click();
  }

  checkFile(path) {
    cy.readFile(path).should("exist");
  }

  deleteExistingFile(filePath) {
    cy.task("deleteFile", filePath).then((result) => {
      if (result.success) {
        cy.log("File deleted successfully");
      } else {
        cy.log(result.message);
      }
    });
  }

  clickOnBackIcon() {
    this.backArrow.click();
    Loaders.threeDotLoading.should("not.exist");
    Loaders.overlay.should("not.exist");
  }
}

export default new EvaluateEmployeePage();
