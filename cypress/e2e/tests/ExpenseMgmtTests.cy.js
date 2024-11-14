import sideBar from "../components/SideBar";
import ReimbursementPage from "../pages/ReimbursementPage";
import { generateRandomString,generateRandomNumber } from '../../support/utils';


let testData;
before(function () {
    cy.fixture('data').then((data) => {
        testData = data;
    });
})


describe("Reimbursement Tests", () => {

    it("HRMIS_1: Verify Reimbursement Page", () => {

        // login to Application
        cy.login();
        sideBar.navigateTo("Expense Management", "Reimbursement");
        ReimbursementPage.assert_SubMenus(testData.ExpenseManagment.SubMenus);

        ReimbursementPage.reimbursementHeader.should('be.visible').and('have.text', 'Reimbursement');
        // get and search valid data from the grid
        ReimbursementPage.search_Reimbursement_Type();
        ReimbursementPage.assert_Search_Reimbursement_Type();

        //search Inavlid data and Verfiy "No Record Available "
        ReimbursementPage.search_Reimbursement_Type("Inavlid");
        ReimbursementPage.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available');


    });

    it("HRMIS_2: Verify Reimbursement Request Button and Back Button", () => {

        // login to Application
        cy.login();
        sideBar.navigateTo("Expense Management", "Reimbursement");

        ReimbursementPage.clickOnReimbursemetnReq();
        ReimbursementPage.reimbursementFormLbl.should('be.visible').and('have.text', 'Reimbursement');
        ReimbursementPage.clickOn_backtoReimbursement_PageBtn();
        ReimbursementPage.reimbursementHeader.should('be.visible').and('have.text', 'Reimbursement');


    });



    it("HRMIS_3: Verify Reimbursement Request ", () => {

        // login to Application
        cy.login();
        sideBar.navigateTo("Expense Management", "Reimbursement");
        ReimbursementPage.clickOnReimbursemetnReq();

        // Assert Reimbursement Input validataion and select the type
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.reimbursementType_Drp, "Please select an item in the list.");
        ReimbursementPage.select_reimbursementType(testData.ReimbursementTypes.InternetClaim);

        // Invoice date validation and select the invoice date
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.invoiceDate, "Please fill out this field.");
        ReimbursementPage.select_InvoiceDate(testData.ReimbursementDates.InvoiceDate);

        // Invoice No validation and Enter the invoice No
        const invoiceNumber = generateRandomNumber(10);
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.invoiceNo_Txt, "Please fill out this field.");
        ReimbursementPage.enter_InvoiceNo(invoiceNumber);

        // Invoice from date validation and Enter the from date 
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.fromDate, "Please fill out this field.");
        ReimbursementPage.select_FromDate(testData.ReimbursementDates.FromDate);

        // Invoice from date validation and Enter the from date 
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.toDate, "Please fill out this field.");
        ReimbursementPage.select_ToDate(testData.ReimbursementDates.ToDate);

        // uploade validation and chosse the document 
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.chooseFile, "Please select a file.");
        ReimbursementPage.chooseDocument('cypress/fixtures/resources/index_001.html');
        cy.validateSuccessMessages(testData.UnsportedFileWarningMessage);
        ReimbursementPage.chooseDocument('cypress/fixtures/resources/dummy.pdf');

        // Amount validation and Enter the amount 
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.reimbursementAmount_Txt, "Please fill out this field.");
        ReimbursementPage.enter_reimbursementAmount("76000");

        // Comment validation and Enter the Comment 
        ReimbursementPage.clickOnSubmit();
        ReimbursementPage.assertValidation(ReimbursementPage.comment_Txt, "Please fill out this field.");
        ReimbursementPage.enter_Comment("Commented");

        ReimbursementPage.clickOnSubmit();
        cy.validateSuccessMessages("Successfully Sent!");
        cy.wait(1000);
        ReimbursementPage.lastReimbursmentName.should('have.text',testData.ReimbursementTypes.InternetClaim)
        ReimbursementPage.lastInvoiceNo.should('have.text',invoiceNumber);
        ReimbursementPage.lastRowActionLbl.should('have.text',testData.ReimbursementAction.Withdraw);
        ReimbursementPage.lastRequestStatus.should('have.text',testData.ReimbursementStatus.PendingAdmin);
    });





});
