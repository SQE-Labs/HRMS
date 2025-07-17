import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class PunchDetailsPage extends BasePage {
  //Locators
  get subMenus() {
    return cy.get("ul.submenu.show li");
  }
  get punchDetailsHeader() {
    return cy.get("h1");
  }
  get selectEmployee_Drp() {
    return cy.get("#react-select-2-input");
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

  // Method

  clickOnCrossBtn() {
    this.crossBtn.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(1000);
  }
  clickOnCloseBtn() {
    this.closeBtn.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(1000);
  }
  clickOnDate() {
    this.dateBlock.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(1000);
  }

  select_Employee(text) {
    cy.selectDrpValueByText(
      this.selectEmployee_Drp,
      text,
      true,
      this.selectEmployee_Drp
    );
  }

  assert_SubMenus(submenus) {
    this.subMenus
      .should("have.length", submenus.length)
      .each((element, index) => {
        expect(element.text().trim()).to.equal(submenus[index]);
      });
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

  getPreviousMonthAndYear(month, year) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Convert month to lowercase and capitalize the first letter for comparison
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    // Get the index of the current month
    let currentMonthIndex = months.indexOf(month);

    if (currentMonthIndex === -1) {
      throw new Error("Invalid month name.");
    }

    // Calculate previous month and year
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    const previousMonthYear = currentMonthIndex === 0 ? year - 1 : year;

    // Format output
    const currentMonthOutput = `${month} ${year}`;
    const previousMonthOutput = `${months[previousMonthIndex]} ${previousMonthYear}`;

    return { currentMonthOutput, previousMonthOutput };
  }
}

export default new PunchDetailsPage();
