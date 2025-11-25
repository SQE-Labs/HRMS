import sideBar from "../components/SideBar";
import ApproveDocumentPage from "../pages/ApproveDocumentPage";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  cy.login("superUser1");
});

describe("Employee Management - Approve Document", () => {

    it("HRMIS_EM_63: Verify the document is uploaded on Approve Document page", () => {

        sideBar.navigateTo("Employee Management", "Document Upload");
        ApproveDocumentPage.selectEmployee(testData.EmployeeData.DocUploadName);
        ApproveDocumentPage.clickOnUploadAct("PAN Card");
        ApproveDocumentPage.selectSamplePdf("cypress/fixtures/resources/Sample testing pdf.pdf");
        ApproveDocumentPage.clickOnSubmitBnt();
        ApproveDocumentPage.assertValMsg_Comment();
        ApproveDocumentPage.enterComments("Commented");
        ApproveDocumentPage.clickOnSubmitBnt();
        ApproveDocumentPage.assertSuccMsg_Upload();

    });

    it("HRMIS_EM: Verify that the document gets approves or rejected on Approve Document page", () =>{

        sideBar.navigateTo("Employee Management", "Approve Document");
        ApproveDocumentPage.approveDocumentHeader.should('be.visible').and('have.text', 'Approve Document');
        ApproveDocumentPage.selectEmployeeDocument(testData.EmployeeData.AprroveName);
        ApproveDocumentPage.clickOnActBtn("PAN Card");
        ApproveDocumentPage.clickOnSubmitBtn();
        ApproveDocumentPage.assertValMsg_Item();
        ApproveDocumentPage.selectRejectOption("Reject");
        ApproveDocumentPage.clickOnSubmitBtn();
        ApproveDocumentPage.assertValMsg_Field();
        ApproveDocumentPage.enterRejectComments();
        ApproveDocumentPage.clickOnSubmitBtn();
        ApproveDocumentPage.assertSuccMsg_Approve();
    });
});