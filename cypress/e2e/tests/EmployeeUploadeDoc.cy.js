import sideBar from "../components/SideBar";
import UploadEmpDocumentPage from "../pages/UploadEmpDocumentPage";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  // login to Application
  cy.login("superUser");
  sideBar.navigateTo("Employee Management", "Document Upload");
  cy.wait(1000);
});

describe("Employee Upload Document Tests", () => {
  it("HRMIS_1: Verify Upload document Page ", () => {
    UploadEmpDocumentPage.assertTextEquals(
      UploadEmpDocumentPage.uploadeDocHeaderLbl,
      "Document Upload"
    );
    UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);

    const expectedCol = [
      "S.No.",
      "Document Name",
      "Mandatory",
      "Status",
      "Action",
    ];
    UploadEmpDocumentPage.assertExpectedTableLbl(
      UploadEmpDocumentPage.tableColHeadLbl,
      expectedCol
    );
  });

  it("HRMIS_2: Verify 'Upload Document Action'popup opens up and close when click on 'upload' icon and 'cancel' button repectively", () => {
    UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);
    UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
    UploadEmpDocumentPage.uploadeActPopLbl
      .should("be.visible")
      .and("have.text", "Upload Document Action");

    // pop up closed after clicking on cancel button
    UploadEmpDocumentPage.clickOnCancelBtn();
    UploadEmpDocumentPage.uploadeActPopLbl.should("not.be.visible");

    // pop up closed after clicking on cross icon
    UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
    UploadEmpDocumentPage.uploadeActPopLbl
      .should("be.visible")
      .and("have.text", "Upload Document Action");
    UploadEmpDocumentPage.clickOnCrossIcon();
    UploadEmpDocumentPage.uploadeActPopLbl.should("not.be.visible");
  });

  it("HRMIS_3:Verify that documents gets uploaded after clicking on 'Submit' button", () => {
    UploadEmpDocumentPage.assertTextEquals(
      UploadEmpDocumentPage.uploadeDocHeaderLbl,
      "Document Upload"
    );
    UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);
    UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
    UploadEmpDocumentPage.handleInsuranceUpload(
      "cypress/fixtures/resources/dummy.pdf",
      "Commented"
    );
    // UploadEmpDocumentPage.enterComments("Commented");
    // UploadEmpDocumentPage.handleInsuranceUpload();
    UploadEmpDocumentPage.eyeIcon("Insurance Card").should("be.visible");
    // UploadEmpDocumentPage.clickOnEyeIcon("Insurance Card");
    //UploadEmpDocumentPage.assertPdf();
  });
});
