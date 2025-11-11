import sideBar from "../components/SideBar";
import EmployeelistPage from "../pages/EmployeeListPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";
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

describe("Employee Asset Managment Tests", () => {
  it("HRMIS_EM_24: Verify Assets tab", () => {
    // login to Application

    sideBar.navigateTo("Employee Management", "Employee Directory");
    EmployeelistPage.enterNameIntoSearchField(testData.EmployeeName);
    EmployeelistPage.clickOnUserCard(testData.EmployeeName);
    EmployeeProfilePage.clickOnAssetTab();
    EmployeeProfilePage.refershbutton.should("be.visible");
    EmployeeProfilePage.noRecordInfo.should(
      "have.text",
      "No records available"
    );
  });
});
