import sideBar from "../components/SideBar";
import EvaluateEmployeePage from "../pages/EvaluateEmployeePage";


describe("Evaluate Employee Tests", () => {

  it("HRMIS_1: Verify 'Evaluate Employee'page.", () => {
    cy.login();

    //Navigate to Evaluate Employee Page
    sideBar.navigateTo("Employee Management", "Evaluate Employee");
    EvaluateEmployeePage.evaluateEmployeeTxt.should('be.visible');

    //Verify that Evaluate Employee form opens up on selecting any option from 'Select Employee' dropdown.
    EvaluateEmployeePage.selectEmployee("DDinesh D Kumar");
    EvaluateEmployeePage.evaluateFormTxt.should('be.visible');

    //verify form fields are clear after clicking on reset button
    cy.intercept('POST', '/HRMBackendTest/performance/hr', (req) => {
      req.reply(403, { message: 'Request was blocked' });
    }).as('postPerformanceHR');
    EvaluateEmployeePage.clickOnReset();
    cy.wait('@postPerformanceHR').its('response.statusCode').should('eq', 403);
    EvaluateEmployeePage.assertFieldsEmpty();
    EvaluateEmployeePage.remarkTxt.should('have.text', '');

    //submit evaluation marks
    EvaluateEmployeePage.sendTextToMock(120);
    EvaluateEmployeePage.sendTextToClassRoom(100);
    EvaluateEmployeePage.sendTextToCoffeLearn(100);
    EvaluateEmployeePage.sendTextToMQuiz(100);
    EvaluateEmployeePage.sendTextToMeetUp(100);
    EvaluateEmployeePage.sendTextToMentors(100);
    EvaluateEmployeePage.sendTextToProjec(100);
    EvaluateEmployeePage.sendTextToSEvaluation(100);
    EvaluateEmployeePage.sendTextToFGoal(100);
    EvaluateEmployeePage.sendTextToRemark("Marks Updated");

    // Reset Post Request 
    cy.intercept('POST', '/HRMBackendTest/performance/hr', (req) => {
      req.reply(200, { message: 'Successfully evaluated.' });
    }).as('postPerformanceHR');

    cy.wait(2000);
    EvaluateEmployeePage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully evaluated.");

  })


  it.only("HRMIS_2: Verify use able to export employee Evaluate details on 'Evaluate Employee' page ", () => {

    
    EvaluateEmployeePage.deleteExistingFile('cypress/downloads/performance_evaluation.xlsx');

    cy.login();

    //Navigate to Evaluate Employee Page
    sideBar.navigateTo("Employee Management", "Evaluate Employee");
    EvaluateEmployeePage.evaluateEmployeeTxt.should('be.visible');
    EvaluateEmployeePage.viewBtn.should('be.visible');
    EvaluateEmployeePage.clickOnViewBtn();

    // export CSV and verify
    EvaluateEmployeePage.evalutationLbl.should('be.visible');
    EvaluateEmployeePage.exportBtn.should('be.visible');
    EvaluateEmployeePage.clickOnExportBtn();
    EvaluateEmployeePage.checkFile('cypress/downloads/performance_evaluation.xlsx')
    
    // back icon
    EvaluateEmployeePage.clickOnBackIcon();
    EvaluateEmployeePage.evaluateEmployeeTxt.should('be.visible');






  })
});