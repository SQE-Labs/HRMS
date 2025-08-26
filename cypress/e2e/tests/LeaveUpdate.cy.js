import sideBar from "../components/SideBar";

import LeaveUpdate from "../pages/LeaveUpdate";

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

describe("Leave Update Tests", () => {
  it("'Leave Update' page should open up", () => {
    sideBar.navigateTo("Attendance & Leaves", "Leave Update");
    LeaveUpdate.assertHeader();
    LeaveUpdate.selectEmployee("Vishal DDDD");
    LeaveUpdate.getlistOfLeave();
    LeaveUpdate.clickOnUpdateButton();
    LeaveUpdate.leaveUpdatePopUp();
    LeaveUpdate.clickOnCancelBtn();
    LeaveUpdate.clickOnCrossBtn();
    LeaveUpdate.enterTxtIneachfield();
    LeaveUpdate.clickOnUpdateBtn();
    LeaveUpdate.assertSuccMsg();
  });
});
