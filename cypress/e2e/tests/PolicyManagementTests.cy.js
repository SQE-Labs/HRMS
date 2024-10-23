import sideBar from "../components/SideBar";
import PolicyMgmtPage from "../pages/PolicyMgmtPage";


describe("Evaluate Employee Tests", () => {

  it("HRMIS_1: Verify 'Modify Policies' page.", () => {
    cy.login();

    //Navigate to Modify Policy Page
    sideBar.navigateTo("Policy Management", "Modify Policy");
    PolicyMgmtPage.modifyPolicyLbl.should('be.visible');

   

  })
    
});