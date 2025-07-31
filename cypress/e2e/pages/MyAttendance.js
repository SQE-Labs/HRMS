import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import "cypress-xpath";

class MyAttendance extends BasePage {
  get myAttendanceHeader() {
    return cy.get("h1");
  }
  get calendarDate() {
    return cy.get("div.calendar_nav h2");
  }
  get backwordIcon() {
    return cy.get("div.calendar_nav span:nth-child(1)");
  }
  get forwordIcon() {
    return cy.get("div.calendar_nav h2 + span");
  }
  get dateBlock() {
    return cy.xpath(
      "(//td[not(@class='weekoff') and not(@class='') and not(@class='empty')])[1]"
    );
  }
  get attendenceDetailHeader() {
    return cy.get("#staticBackdropLabel");
  }
  get crossBtn() {
    return cy.get("#staticBackdropLabel + button");
  }
  get closeBtn() {
    return cy.get("button.theme-button");
  }
  clickOnCloseBtn() {
    this.closeBtn.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(1000);
  }
  myAttendanceHeaderTxt() {
    this.myAttendanceHeader.should("have.text", "My Attendance");
  }
  forwordButton() {
    this.forwordIcon.should("have.class", "disabled-span");
  }
  clickOnDate() {
    this.dateBlock.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(1000);
  }
  clickOnCrossBtn() {
    this.crossBtn.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(1000);
  }
}
export default new MyAttendance();
