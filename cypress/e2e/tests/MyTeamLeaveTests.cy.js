import sideBar from "../components/SideBar";
import MyTeamLeavePage from "../pages/MyTeamLeavePage";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  // login to Application
  cy.login("superUser1");
});

describe("My Team Leave page", () => {
  it("Verify that 'Attendance & Leaves' tab expands, when user clicks on 'Attendance & Leaves'.", () => {
    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.headerTxt();
    //MyTeamLeavePage.clickStatusDropdown();
    MyTeamLeavePage.selectStatus("Rejected");
  });

  //Export button is not working.

  it.skip("Verify that excel file gets downloaded, after clicking on 'Export' button", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnExportBtn();
  });

  it("Verify that 'Leave Approval' pop up opens up, after clicking on 'View' link", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
  });
  it("Verify that validation message appears, after clicking on 'Submit' button when user leaves all the fields blank", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
    MyTeamLeavePage.applyLeaveHeader();
    MyTeamLeavePage.clickOnSubmitButton();
    MyTeamLeavePage.assertVal_MsgItem();
    MyTeamLeavePage.selectAction("Approve");
    MyTeamLeavePage.clickOnSubmitButton();
    MyTeamLeavePage.assertValidationMsgField(); 
    
  });
  it("Verify that 'Leave Approval' pop up opens up, after clicking on 'View' link", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
    MyTeamLeavePage.selectAction("Approve");
    MyTeamLeavePage.enterReasonText("Testing Done");
    MyTeamLeavePage.clickOnSubmitButton();
  });
});
