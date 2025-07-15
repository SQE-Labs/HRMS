import sideBar from "../components/SideBar";
import PunchDeatilsPage from "../pages/PunchDeatilsPage";

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

describe("Attendence Management Punch Details Tests", () => {
  it("HRMIS_1: Verify Punch Details Page ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Punch Details");
    PunchDeatilsPage.assert_SubMenus(testData.AttendenceManagement.SubMenus);
    PunchDeatilsPage.punchDetailsHeader
      .should("be.visible")
      .and("have.text", "Punch Details");

    // sideBar.navigateTo("Attendance & Leaves");
    // PunchDeatilsPage.subMenus.should("not.exist");
  });

  it("HRMIS_2: Verify that calendar appears, when user selects an option from 'Select Employee' dropdown field, on 'Punch Details' page", () => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    });
    const formattedDate = formatter.format(date);

    cy.wait(2000);
    sideBar.navigateTo("Attendance & Leaves", "Punch Details");
    PunchDeatilsPage.select_Employee("Autom Mation User");
    PunchDeatilsPage.calendarDate
      .should("be.visible")
      .and("have.text", formattedDate);
    PunchDeatilsPage.backwordIcon
      .should("not.have.class", "disabled-span")
      .and("be.visible");
    PunchDeatilsPage.forwordIcon
      .should("have.class", "disabled-span")
      .and("be.visible");
  });

  it("HRMIS_3: Verify previous month calendar and next month calendar appear after clicking on Backward and Forward Icons respectively ", () => {
    const now = new Date();
    const currentMonth = now.toLocaleString("default", { month: "long" }); // Get the full month name
    const currentYear = now.getFullYear(); // Get the full year

    const { currentMonthOutput, previousMonthOutput } =
      PunchDeatilsPage.getPreviousMonthAndYear(currentMonth, currentYear);
    cy.log(currentMonthOutput); // October 2024
    cy.log(previousMonthOutput); // September 2024

    cy.wait(2000);
    sideBar.navigateTo("Attendance & Leaves", "Punch Details");
    PunchDeatilsPage.select_Employee("Autom Mation User");

    PunchDeatilsPage.backwordIcon.click();

    PunchDeatilsPage.calendarDate
      .should("be.visible")
      .and("have.text", previousMonthOutput);

    PunchDeatilsPage.forwordIcon.click();
    PunchDeatilsPage.calendarDate
      .should("be.visible")
      .and("have.text", currentMonthOutput);
  });

  it("HRMIS_4: Attendence Details pop up close and open ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Punch Details");
    PunchDeatilsPage.select_Employee("Autom Mation User");

    PunchDeatilsPage.clickOnDate();
    PunchDeatilsPage.attendenceDetailHeader
      .should("be.visible")
      .and("have.text", "Attendance Detail");

    PunchDeatilsPage.clickOnCloseBtn();
    PunchDeatilsPage.attendenceDetailHeader.should("not.be.visible");

    PunchDeatilsPage.clickOnDate();
    PunchDeatilsPage.clickOnCrossBtn();
    PunchDeatilsPage.attendenceDetailHeader.should("not.be.visible");
  });
});
