import sideBar from "../components/SideBar";
import MyAttendance from "../pages/MyAttendance";
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

describe("My Attendance", () => {
  it("HRMIS_A&L_59: Navigating to Attendance & Leaves Page", () => {
    sideBar.navigateTo("Attendance & Leaves", "My Attendance");
    MyAttendance.myAttendanceHeaderTxt();
  });

  it("HRMIS_2: Verify previous month calendar and next month calendar appear after clicking on Backward and Forward Icons respectively ", () => {
    const now = new Date();
    const currentMonth = now.toLocaleString("default", { month: "long" }); // Get the full month name
    const currentYear = now.getFullYear(); // Get the full year

    const { currentMonthOutput, previousMonthOutput } =
      PunchDeatilsPage.getPreviousMonthAndYear(currentMonth, currentYear);
    cy.log(currentMonthOutput); // October 2024
    cy.log(previousMonthOutput); // September 2024

    cy.wait(2000);
    sideBar.navigateTo("Attendance & Leaves", "My Attendance");
    MyAttendance.backwordIcon.click();

    MyAttendance.calendarDate
      .should("be.visible")
      .and("have.text", previousMonthOutput);

    MyAttendance.forwordIcon.click();
    MyAttendance.calendarDate
      .should("be.visible")
      .and("have.text", currentMonthOutput);
    cy.wait(2000);

    MyAttendance.forwordButton();
  });
  it("HRMIS_3: Attendence Details pop up close and open", () => {
    sideBar.navigateTo("Attendance & Leaves", "My Attendance");

    MyAttendance.clickOnDate();
    MyAttendance.attendenceDetailHeader
      .should("be.visible")
      .and("have.text", "Attendance Detail");

    MyAttendance.clickOnCloseBtn();
    MyAttendance.attendenceDetailHeader.should("not.be.visible");

    MyAttendance.clickOnDate();
    MyAttendance.clickOnCrossBtn();
    MyAttendance.attendenceDetailHeader.should("not.be.visible");
  });
});
