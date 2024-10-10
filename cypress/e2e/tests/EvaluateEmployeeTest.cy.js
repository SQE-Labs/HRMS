import sideBar from "../components/SideBar";
import EvaluateEmployeePage from "../pages/EvaluateEmployeePage";


describe("Evaluate Employee Tests", () => {

    it("HRMIS_1: Verify 'Evaluate Employee'page.", () => {
        cy.login();

      //Navigate to Evaluate Employee Page
      sideBar.navigateTo("Employee Management", "Evaluate Employee");

      //Validate Evaluate Employee Page Title
      EvaluateEmployeePage.evaluateEmployeeTxt.should('be.visible');

      //Verify that Evaluate Employee form opens up on selecting any option from 'Select Employee' dropdown.
      EvaluateEmployeePage.selectEmployee("DDinesh D Kumar")
      EvaluateEmployeePage.evaluateFormTxt.should('be.visible')

    })
});