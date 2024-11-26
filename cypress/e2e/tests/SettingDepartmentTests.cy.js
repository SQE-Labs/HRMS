import sideBar from "../components/SideBar";
import DepartmentsPage from "../pages/DepartmentsPage";
import { generateRandomString } from '../../support/utils';


let testData;
before(function () {
    cy.fixture('data').then((data) => {
        testData = data;
    });
})

beforeEach(() => {

    // login to Application
    cy.login();
    
  })


describe("Setting Department Tests", () => {

    it("HRMIS_1: Verify Departments tab", () => {

        // login to Application
        

        sideBar.navigateTo("Settings", "Departments");
        DepartmentsPage.departmentHeader.should('be.visible').and('have.text', 'Departments');

        // get and search valid data from the grid
        DepartmentsPage.searchDepartment();
        DepartmentsPage.assertSearchDepartment();

        //search Inavlid data and Verfiy "No Record Available "
        DepartmentsPage.searchDepartment("Inavlid");
        DepartmentsPage.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available');


    });


    it("HRMIS_2: Verify Add Departments ,cancle and cross icon funcionality ", () => {

        // login to Application
        

        sideBar.navigateTo("Settings", "Departments");
        DepartmentsPage.clickOnAddDepartment();
        DepartmentsPage.addUpdateDepartmentHeader.should('be.visible').and('have.text', 'Add  Department')

        // cancel button functionality 
        DepartmentsPage.clickOnCancelBtn();
        DepartmentsPage.addUpdateDepartmentHeader.should('not.be.visible')

        DepartmentsPage.clickOnAddDepartment();
        // cross button functionality 
        DepartmentsPage.clickOnCrossIcon();
        DepartmentsPage.addUpdateDepartmentHeader.should('not.be.visible')

    });


    it("HRMIS_3: Verify validation messages on Add Department pop up", () => {

        // login to Application
        

        sideBar.navigateTo("Settings", "Departments");
        DepartmentsPage.clickOnAddDepartment();

        DepartmentsPage.clickOnSubmit();
        DepartmentsPage.assertValidation(DepartmentsPage.DepartmentNameTxt, 'Please fill out this field.')
    });

    it("HRMIS_4: Verify new department added on clicking submit button", () => {

        // login to Application
        
        const departmentName = "Department Auto " + generateRandomString(5);
        expect(departmentName.length).to.be.at.least(21);
        sideBar.navigateTo("Settings", "Departments");
        let deptCountBefore;
        DepartmentsPage.departmentCount.invoke('text').then((text) => {
            deptCountBefore = text.trim();
        });
        DepartmentsPage.clickOnAddDepartment();
        DepartmentsPage.enterDepartmentName(departmentName);
        DepartmentsPage.clickOnSubmit();
        cy.validateSuccessMessages("Department created successfully!");
        DepartmentsPage.searchDepartment(departmentName);
        DepartmentsPage.assertSearchDepartment();
        cy.then(() => {
            DepartmentsPage.assertDepartmentCount(deptCountBefore);
        })


    });


    it("HRMIS_5: Verify edit department , Cancel and cross button", () => {

        // login to Application
        
        const departmentName = "Department Auto " + generateRandomString(5);
        expect(departmentName.length).to.be.at.least(21);
        sideBar.navigateTo("Settings", "Departments");
        DepartmentsPage.searchDepartment("Department Auto ");
        DepartmentsPage.clickOnEditBtn();
        DepartmentsPage.departmentHeader.should('be.visible').and('have.text', 'Departments');
        // cancel button functionality 
        DepartmentsPage.clickOnCancelBtn();
        DepartmentsPage.addUpdateDepartmentHeader.should('not.be.visible')

        DepartmentsPage.clickOnEditBtn();
        // cross button functionality 
        DepartmentsPage.clickOnCrossIcon();
        DepartmentsPage.addUpdateDepartmentHeader.should('not.be.visible');

    });


    it("HRMIS_6: Verify Update Department.", () => {

        // login to Application
        
        const departmentName = "Department Updated " + generateRandomString(5);
        expect(departmentName.length).to.be.at.least(21);
        sideBar.navigateTo("Settings", "Departments");
        DepartmentsPage.searchDepartment("Department Auto ");
        DepartmentsPage.clickOnEditBtn();
       
        // validation messages verification 
        DepartmentsPage.DepartmentNameTxt.clear();
        DepartmentsPage.clickOnSubmit();
        DepartmentsPage.assertValidation(DepartmentsPage.DepartmentNameTxt,'Please fill out this field.');
        DepartmentsPage.enterDepartmentName(departmentName);
        DepartmentsPage.clickOnSubmit();
        DepartmentsPage.searchDepartment(departmentName);
        DepartmentsPage.assertSearchDepartment("Department successfully updated!");
    });


});
