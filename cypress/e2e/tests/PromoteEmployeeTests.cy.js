import sideBar from "../components/SideBar";
import PromoteEmployeePage from "../pages/PromoteEmployeePage";


beforeEach(() => {

    // login to Application
    cy.login();
    sideBar.navigateTo("Employee Management", "Promote Employee");
    cy.wait(1000);

})


describe("Employee Managment Promote Employee Tests", () => {

    it("HRMIS_1: Verify Promote Open when user click on Promote Employee Subtab under Employee Managment", () => {

        const expectedTexts = ['Employee Id', 'Name', 'Department', 'Designation' ,'Action'];

        PromoteEmployeePage.promoteEmployeeLbl.invoke('text').then((text)=>{
            expect(text.trim()).to.eq('Promote Employee');
        });
        cy.wait(1000);
        PromoteEmployeePage.selectEmployee("Auto Mation User");
        PromoteEmployeePage.tableHeadersLbl.each((headerText, index) => {
            cy.wrap(headerText).should('contain.text', expectedTexts[index])
        });
    });


    it("HRMIS_2: Verify Promot pop up open and close when user click on Promot and Cancel button", () => {

        cy.wait(1000);
        PromoteEmployeePage.selectEmployee("Auto Mation User");
        PromoteEmployeePage.clickOnPromote();
        PromoteEmployeePage.promotePopHeaderLbl.should('have.text','Promote Employee');
        PromoteEmployeePage.clickOnCancel();
        PromoteEmployeePage.promotePopHeaderLbl.should('not.be.visible');

        // Verify Crosse Icon on Pop up
        PromoteEmployeePage.clickOnPromote();
        PromoteEmployeePage.clickOnCrossIcon();
        PromoteEmployeePage.promotePopHeaderLbl.should('not.be.visible');


    });


    it("HRMIS_3: Verify Validation message appears after clicking on submit button when no department or designation is selected", () => {
        
        cy.wait(1000);
        PromoteEmployeePage.selectEmployee("Auto Mation User");
        PromoteEmployeePage.clickOnPromote();
        PromoteEmployeePage.promotePopHeaderLbl.should('have.text','Promote Employee');

        // When no department is selected.
        PromoteEmployeePage.clickOnSubmitBtn();
        PromoteEmployeePage.selectDepartmentDrp
        .invoke('prop', 'validationMessage') 
        .should('equal', 'Please select an item in the list.');

        // select department
        PromoteEmployeePage.selectDepartment("GENRIC");
        // when no designation is selected.
        PromoteEmployeePage.clickOnSubmitBtn();
        cy.wait(1000);
        PromoteEmployeePage.selectDesignationDrp
        .invoke('prop', 'validationMessage') 
        .should('equal', 'Please select an item in the list.');


    });


    it("HRMIS_4: Verify Validation message appears after clicking on submit button when no department or designation is selected", () => {
        

        const designations = ['Select Designation','CEO & Chief Architect','Co Founder & COO','VP Sucess Manager & Sales','Chief People Officer','Piyush Dogra'];

        cy.wait(1000);
        PromoteEmployeePage.selectEmployee("Auto Mation User");
        PromoteEmployeePage.clickOnPromote();
        PromoteEmployeePage.promotePopHeaderLbl.should('have.text','Promote Employee');
        PromoteEmployeePage.selectDepartment("GENRIC")
        PromoteEmployeePage.getdesgnationOptions().then((options) => {
            const optionTexts = [...options].map(option => option.innerText.trim()); // Extract all option texts
            optionTexts.forEach((text,index) => {
            expect(text).to.deep.equal(designations[index]); 
            });
          });


        })
       
    


});
