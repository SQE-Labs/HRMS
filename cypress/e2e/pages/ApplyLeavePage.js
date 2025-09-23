import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import "cypress-xpath";

class ApplyLeavePage extends BasePage {
  //Locators
  get applyLeaveHeader() {
    return cy.get('div>h1')
    .should("be.visible").and("have.text", "Apply Leaves");
  }
  get idColSortIcon() {
    return cy.get("tr th:nth-child(1)");
  }
  get fromColSortIcon() {
    return cy.get("thead > tr > :nth-child(2)");
  }
  get toColSortIcon() {
    return cy.get("thead > tr > :nth-child(3)");
  }
  get typeColSortIcon() {
    return cy.get("thead > tr > :nth-child(4)");
  }
  get reasonColSortIcon() {
    return cy.get("thead > tr > :nth-child(5)");
  }
  get leaveCountColSortIcon() {
    return cy.get("thead > tr > :nth-child(6)");
  }
  get statusColSortIcon() {
    return cy.get("thead > tr > :nth-child(7)");
  }
  get applyLeaveBtn() {
    return cy.get(".export");
  }
  get applyLeaveHeader() {
    return cy.xpath("//h5[text()='Apply Leave']");
  }
  get leaveType() {
    return cy.get("#leave_type_list");
  }
  get crossBtn() {
    return cy.xpath(
      "//h5[text()='Apply Leave']/following-sibling::button[@class='btn-close']"
    );
  }
  get cancelButton() {
    return cy.xpath(
      "//h5[text()='Apply Leave']/../following-sibling::div/button[text()='Cancel']"
    );
  }
  get conformationMess() {
    return cy.xpath("//h5[contains(text(),'Are you sure you')]");
  }
  get yesButton() {
    return cy.xpath(
      "//h5[contains(text(),'Are you sure you')]/../following-sibling::div//button[text()='Yes']"
    );
  }
  get noButton() {
    return cy.xpath(
      "//h5[contains(text(),'Are you sure you')]/../following-sibling::div//button[text()='No']"
    );
  }
  get reasonField() {
    return cy.get("#reasonOfLeave");
  }
  get submitButton() {
    return cy.xpath(
      "//h5[text()='Apply Leave']/../following-sibling::div/button[text()='Submit']"
    );
  }
  get succ_Msg() {
    return cy.xpath("//div[contains(text(),'Leave Applied Successfully!')]");
  }
  get withdrawLink() {
    return cy.get("td > a");
  }
  get withdrawHeader() {
    return cy.xpath("//h5[text()='Withdraw Leave Request']");
  }
  get reasomMsg() {
    return cy.xpath("//textarea[@name='reason']");
  }
  get submitBtn() {
    return cy.xpath(
      "//h5[text()='Withdraw Leave Request']/../following-sibling::div/button[text()='Submit']"
    );
  }
  get validationMessage() {
    return cy.xpath("//small[contains(text(),'Reason must')]");
  }
  get succ_Msg() {
    return cy.xpath("//div[text()='Leave Withdrawn Successfully']");
  }
  gridDataList(col) {
    return `tr td:nth-child(${col})`;
  }
  gridSingleData(col) {
    return `tbody tr:nth-child(1) td:nth-child(${col})`;
  }

  // Method

  clickOnIdCol() {
    this.idColSortIcon.click();
  }

  ClickOnfromCol() {
    this.fromColSortIcon.click();
  }

  clickOnToCol() {
    this.toColSortIcon.click();
  }

  clickOnTypeCol() {
    this.typeColSortIcon.click();
  }

  clickOnReasonCol() {
    this.reasonColSortIcon.click();
  }

  clickOnLeaveCountCol() {
    this.leaveCountColSortIcon.click();
  }

  clickOnStatusCol() {
    this.statusColSortIcon.click();
  }

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

  clickNext() {
    cy.get("ul.pagination li")
      .contains("Next")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
        }
      });
  }

  clickPrevious() {
    cy.get("ul.pagination li")
      .contains("Previous")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
        }
      });
  }
  clickOnApplyLeaveBtn() {
    this.applyLeaveBtn.click();
  }
  validateApplyLeaveHeader() {
    this.applyLeaveHeader.should("have.text", "Apply Leave");
  }
  selectLeaveType(LeaveType) {
    cy.selectDrpValueByText(this.leaveType, LeaveType, false, this.leaveType);
  }
  clickOnCrossBtn() {
    this.crossBtn.click();
  }
  clickOnCancelButton() {
    this.cancelButton.click();
  }
  assertConfMess() {
    this.conformationMess.should("contain.text", "Are you sure you");
  }
  clickOnYesBtn() {
    this.yesButton.click();
  }
  clickOnNoBtn() {
    this.noButton.click();
  }
  selectcurrentandFutureDate() {
    const dayjs = require("dayjs"); // Use dayjs for date manipulation.

    const today = dayjs();
    const future = today.add(2, "day");

    const todayDate = today.format("D").padStart(2, "0");
    const futureDate = future.format("D").padStart(2, "0");

    cy.get(".react-datepicker__input-container > input").click();

    // Select today's date
    cy.get(`.react-datepicker__day--0${todayDate}`)
      .not(".react-datepicker__day--outside-month")
      .click();

    // Reopen calendar
    cy.get(".react-datepicker__input-container > input").click();

    // Go to next month if needed
    if (today.month() !== future.month()) {
      cy.get(".react-datepicker__navigation--next").click();
    }

    // Select future date
    cy.get(`.react-datepicker__day--0${futureDate}`)
      .not(".react-datepicker__day--outside-month")
      .click();
  }
  enterReasonInApplyLeave(reasonEnter) {
    this.reasonField.type(reasonEnter);
  }
  clickOnSubmitBtn() {
    this.submitButton.click();
  }
  assertLeaveSucc_Msg() {
    this.succ_Msg.should("contain.text", "Leave Applied Successfully!");
  }
  clickOnWithdrawLink() {
    this.withdrawLink.click();
  }
  assertWithdrawHeader() {
    this.withdrawHeader.should("have.text", "Withdraw Leave Request");
  }
  enterReason(ReasonMsg) {
    this.reasomMsg.should("be.visible").type(ReasonMsg);
  }
  assertValidationMsg() {
    cy.get("textarea[name='reason']").then(($el) => {
      expect($el[0].validationMessage).to.eq("Please fill out this field.");
    });
  }
  assertVal_Msg() {
    cy.get("#leave_type_list").then(($el) => {
      expect($el[0].validationMessage).to.eq(
        "Please select an item in the list."
      );
    });
  }
  assertDatePicker_Msg() {
    cy.get(".react-datepicker__input-container > .border").then(($el) => {
      expect($el[0].validationMessage).to.eq("Please fill out this field.");
    });
  }
  assertReason_Msg() {
    cy.get("#reasonOfLeave").then(($el) => {
      expect($el[0].validationMessage).to.eq("Please fill out this field.");
    });
  }

  clickOnSubBtn() {
    this.submitBtn.click();
  }
  assertMessage() {
    this.validationMessage.should("contain.text", "Reason must be");
  }
  assertSucc_Msg() {
    this.succ_Msg.should("contain.text", "Leave Withdrawn Successfully");
  }
}

export default new ApplyLeavePage();
