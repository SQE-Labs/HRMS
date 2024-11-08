import sideBar from "../components/SideBar";
import UploadEmpDocumentPage from "../pages/UploadEmpDocumentPage";

let testData;
before(function(){
    cy.fixture('data').then((data) => {
        testData = data;
      });
})

beforeEach(() => {

    // login to Application
    cy.login();
    sideBar.navigateTo("Employee Management", "Upload Document");
    cy.wait(1000);

})

describe("Employee Upload Document Tests", () => {

    it("HRMIS_1: Verify Upload document Page ", () => {

        UploadEmpDocumentPage.assertTextEquals(UploadEmpDocumentPage.uploadeDocHeaderLbl, 'Upload Document');
        UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);

        const expectedCol = ['Serial No.', 'Document Name', 'Mandatory', 'Status', 'Action'];
        UploadEmpDocumentPage.assertExpectedTableLbl(UploadEmpDocumentPage.tableColHeadLbl, expectedCol);

    });


    it("HRMIS_2: Verify 'Upload Document Action'popup opens up and close when click on 'upload' icon and 'cancel' button repectively", () => {

        UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);
        UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
        UploadEmpDocumentPage.uploadeActPopLbl.should('be.visible').and('have.text', 'Upload Document Action')

        // pop up closed after clicking on cancel button 
        UploadEmpDocumentPage.clickOnCancelBtn();
        UploadEmpDocumentPage.uploadeActPopLbl.should('not.be.visible')

        // pop up closed after clicking on cross icon
        UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
        UploadEmpDocumentPage.uploadeActPopLbl.should('be.visible').and('have.text', 'Upload Document Action')
        UploadEmpDocumentPage.clickOnCrossIcon();
        UploadEmpDocumentPage.uploadeActPopLbl.should('not.be.visible')

    });
   

    it("HRMIS_3:Verify that documents gets uploaded after clicking on 'Submit' button", () => {

        UploadEmpDocumentPage.assertTextEquals(UploadEmpDocumentPage.uploadeDocHeaderLbl, 'Upload Document');
        UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);
        UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
        UploadEmpDocumentPage.chooseDocument('cypress/fixtures/resources/dummy.pdf');
        UploadEmpDocumentPage.enterComments("Commented");
        UploadEmpDocumentPage.clickOnSubmitBnt();
        UploadEmpDocumentPage.eyeIcon("Insurance Card").should('be.visible')
        UploadEmpDocumentPage.clickOnEyeIcon("Insurance Card");
        UploadEmpDocumentPage.assertPdf();

    });


});
