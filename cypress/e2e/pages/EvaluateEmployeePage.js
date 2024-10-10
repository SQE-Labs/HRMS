import BasePage from "./BasePage";

class EvaluateEmployeePage extends BasePage {

  //Locators
  get evaluateEmployeeTxt() { return cy.get("div[class='page-heading'] h1") }
  get employeeDrp() { return cy.get(".css-19bb58m") }
  get evaluateFormTxt() { return cy.get("form[id='assign-asset'] div[class='card'] h3") }
  get formInputsTxt() { return cy.get("div.input-group input") }
  get resetBtn() { return cy.get("div.action button.btn") }
  get remarkTxt() {return cy.get("textarea[name='remarks']")}
  get formMockTxt() {return cy.get("div.input-group input[name='mock']")}
  get formCRSTxt() {return cy.get("div.input-group input[name='classroom']")}
  get formcoffeeNLearnTxt() {return cy.get("div.input-group input[name='coffeeNLearn']")}
  get formMuleQuizTxt() {return cy.get("div.input-group input[name='muleSoftQuizRank']")}
  get formMuleMeetUpTxt() {return cy.get("div.input-group input[name='muleSoftMeetups']")}
  get formmentorsTxt() {return cy.get("div.input-group input[name='mentors']")}
  get formprojectTxt() {return cy.get("div.input-group input[name='project']")}
  get formselfEvaluationTxt() {return cy.get("div.input-group input[name='selfEvaluation']")}
  get formfutureGoalTxt() {return cy.get("div.input-group input[name='futureGoal']")}
  get submitBtn() { return cy.get("div.action button[type='Submit']") }

  //Methods
  selectEmployee(text) {
    cy.selectDrpValueByText(this.employeeDrp, text, true, this.employeeDrp);
  }

  clickOnReset() {
    this.resetBtn.contains('Reset').click();
  }

  assertFieldsEmpty() {
    this.formInputsTxt.each(($input) => {
      cy.wrap($input).should('have.value', '')
    });
  }

  sendTextToMock(marks) {
    this.formMockTxt.click().wait(2000).type(marks);
  }
  sendTextToClassRoom(marks) {
    this.formCRSTxt.click().wait(1000).type(marks);
  }
  sendTextToCoffeLearn(marks) {
    this.formcoffeeNLearnTxt.click().wait(1000).type(marks);
  }
  sendTextToMQuiz(marks) {
    this.formMuleQuizTxt.click().wait(1000).type(marks);
  }
  sendTextToMeetUp(marks) {
    this.formMuleMeetUpTxt.click().wait(1000).type(marks);
  }
  sendTextToMentors(marks) {
    this.formmentorsTxt.click().wait(1000).type(marks);
  }
  sendTextToProjec(marks) {
    this.formprojectTxt.click().wait(1000).type(marks);
  }
  sendTextToSEvaluation(marks) {
    this.formselfEvaluationTxt.click().wait(1000).type(marks);
  }
  sendTextToFGoal(marks) {
    this.formfutureGoalTxt.click().wait(1000).type(marks);
  }
  sendTextToRemark(marks) {
    this.remarkTxt.click().wait(1000).type(marks);
  }

  clickOnSubmit(){
    this.submitBtn.wait(1000).click();
  }


}



export default new EvaluateEmployeePage();