import BasePage from "./BasePage";
import { generateRandomYopmail } from "../../support/utils";
import Loaders from "../components/Loaders";
import "cypress-xpath";

class L1ApprovalActionPage extends BasePage {
  //  Locators
  get itemsPerPage() {
    return cy.get("#itemsPerPage");
  }
  get pagenation() {
    return cy.get("li[class='page-item '] a[class='page-link']");
  }
  get searchBox() {
    return cy.get("input[name='search'][type='text']");
  }

  //  Locators for Personal Detail Tab
  get viewButton() {
    return cy.get("tbody tr:nth-child(3) td:nth-child(6)");
  }
  get personalDetailTab() {
    return cy.get("#tab1-tab");
  }
  get firstName() {
    return cy.get("input[name='firstName'][type='text']");
  }
  get lastName() {
    return cy.get("input[name='lastName'][type='text']");
  }
  get personalEmail() {
    return cy.get("input[name='personalEmail'][type='email']");
  }
  get gender() {
    return cy.get("#female");
  }
  get bloodGroup() {
    return cy.get("#bloodGroup");
  }
  get dateOfBirth() {
    return cy.get("input[name='dob']");
  }
  get aadharNumber() {
    return cy.get("input[name='aadharNumber']");
  }
  get panNumber() {
    return cy.get("input[name='panCardNumber']");
  }
  get dateOfJoining() {
    return cy.get("input[name='joiningDate']");
  }
  get maritalStatus() {
    return cy.get("#maritalStatus");
  }

  //  Locators for Contact Details Tab
  get contactDetailTab() {
    return cy.get("#tab2-tab");
  }
  get phoneNumber() {
    return cy.get("input[name='phoneNumber'][type='tel']");
  }
  get alternateNumber() {
    return cy.get("input[name='alternateNumber'][type='tel']");
  }
  get relationshipWithAlternateNo() {
    return cy.get("#relationWithAlternateNo");
  }
  get alternateName() {
    return cy.get("input[name='alternateName'][type='text']");
  }
  get presentAddress() {
    return cy.get("textarea[name='presentAddress']");
  }
  get permanentAddress() {
    return cy.get("textarea[name='permanentAddress']");
  }

  //  Locators for Approve Tab
  get approveTab() {
    return cy.get("#tab3-tab");
  }
  get firstNameOnApproveTab() {
    return cy.get("div[class='row'] h6[class='truncate-text']");
  }
  get lastNameOnApproveTab() {
    return cy.get("div[class='row mt-3'] h6[class='truncate-text']");
  }
  get suggestedPassword() {
    return cy.get(
      "div[id='tab3'] div:nth-child(3) div:nth-child(3) h6:nth-child(1)"
    );
  }
  get caeliusEmail() {
    return cy.get("input[placeholder='Enter employee email']");
  }
  get submitButton() {
    return cy.get("button[type='submit']");
  }
  get nextButton() {
    return cy.xpath("//a[text()='Next']");
  }

  //  Methods
  clickOnNextButton() {
    cy.xpath("//a[text()='Next']").then(($btn) => {
      const isVisible = $btn.is(":visible");
      const isDisabled = $btn.closest("li").hasClass("disabled");

      if (isVisible && !isDisabled) {
        cy.wrap($btn).click({ force: true });
        cy.log("✅ Clicked on Next button");
      } else {
        cy.log("❌ Next button is not clickable or is disabled");
      }
    });
  }

  selectItemsPerPage() {
    this.itemsPerPage.wait(2000).select("40");
    cy.log("Items Index is Changed");
  }

  clickOnViewButtonNewJoinee() {
    this.viewButtonNewJoinee;
    cy.log("Clicked On View Button");
  }

  clickOnPagenationNextButton() {
    this.pagenation.click();
    cy.log("Clicked On Pagination Next Button");
  }

  SearchNewJoineeByName(joineeName) {
    this.searchBox.wait(1000).type(joineeName).should("have.value", joineeName);
    cy.log("Searched New Joinee");
  }

  validateSuccessMessage() {
    cy.contains("User Email has been successfully updated.").should(
      "be.visible"
    );
    cy.log("Success message is displayed");
  }

  // Methods for Personal Detail Tab
  clickOnViewButton() {
    this.viewButton.click();
    cy.log("Clicked On View Button");
  }

  switchToPersonaldetailTab() {
    this.personalDetailTab.click();
    cy.log("Switch To Personal Detail Tab");
  }

  // Methods for Contact Detail Tab
  switchToContactDetailTab() {
    this.contactDetailTab.click();
    cy.log("Switch To Contact Detail Tab");
  }

  // Methods for Approve Tab
  switchToApproveTab() {
    this.approveTab.click();
    cy.log("Switch To Approve Tab");
  }

  enterCaeliusEmail(caeliusEmailTxt) {
    this.caeliusEmail
      .type(caeliusEmailTxt)
      .should("have.value", caeliusEmailTxt);
    cy.log("Caelius Email is Entered");
  }

  clickOnSubmitButton() {
    this.submitButton.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.log("Clicked on Submit Button");
  }

  EmployeesTable = class {
    static get EmployeesTable() {
      return cy.get("table.resume.custom");
    }

    static get getRowsCount() {
      return this.EmployeesTable.find("tbody > tr").its("length");
    }

    static viewApprvalByMailAddress(emailOFEmployee) {
      this.EmployeesTable.find("td[data-title='Email']")
        .contains(emailOFEmployee)
        .parent()
        .find('a[data-bs-toggle="modal"]')
        .click();
    }
  };

  clickNextUntilDisabled() {
    cy.get("ul.pagination li")
      .contains("Next")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
          this.clickNextUntilDisabled();
        }
      });
  }

  searchUserUntilFound(username) {
    const searchOnLastPage = () => {
      // Search on current page
      cy.get(".search > input").clear().type(username);
      cy.wait(1000);

      cy.get("table").then(($table) => {
        if ($table.text().includes(username)) {
          cy.log("✅ User found!");
        } else {
          cy.log("❌ User not found, reloading and retrying...");
          cy.reload();
          cy.wait(2000);
          clickNextUntilDisabled(); // Restart after reload
        }
      });
    };

    const clickNextUntilDisabled = () => {
      const clickNext = () => {
        cy.xpath("//a[text()='Next']").then(($btn) => {
          const isDisabled = $btn.closest("li").hasClass("disabled");

          if (!isDisabled) {
            cy.wrap($btn).click({ force: true });
            cy.wait(1000);
            clickNext(); // Keep clicking next until disabled
          } else {
            cy.log("📄 Reached last page of pagination");
            searchOnLastPage(); // After reaching last page, search
          }
        });
      };

      // Set pagination first
      cy.get("select[id='itemsPerPage']").select("40", { force: true });
      cy.wait(1000);
      cy.log("📄 Pagination set to 40");

      clickNext(); // Begin next navigation
    };

    // 🔄 Start the entire flow
    clickNextUntilDisabled();
  }
}
export default new L1ApprovalActionPage();