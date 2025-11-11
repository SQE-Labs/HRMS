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
  it("HRMIS_A&L_22: Verify that 'Attendance & Leaves' tab expands, when user clicks on 'Attendance & Leaves'.", () => {
    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.headerTxt();
    //MyTeamLeavePage.clickStatusDropdown();
    MyTeamLeavePage.selectStatus("Rejected");
  });

  //Export button is not working.

  it("HRMIS_A&L_25: Verify that excel file gets downloaded, after clicking on 'Export' button, @Bug", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnExportBtn();
  });

  it("HRMIS_A&L_26: Verify that 'Leave Approval' pop up opens up, after clicking on 'View' link", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
  });
  it("HRMIS_A&L_30: Verify that validation message appears, after clicking on 'Submit' button when user leaves all the fields blank", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
    MyTeamLeavePage.applyLeaveHeader();
    MyTeamLeavePage.clickOnSubmitButton();
    MyTeamLeavePage.assertVal_MsgItem("Please select an item in the list.");
    MyTeamLeavePage.selectAction("Approve");
    MyTeamLeavePage.clickOnSubmitButton();
    MyTeamLeavePage.assertValidationMsgField(); 
    
  });
  it("HRMIS_A&L_23: Verify that 'Leave Approval' pop up opens up, after clicking on 'View' link and flow works properly", () => {
    // MyTeamLeavePage.clickOnCrossIcon();

    sideBar.navigateTo("Attendance & Leaves", "My Team Leave");
    MyTeamLeavePage.clickOnViewLink();
    MyTeamLeavePage.selectAction("Approve");
    MyTeamLeavePage.enterReasonText("Testing Done");
    MyTeamLeavePage.clickOnSubmitButton();
  });
});
