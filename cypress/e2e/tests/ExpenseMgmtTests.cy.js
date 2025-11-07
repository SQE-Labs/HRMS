import sideBar from "../components/SideBar";
import ReimbursementPage from "../pages/ReimbursementPage";
import {
  generateRandomString,
  generateRandomNumber,
} from "../../support/utils";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  // login to Application
  cy.login("superUser");
});

describe("Reimbursement Tests", () => {
  it("HRMIS_1: Verify Reimbursement Page", () => {
    // login to Application

    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");
    ReimbursementPage.assert_SubMenus(testData.ExpenseManagment.SubMenus);

    ReimbursementPage.reimbursementHeader
      .should("be.visible")
      .and("have.text", "Reimbursement Requests");

    // select Item Per Page 20
    ReimbursementPage.selectItemPerPage("5");
    ReimbursementPage.itemPerPageDrp.should("have.value", "5");
    ReimbursementPage.gridRows.should("have.length", 5);

    ReimbursementPage.selectItemPerPage("10");

    // get and search valid data from the grid
    ReimbursementPage.search_Reimbursement_Type();
    ReimbursementPage.assert_Search_Reimbursement_Type();

    //search Inavlid data and Verfiy "No Record Available "
    ReimbursementPage.search_Reimbursement_Type("Inavlid");
    ReimbursementPage.noRecordeLbl
      .should("be.visible")
      .and("have.text", "No Record Available");
  });

  it("HRMIS_2: Verify Reimbursement Request Button and Back Button", () => {
    // login to Application

    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");

    ReimbursementPage.clickOnReimbursemetnReq();
    ReimbursementPage.reimbursementFormLbl
      .should("be.visible")
      .and("have.text", "Reimbursement");
    ReimbursementPage.clickOn_backtoReimbursement_PageBtn();
    ReimbursementPage.reimbursementHeader
      .should("be.visible")
      .and("have.text", "Reimbursement Requests");
  });

  it("HRMIS_3: Verify 'Next' and 'Previous' Pagination button Reimbursement Page", () => {
    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");

    // Declare variables to store the values
    let expectedRequest,
      actualRequestName,
      actualRequestName1,
      actualRequestName2;

    // Step 1: Capture the initial reimbursement name
    ReimbursementPage.lastReimbursmentName
      .invoke("text")
      .then((text) => {
        expectedRequest = text.trim();

        // Step 2: Click Next and capture the next reimbursement name
        ReimbursementPage.clickNext();
        return ReimbursementPage.lastReimbursmentName.invoke("text");
      })
      .then((text) => {
        actualRequestName1 = text.trim();

        // Step 3: Click Previous and capture the previous reimbursement name
        ReimbursementPage.clickPrevious();
        return ReimbursementPage.lastReimbursmentName.invoke("text");
      })
      .then((text) => {
        actualRequestName = text.trim();

        // Step 4: Click Next again and capture the reimbursement name
        ReimbursementPage.clickNext();
        return ReimbursementPage.lastReimbursmentName.invoke("text");
      })
      .then((text) => {
        actualRequestName2 = text.trim();

        // Assertions
        expect(actualRequestName1).to.equal(actualRequestName2);
        expect(actualRequestName).to.equal(expectedRequest);
      });
  });

  it("HRMIS_4: Verify Reimbursement Request For Internet Claim ", () => {
    // login to Application

    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");
    ReimbursementPage.clickOnReimbursemetnReq();

    // Assert Reimbursement Input validataion and select the type
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.reimbursementType_Drp,
      "Please select an item in the list."
    );
    ReimbursementPage.select_reimbursementType(
      testData.ReimbursementTypes.InternetClaim
    );

    // Invoice date validation and select the invoice date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.invoiceDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_InvoiceDate(
      testData.ReimbursementDates.InvoiceDate
    );

    // Invoice No validation and Enter the invoice No
    const invoiceNumber = generateRandomNumber(10);
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.invoiceNo_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_InvoiceNo(invoiceNumber);

    // Invoice from date validation and Enter the from date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.fromDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_FromDate(testData.ReimbursementDates.FromDate);

    // Invoice from date validation and Enter the from date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.toDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_ToDate(testData.ReimbursementDates.ToDate);

    // uploade validation and chosse the document
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidationFile(
      ReimbursementPage.chooseFile,
      "Please select a file."
    );
    ReimbursementPage.chooseDocument(
      "cypress/fixtures/resources/index_001.html"
    );
    cy.validateSuccessMessages(testData.UnsportedFileWarningMessage);
    ReimbursementPage.chooseDocument("cypress/fixtures/resources/dummy.pdf");

    // Amount validation and Enter the amount
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.reimbursementAmount_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_reimbursementAmount("76000");

    // Comment validation and Enter the Comment
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.comment_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_Comment("Commented");

    ReimbursementPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully Sent!");
    cy.wait(1000);
    ReimbursementPage.clickNextUntilDisabled();
    ReimbursementPage.lastReimbursmentName.should(
      "have.text",
      testData.ReimbursementTypes.InternetClaim
    );
    ReimbursementPage.lastInvoiceNo.should("have.text", invoiceNumber);
    ReimbursementPage.lastRowActionLbl.should(
      "have.text",
      testData.ReimbursementAction.Withdraw
    );
    ReimbursementPage.lastRequestStatus.should(
      "have.text",
      testData.ReimbursementStatus.PendingAdmin
    );
  });

  it("HRMIS_5: Verify Reimbursement Request For Travel Expense ", () => {
    // login to Application

    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");
    ReimbursementPage.clickOnReimbursemetnReq();

    // Assert Reimbursement Input validataion and select the type
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidationFile(
      ReimbursementPage.reimbursementType_Drp,
      "Please select an item in the list."
    );
    ReimbursementPage.select_reimbursementType(
      testData.ReimbursementTypes.TravelExpense
    );

    // Invoice date validation and select the invoice date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.invoiceDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_InvoiceDate(
      testData.ReimbursementDates.InvoiceDate
    );

    // Invoice No validation and Enter the invoice No
    const invoiceNumber = generateRandomNumber(10);
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.invoiceNo_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_InvoiceNo(invoiceNumber);

    // Invoice from date validation and Enter the from date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.fromDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_FromDate(testData.ReimbursementDates.FromDate);

    // Invoice To date validation and Enter the from date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.toDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_ToDate(testData.ReimbursementDates.ToDate);

    // uploade validation and chosse the document
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidationFile(
      ReimbursementPage.chooseFile,
      "Please select a file."
    );
    ReimbursementPage.chooseDocument(
      "cypress/fixtures/resources/index_001.html"
    );
    cy.validateSuccessMessages(testData.UnsportedFileWarningMessage);
    ReimbursementPage.chooseDocument("cypress/fixtures/resources/dummy.pdf");

    // from place Validation and Enter the place
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.fromPlaceTxt,
      "Please fill out this field."
    );
    ReimbursementPage.enterPlaceName(ReimbursementPage.fromPlaceTxt, "Panipat");

    // To place Validation and Enter the place
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.toPlaceTxt,
      "Please fill out this field."
    );
    ReimbursementPage.enterPlaceName(ReimbursementPage.toPlaceTxt, "Mohali");

    // Assert Vehical Type validataion and select the type
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidationFile(
      ReimbursementPage.vehicalTypeDrp,
      "Please select an item in the list."
    );
    ReimbursementPage.select_VehicalType(testData.VehicalType.FourWheeler);

    // Distance Validation and Enter the distance
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.distanceTxt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_Distance("120");

    // Amount validation and Enter the amount
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.reimbursementAmount_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_reimbursementAmount("76000");

    // Comment validation and Enter the Comment
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.comment_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_Comment("Commented");

    ReimbursementPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully Sent!");
    cy.wait(1000);
    ReimbursementPage.clickNextUntilDisabled();
    ReimbursementPage.lastReimbursmentName.should(
      "have.text",
      testData.ReimbursementTypes.TravelExpense
    );
    ReimbursementPage.lastInvoiceNo.should("have.text", invoiceNumber);
    ReimbursementPage.lastRowActionLbl.should(
      "have.text",
      testData.ReimbursementAction.Withdraw
    );
    ReimbursementPage.lastRequestStatus.should(
      "have.text",
      testData.ReimbursementStatus.PendingAdmin
    );
  });

  it("HRMIS_6: Verify Reimbursement Request For Miscellaneous", () => {
    // login to Application

    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");
    ReimbursementPage.clickOnReimbursemetnReq();

    // Assert Reimbursement Input validataion and select the type
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidationFile(
      ReimbursementPage.reimbursementType_Drp,
      "Please select an item in the list."
    );
    ReimbursementPage.select_reimbursementType(
      testData.ReimbursementTypes.Miscellaneous
    );

    // Invoice date validation and select the invoice date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.invoiceDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_InvoiceDate(
      testData.ReimbursementDates.InvoiceDate
    );

    // Invoice No validation and Enter the invoice No
    const invoiceNumber = generateRandomNumber(10);
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.invoiceNo_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_InvoiceNo(invoiceNumber);

    // Invoice from date validation and Enter the from date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.fromDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_FromDate(testData.ReimbursementDates.FromDate);

    // Invoice To date validation and Enter the from date
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.toDate,
      "Please fill out this field."
    );
    ReimbursementPage.select_ToDate(testData.ReimbursementDates.ToDate);

    // uploade validation and chosse the document
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidationFile(
      ReimbursementPage.chooseFile,
      "Please select a file."
    );
    ReimbursementPage.chooseDocument(
      "cypress/fixtures/resources/index_001.html"
    );
    cy.validateSuccessMessages(testData.UnsportedFileWarningMessage);
    ReimbursementPage.chooseDocument("cypress/fixtures/resources/dummy.pdf");

    // Amount validation and Enter the amount
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.reimbursementAmount_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_reimbursementAmount("76000");

    // Comment validation and Enter the Comment
    ReimbursementPage.clickOnSubmit();
    ReimbursementPage.assertValidation(
      ReimbursementPage.comment_Txt,
      "Please fill out this field."
    );
    ReimbursementPage.enter_Comment("Commented");

    ReimbursementPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully Sent!");
    cy.wait(1000);
    ReimbursementPage.clickNextUntilDisabled();
    ReimbursementPage.lastReimbursmentName.should(
      "have.text",
      testData.ReimbursementTypes.Miscellaneous
    );
    ReimbursementPage.lastInvoiceNo.should("have.text", invoiceNumber);
    ReimbursementPage.lastRowActionLbl.should(
      "have.text",
      testData.ReimbursementAction.Withdraw
    );
    ReimbursementPage.lastRequestStatus.should(
      "have.text",
      testData.ReimbursementStatus.PendingAdmin
    );
  });

  it("HRMIS_7: Verify reset all fields to default values", () => {
    // login to Application

    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");
    ReimbursementPage.clickOnReimbursemetnReq();
    // Fill out the form fields
    ReimbursementPage.select_reimbursementType(
      testData.ReimbursementTypes.Miscellaneous
    );
    ReimbursementPage.select_InvoiceDate(
      testData.ReimbursementDates.InvoiceDate
    );
    const invoiceNumber = generateRandomNumber(10);
    ReimbursementPage.enter_InvoiceNo(invoiceNumber);
    ReimbursementPage.select_FromDate(testData.ReimbursementDates.FromDate);
    ReimbursementPage.select_ToDate(testData.ReimbursementDates.ToDate);
    ReimbursementPage.chooseDocument("cypress/fixtures/resources/dummy.pdf");
    ReimbursementPage.enter_reimbursementAmount("76000");
    ReimbursementPage.enter_Comment("Commented");

    ReimbursementPage.reset_Btn.click();

    ReimbursementPage.reimbursementType_Drp.should("have.value", "");
    ReimbursementPage.invoiceNo_Txt.should("have.value", "");
    ReimbursementPage.invoiceDate.should("have.value", "");
    ReimbursementPage.fromDate.should("have.value", "");
    ReimbursementPage.toDate.should("have.value", "");
    ReimbursementPage.chooseFile.should("have.value", "");
    ReimbursementPage.reimbursementAmount_Txt.should("have.value", "");
    ReimbursementPage.comment_Txt.should("have.value", "");
  });

  it("HRMIS_8: Verify Reimbursement Withdraw Button pop up", () => {
    // login to Application

    sideBar.navigateTo("My Reimbursements", "Reimbursement Requests");
    ReimbursementPage.clickNextUntilDisabled();
    ReimbursementPage.clickOnWithDrawAction();
    ReimbursementPage.withDrawReimbursementLbl
      .should("be.visible")
      .and("have.text", "Withdraw Reimbursement");

    // Cancel Button
    ReimbursementPage.clickOn_cancelBtn();
    ReimbursementPage.withDrawReimbursementLbl.should("not.be.visible");

    ReimbursementPage.clickOnWithDrawAction();

    // cross button
    ReimbursementPage.clickOn_CrossIconBtn();
    ReimbursementPage.withDrawReimbursementLbl.should("not.be.visible");
  });
});
