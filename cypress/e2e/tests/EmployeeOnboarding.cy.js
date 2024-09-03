import sideBar from "../components/SideBar";
import dashboard from "../pages/Dashboard";

describe("Employee Onboard Tests",()=> {
    it("Basic Login with valid user and invalid user", ()=>{
        cy.login();
        sideBar.navigateTo("Employee Onboard", "Invitations");
        dashboard.logoutButton.click();
    })
    
})

