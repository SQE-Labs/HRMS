import sideBar from "../components/SideBar";
import PromoteEmployeePage from "../pages/PromoteEmployeePage";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  // login to Application
  cy.login("superUser");
  sideBar.navigateTo("Employee Management", "Promote Employee");
  cy.wait(1000);
});

describe("Employee Managment Promote Employee Tests", () => {
  it("HRMIS_1: Verify Promote Open when user click on Promote Employee Subtab under Employee Managment", () => {
    const expectedTexts = [
      "Employee Id",
      "Name",
      "Department",
      "Designation",
      "Action",
    ];
    PromoteEmployeePage.assertTextEquals(
      PromoteEmployeePage.promoteEmployeeLbl,
      "Promote Employee"
    );
    cy.wait(1000);
    PromoteEmployeePage.selectEmployee(testData.EmployeeName);
    PromoteEmployeePage.assertExpectedTableLbl(expectedTexts);
  });

  it("HRMIS_2: Verify Promot pop up open and close when user click on Promot and Cancel button", () => {
    cy.wait(1000);
    PromoteEmployeePage.selectEmployee(testData.EmployeeName);
    PromoteEmployeePage.clickOnPromote();
    PromoteEmployeePage.promotePopHeaderLbl.should(
      "have.text",
      "Promote Employee"
    );
    PromoteEmployeePage.clickOnCancel();
    PromoteEmployeePage.promotePopHeaderLbl.should("not.be.visible");

    // Verify Crosse Icon on Pop up
    PromoteEmployeePage.clickOnPromote();
    PromoteEmployeePage.clickOnCrossIcon();
    PromoteEmployeePage.promotePopHeaderLbl.should("not.be.visible");
  });

  it("HRMIS_3: Verify Validation message appears after clicking on submit button when no department or designation is selected", () => {
    cy.wait(1000);
    PromoteEmployeePage.selectEmployee(testData.EmployeeName);
    PromoteEmployeePage.clickOnPromote();
    PromoteEmployeePage.promotePopHeaderLbl.should(
      "have.text",
      "Promote Employee"
    );

    // Clear the pre-selected value
    PromoteEmployeePage.selectDepartment("Select Department");
    PromoteEmployeePage.selectDesignation("Select Designation");

    // When no department is selected.
    PromoteEmployeePage.clickOnSubmitBtn();
    PromoteEmployeePage.assertDepartmentValidation(
      "Please select an item in the list."
    );

    // select department
    PromoteEmployeePage.selectDepartment("GENRIC");

    // when no designation is selected.
    PromoteEmployeePage.clickOnSubmitBtn();
    cy.wait(1000);
    PromoteEmployeePage.assertDesignationValidation(
      "Please select an item in the list."
    );
  });

  it("HRMIS_4: Verify options list of Desgination associated to Department", () => {
    cy.wait(1000);
    PromoteEmployeePage.selectEmployee(testData.EmployeeName);
    PromoteEmployeePage.clickOnPromote();
    PromoteEmployeePage.promotePopHeaderLbl.should(
      "have.text",
      "Promote Employee"
    );
    PromoteEmployeePage.selectDepartment("GENRIC");
    PromoteEmployeePage.assertOptionTexts(testData.Designations.Options);
  });
});
