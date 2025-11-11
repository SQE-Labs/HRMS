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
  it("HRMIS_EM_52, HRMIS_EM_53: Verify Upload document Page ", () => {
    UploadEmpDocumentPage.assertTextEquals(
      //Verify that user gets directed to 'Document Upload' page, after clicking on 'Document Upload
      UploadEmpDocumentPage.uploadeDocHeaderLbl,
      "Document Upload"
    );

    // Verify that user is able to select any option from 'Select Employee' dropdown field
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

  it("HRMIS_EM_54, HRMIS_EM_55: Verify 'Upload Document Action'popup opens up and close when click on 'upload' icon and 'cancel' button repectively", () => {
    UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);
    UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
    UploadEmpDocumentPage.uploadeActPopLbl
      .should("be.visible")
      .and("have.text", "Upload Document Action");

    // pop up closed after clicking on cancel button
    ////Verify that 'Upload Document Action' popup gets closed after clicking on 'Cancel' button of 'Upload Document Action
    UploadEmpDocumentPage.clickOnCancelBtn();
    UploadEmpDocumentPage.uploadeActPopLbl.should("not.be.visible");

    // pop up closed after clicking on cross icon
    UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");
    UploadEmpDocumentPage.uploadeActPopLbl
      .should("be.visible")
      .and("have.text", "Upload Document Action");

    //Verify that 'Upload Document Action' popup gets closed after clicking on 'Cross' icon of 'Upload Document Action
    UploadEmpDocumentPage.clickOnCrossIcon();
    UploadEmpDocumentPage.uploadeActPopLbl.should("not.be.visible");
  });

  it("HRMIS_EM_58: Verify that documents gets uploaded after clicking on 'Submit' button", () => {
    UploadEmpDocumentPage.assertTextEquals(
      UploadEmpDocumentPage.uploadeDocHeaderLbl,
      "Document Upload"
    );
    UploadEmpDocumentPage.selectEmployee(testData.EmployeeName);
    UploadEmpDocumentPage.clickOnUploadAct("Insurance Card");

    //Verify that documents gets uploaded after clicking on 'Submit' button, when user enters mandatory data in all field
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
