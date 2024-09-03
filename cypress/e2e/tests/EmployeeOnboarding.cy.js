import SideBar from "../components/SideBar";

describe("Employee Onboard Tests",()=> {
    
    it("Basic Login with valid user and invalid user", ()=>{
        cy.login();
        SideBar.navigateTo("Employee Onboard", "Invitations");
    })
    
})

