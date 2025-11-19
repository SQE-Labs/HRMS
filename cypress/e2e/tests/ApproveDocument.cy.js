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
        ApproveDocumentPage.selectEmployee(testData.EmployeeName);
        ApproveDocumentPage.clickOnUploadAct("PAN Card");
        ApproveDocumentPage.selectSamplePdf("cypress/fixtures/resources/Sample testing pdf.pdf");
        ApproveDocumentPage.enterComments();
        ApproveDocumentPage.clickOnSubmitBnt();

        sideBar.navigateTo("Employee Management", "Approve Document");
        ApproveDocumentPage.approveDocumentHeader.should("be.visible").and("have.text", "Approve Document");

    });

    it("HRMIS_EM: Verify that the document gets approves or rejected on Approve Document page", () =>{
      const fullName = `${testData.EmployeeData.FirstName} ${testData.EmployeeData.LastName}`;

        sideBar.navigateTo("Employee Management", "Approve Document");
        // ApproveDocumentPage.selectEmployeeDocument(fullName);
        ApproveDocumentPage.clickOnActBtn("PAN Card");
        cy.wait(3000);
        ApproveDocumentPage.selectRejectOption("Reject");
        cy.wait(3000);
        ApproveDocumentPage.enterRejectComments();
        cy.wait(3000);
        ApproveDocumentPage.clickOnSubmitBtn();
        cy.wait(3000);



    });
});