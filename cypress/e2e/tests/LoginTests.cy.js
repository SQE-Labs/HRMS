
describe("Login Tests",()=> {
    
    it("Basic Login with valid user and invalid user", ()=>{
        cy.login();
        cy.logout();
        cy.login("admin");  
    })
    
})

