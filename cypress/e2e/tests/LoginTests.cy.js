

describe("Login Tests",()=> {
    
    it('should handle errors gracefully', () => {
        let tokenUrl = null;
        cy.task('emailFetcher').then((emailId) => {
            cy.log('Email ID:', emailId);
        });

        cy.task('contentGetter', 'bois@yopmail.com').then((email) => {
            cy.log('Email :', email.content);
        });  
        
        cy.task('getConfirmaUrl', 'bois@yopmail.com').then((url) => {
            cy.log('url :', url );
            cy.visit(String(url), {failOnStatusCode:false});
        })

        }); 
});

