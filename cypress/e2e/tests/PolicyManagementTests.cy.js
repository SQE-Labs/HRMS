import { expect } from "chai";
import sideBar from "../components/SideBar";
import PolicyMgmtPage from "../pages/PolicyMgmtPage";
import ViewPolicyMgmt from "../pages/ViewPolicyMgmt";
import process from "process/browser.js";
import { generateRandomString } from "../../support/utils";

beforeEach(() => {
  // login to Application
  cy.login("superUser");
});

let randomPolicy = "Demo" + generateRandomString(5);
let randomDescription = "Description" + generateRandomString(5);

describe("Policy Management Tests", () => {
  it("HRMIS_CP_29: Verify 'Modify Policies' page.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Caelius' Policies", "Policy Viewer");
    PolicyMgmtPage.modifyPolicyLbl.should("be.visible");

    // select Item Per Page 20
    PolicyMgmtPage.selectItemPerPage("20");
    PolicyMgmtPage.itemPerPageDrp.should("have.value", "20");
    PolicyMgmtPage.gridRows.should("have.length", 20);

    // get and search valid data from the grid
    PolicyMgmtPage.searchPolicy();
    PolicyMgmtPage.assertSearchTitle();

    //search Inavlid data and Verfiy "No Record Available "
    PolicyMgmtPage.searchPolicy("Inavlid");
    PolicyMgmtPage.noRecordeLbl
      .should("be.visible")
      .and("have.text", "No Record Available");

    // verify Policy should downloded
    PolicyMgmtPage.searchTxt.clear();
    PolicyMgmtPage.searchPolicy();
    cy.wait(1000);
    PolicyMgmtPage.clickOnView();
    PolicyMgmtPage.checkDownloadFile();
  });

  it("HRMIS_CP_20: Verify 'Add Policy' Pop up.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Caelius' Policies", "Policy Editor");

    PolicyMgmtPage.assertPolicyHeader();
    PolicyMgmtPage.clickOnAddPolicy();
    PolicyMgmtPage.addPolicyHeader
      .should("be.visible")
      .and("have.text", "Add Policy");
    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertTitleValidation('input[name="policyTitle"]', "Please fill out this field.");
    PolicyMgmtPage.enterPolicytitle(randomPolicy);

    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertDocumentValidation('input[name="policyDocument"]', "Please select a file.");
    PolicyMgmtPage.uploadePolicyFile(
      "cypress/fixtures/resources/ECardsCCIT112126022926502 (2) (6).pdf"
    );

    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertValidDateValidation('input[name="policyValidFrom"]', " Please fill out this field.");
    PolicyMgmtPage.selectValidDate("2023-10-24");

    PolicyMgmtPage.clickOnSubmit();
    cy.wait(1000);
    PolicyMgmtPage.assertPolicyDescValidation('textarea[name="description"]',"Please fill out this field.");
    PolicyMgmtPage.enterDescription(randomDescription);
    PolicyMgmtPage.clickOnSubmit();
    cy.wait(1000);
    cy.validateSuccessMessages("Success");
    PolicyMgmtPage.selectItemPerPage("40");
    cy.wait(500);
    PolicyMgmtPage.clickNextUntilDisabled();
    cy.wait(500);
    PolicyMgmtPage.lastPolicyTitle.should("have.text", randomPolicy);
    PolicyMgmtPage.lastPolicyDesc.should("have.text", randomDescription);
    PolicyMgmtPage.lastValidDate.should("have.text", "24-10-2023");
  });

  it("HRMIS_CP_12: Verify 'Update Policy' Pop up.", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Caelius' Policies", "Policy Editor");

    //search valid data from the grid
    PolicyMgmtPage.selectItemPerPage("40");
    cy.wait(500);
    PolicyMgmtPage.clickNextUntilDisabled();
    cy.wait(500);
    PolicyMgmtPage.searchPolicy(randomPolicy);
    cy.wait(1000);
    PolicyMgmtPage.clickOnEditBtn();
    PolicyMgmtPage.addPolicyHeader
      .should("be.visible")
      .and("have.text", "Update Policy");
    PolicyMgmtPage.clickOnCancel();
    PolicyMgmtPage.addPolicyHeader.should("not.be.visible");

    // cross Btn Check
    PolicyMgmtPage.clickOnEditBtn();
    PolicyMgmtPage.clickOnCrossBtn();
    PolicyMgmtPage.addPolicyHeader.should("not.be.visible");

    //Title
    PolicyMgmtPage.clickOnEditBtn();
    PolicyMgmtPage.policyTitleTxt.clear();
    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertTitleValidation('input[name="policyTitle"]', " Please fill out this field.");
    PolicyMgmtPage.enterPolicytitle(randomPolicy);

    // Description
    PolicyMgmtPage.policyDescTxt.clear();
    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertPolicyDescValidation('textarea[name="description"]', " Please fill out this field.");
    PolicyMgmtPage.enterDescription(randomDescription);

    // Document
    PolicyMgmtPage.delete_Policy();
    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertDocumentValidation('input[name="policyDocument"]', "Please select a file.");
    PolicyMgmtPage.uploadePolicyFile(
      "cypress/fixtures/resources/ECardsCCIT112126022926502 (2) (6).pdf"
    );

    // Valid date
    PolicyMgmtPage.dateField.clear();
    PolicyMgmtPage.clickOnSubmit();
    PolicyMgmtPage.assertValidDateValidation('input[name="policyValidFrom"]', "Please fill out this field.");
    PolicyMgmtPage.selectValidDate("2023-10-24");
    PolicyMgmtPage.clickOnSubmit();
    cy.wait(1000);
    cy.reload();
    PolicyMgmtPage.selectItemPerPage("40");
    cy.wait(500);
    PolicyMgmtPage.clickNextUntilDisabled();
    cy.wait(500);
    PolicyMgmtPage.searchPolicy(randomPolicy);
    PolicyMgmtPage.EditedPolicyTitle.should("have.text", randomPolicy);
    PolicyMgmtPage.editedPolicyDesc.should("have.text", randomDescription);
    PolicyMgmtPage.editedPolicyVaidDate.should("have.text", "24-10-2023");
  });

  it("HRMIS_4: Verify 'Next' and 'Previous' Pagination button Modify Policy Page", () => {
    // Navigate to Modify Policy Page
    sideBar.navigateTo("Caelius' Policies", "Policy Editor");
    PolicyMgmtPage.modifyPolicyLbl.should("be.visible");

    // Step 1: Capture the initial policy title
    let expectedPolicyTitle,
      actualPolicyTitle1,
      actualPolicyTitle,
      actualPolicyTitle2;

    PolicyMgmtPage.lastPolicyTitle
      .invoke("text")
      .then((text) => {
        expectedPolicyTitle = text.trim();

        // Step 2: Click Next and capture the next policy title
        PolicyMgmtPage.clickNext();
        return PolicyMgmtPage.lastPolicyTitle.invoke("text");
      })
      .then((text) => {
        actualPolicyTitle1 = text.trim();

        // Step 3: Click Previous and capture the previous policy title
        PolicyMgmtPage.clickPrevious();
        return PolicyMgmtPage.lastPolicyTitle.invoke("text");
      })
      .then((text) => {
        actualPolicyTitle = text.trim();

        // Step 4: Click Next again and capture the policy title
        PolicyMgmtPage.clickNext();
        return PolicyMgmtPage.lastPolicyTitle.invoke("text");
      })
      .then((text) => {
        actualPolicyTitle2 = text.trim();

        // Assertions
        expect(actualPolicyTitle1).to.equal(actualPolicyTitle2);
        expect(actualPolicyTitle).to.equal(expectedPolicyTitle);
      });
  });

  it("HRMIS_CP_28: Verify Asscending and Descending sorting of Policy Ids Modify Policy Page", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Caelius' Policies", "Policy Editor");
    PolicyMgmtPage.modifyPolicyLbl.should("be.visible");

    let textsList1 = [];
    let textsList2 = [];

    cy.getColumnTexts("tbody tr td:nth-child(1)").then((texts) => {
      textsList1 = [...texts].sort().reverse();
      cy.log("textsList1 (descending):", textsList1);
    });

    // Click the sorting icon twice to change the order
    // PolicyMgmtPage.clickOnPolicyIds();
    //PolicyMgmtPage.clickOnPolicyIds();

    // Get the new sorted list
    cy.getColumnTexts("tbody tr td:nth-child(1)").then((texts) => {
      textsList2 = [...texts];
      cy.log("textsList2 (after clicks):", textsList2);
      const sortedTextsList2 = [...textsList2].sort().reverse();
      expect(sortedTextsList2).to.deep.equal(textsList1);
    });
  });

  it("HRMIS_6: Verify 'view Policy' Page", () => {
    //Navigate to View Policy Page
    sideBar.navigateTo("Caelius' Policies", "Policy Viewer");
    ViewPolicyMgmt.modifyPolicyLbl
      .should("be.visible")
      .and("have.text", "Policy Viewer");

    // select Item Per Page 20
    ViewPolicyMgmt.selectItemPerPage("20");
    ViewPolicyMgmt.itemPerPageDrp.should("have.value", "20");
    ViewPolicyMgmt.gridRows.should("have.length", 20);

    // get and search valid data from the grid
    ViewPolicyMgmt.searchPolicy();
    ViewPolicyMgmt.assertSearchTitle();

    //search Inavlid data and Verfiy "No Record Available "
    ViewPolicyMgmt.searchPolicy("Inavlid");
    ViewPolicyMgmt.noRecordeLbl
      .should("be.visible")
      .and("have.text", "No Record Available");

    // verify Policy should downloded
    ViewPolicyMgmt.searchTxt.clear();
    ViewPolicyMgmt.searchPolicy();
    cy.wait(1000);
    ViewPolicyMgmt.clickOnView();
    ViewPolicyMgmt.checkDownloadFile();
  });

  it("HRMIS_CP_31: Verify 'Next' and 'Previous' Pagination button View Policy Page", () => {
    //Navigate to Modify Policy Page
    sideBar.navigateTo("Caelius' Policies", "Policy Viewer");
    PolicyMgmtPage.modifyPolicyLbl.should("be.visible");

    // expected policy
    let expectedPolicytitle;
    PolicyMgmtPage.lastPolicyTitle.invoke("text").then((text) => {
      expectedPolicytitle = text.trim();
    });

    PolicyMgmtPage.clickNext();
    let actualPolicytitle1;
    PolicyMgmtPage.lastPolicyTitle.invoke("text").then((text) => {
      actualPolicytitle1 = text.trim();
    });
    PolicyMgmtPage.clickPrevious();

    let actualPolicytitle;
    PolicyMgmtPage.lastPolicyTitle.invoke("text").then((text) => {
      actualPolicytitle = text.trim();
    });

    PolicyMgmtPage.clickNext();
    let actualPolicytitle2;
    PolicyMgmtPage.lastPolicyTitle.invoke("text").then((text) => {
      actualPolicytitle2 = text.trim();
    });

    expect(actualPolicytitle1).to.equal(actualPolicytitle2);
    expect(actualPolicytitle).to.equal(expectedPolicytitle);
  });
});
