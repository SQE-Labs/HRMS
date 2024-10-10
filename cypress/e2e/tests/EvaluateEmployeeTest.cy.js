import sideBar from "../components/SideBar";
import EvaluateEmployeePage from "../pages/EvaluateEmployeePage";


describe("Evaluate Employee Tests", () => {

    it("HRMIS_1: Verify 'Evaluate Employee'page.", () => {
        cy.login();

      //Navigate to Evaluate Employee Page
      sideBar.navigateTo("Employee Management", "Evaluate Employee");
      EvaluateEmployeePage.evaluateEmployeeTxt.should('be.visible');

      //Verify that Evaluate Employee form opens up on selecting any option from 'Select Employee' dropdown.
      EvaluateEmployeePage.selectEmployee("DDinesh D Kumar")
      EvaluateEmployeePage.evaluateFormTxt.should('be.visible')

      //verify form fields are clear after clicking on reset button
      EvaluateEmployeePage.clickOnReset();
      EvaluateEmployeePage.assertFieldsEmpty();
      EvaluateEmployeePage.remarkTxt.should('have.text','')
      cy.wait(1000);
      cy.pause();
      //submit evaluation marks
      EvaluateEmployeePage.sendTextToMock(100);
      // EvaluateEmployeePage.sendTextToClassRoom(100);
      // EvaluateEmployeePage.sendTextToCoffeLearn(100);
      // EvaluateEmployeePage.sendTextToMQuiz(100);
      // EvaluateEmployeePage.sendTextToMeetUp(100);
      // EvaluateEmployeePage.sendTextToMentors(100);
      // EvaluateEmployeePage.sendTextToProjec(100);
      // EvaluateEmployeePage.sendTextToSEvaluation(100);
      // EvaluateEmployeePage.sendTextToFGoal(100);
      // EvaluateEmployeePage.sendTextToRemark("Marks Updated");
      cy.wait(2000);
     // EvaluateEmployeePage.clickOnSubmit();
      // cy.validateSuccessMessages("Successfully evaluated.");

    })
});