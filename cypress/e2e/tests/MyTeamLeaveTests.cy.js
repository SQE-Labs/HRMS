import sideBar from "../components/SideBar";
import MyTeamLeavePage from "../pages/MyTeamLeavePage";

describe("My Team Leave page", () => {
  it("Verify that 'Attendance & Leaves' tab expands, when user clicks on 'Attendance & Leaves'.", () => {
    cy.login("superUser");

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.headerTxt();
    //MyTeamLeavePage.clickStatusDropdown();
    MyTeamLeavePage.selectStatus("Rejected");
  });

  //Export button is not working.

  it.skip("Verify that excel file gets downloaded, after clicking on 'Export' button", () => {
    cy.login("LeaveManager");
    MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnExportBtn();
  });

  it("Verify that 'Leave Approval' pop up opens up, after clicking on 'View' link", () => {
    cy.login("LeaveManager");
    MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
  });
  it("Verify that validation message appears, after clicking on 'Submit' button when user leaves all the fields blank", () => {
    cy.login("LeaveManager");
    MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
    MyTeamLeavePage.applyLeaveHeader();
    MyTeamLeavePage.clickOnSubmitButton();
    // cy.get(".tooltip-class").should(
    //   "contain.text",
    //   "Please select an item in the list."
    // );
  });
  it("Verify that 'Leave Approval' pop up opens up, after clicking on 'View' link", () => {
    cy.login("LeaveManager");
    MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
    MyTeamLeavePage.selectAction("Approve");
    MyTeamLeavePage.enterReasonText("Testing Done");
    MyTeamLeavePage.clickOnSubmitButton();
  });
});
