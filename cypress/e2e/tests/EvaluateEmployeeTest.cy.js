import sideBar from "../components/SideBar";
import EvaluateEmployeePage from "../pages/EvaluateEmployeePage";


describe("Evaluate Employee Tests", () => {

    it("HRMIS_1: Verify that 'Evaluate employee' page opens up.", () => {
        cy.login();

      //Navigate to Evaluate Employee Page
      sideBar.navigateTo("Employee Management", "Evaluate Employee");

      //Validate Page Title
      EvaluateEmployeePage.evaluateEmployeeTxt.should('be.visible');

    })
});