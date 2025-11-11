import sideBar from "../components/SideBar";
import DesignationPage from "../pages/DesignationPage";
import { generateRandomString } from "../../support/utils";

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

describe("Setting Designation Tests", () => {
  it("HRMIS_EM_86: Verify Designation tab", () => {
    // login to Application

    sideBar.navigateTo("Employee Management", "Designations");
    DesignationPage.designationHeader.invoke("text").then((text) => {
      expect(text.trim()).to.equal("Designations");
    });
  });

  it("HRMIS_EM_87: Verify Add Designation button and designations appears", () => {
    // login to Application

    sideBar.navigateTo("Employee Management", "Designations");
    cy.wait(1000);
    DesignationPage.select_Department(testData.Departments.Genric);
    DesignationPage.addDesignationBtn
      .should("be.visible")
      .and("have.text", "+ Add Designation");
    // DesignationPage.assertDesignations(testData.Designations.Genric);
  });

  it("HRMIS_EM_88, HRMIS_EM_89: Verify Update Designation Pop up open and close", () => {
    // login to Application

    sideBar.navigateTo("Employee Management", "Designations");
    cy.wait(1000);
    DesignationPage.select_Department(testData.Departments.Genric);

    DesignationPage.clickOnLastEditBtn();
    DesignationPage.addUpdateDesignationHeader
      .should("be.visible")
      .and("have.text", "Update  Designation");

    //cancel button functionality
    DesignationPage.clickOnCancelBtn();
    DesignationPage.addUpdateDesignationHeader.should("not.be.visible");

    DesignationPage.clickOnLastEditBtn();
    // cross button functionality
    DesignationPage.clickOnCrossIcon();
    DesignationPage.addUpdateDesignationHeader.should("not.be.visible");
  });

  it("HRMIS_EM_92: Verify Update designation", () => {
    // login to Application

    const DesignationName = "Designation Updated " + generateRandomString(5);
    expect(DesignationName.length).to.be.at.least(21);
    sideBar.navigateTo("Employee Management", "Designations");
    cy.wait(1000);
    DesignationPage.select_Department(testData.Departments.Genric);
    DesignationPage.clickOnLastEditBtn();

    // validation messages verification
    DesignationPage.designationNameTxt.clear();
    DesignationPage.clickOnSubmit();
    DesignationPage.assertValidation(
      DesignationPage.designationNameTxt,
      "Please fill out this field."
    );
    DesignationPage.enterDesignationName(DesignationName);
    DesignationPage.clickOnSubmit();
    cy.validateSuccessMessages("Designation updated successfully");
    DesignationPage.lastDesignationName.should("have.text", DesignationName);
  });

  it("HRMIS_5: Clean up for Designation", () => {
    // login to Application

    const DesignationName = "Designation Updated " + generateRandomString(5);

    sideBar.navigateTo("Employee Management", "Designations");
    cy.wait(1000);
    DesignationPage.select_Department(testData.Departments.Genric);
    DesignationPage.clickOnLastEditBtn();

    // validation messages verification
    DesignationPage.designationNameTxt.clear();
    DesignationPage.clickOnSubmit();
    DesignationPage.assertValidation(
      DesignationPage.designationNameTxt,
      "Please fill out this field."
    );
    //const lastItem = genericDesignations[genericDesignations.length - 1];

    DesignationPage.enterDesignationName(DesignationName);
    DesignationPage.clickOnSubmit();
    cy.validateSuccessMessages("Designation updated successfully");
    // DesignationPage.lastDesignationName.should("have.text", lastItem);
  });

  it("HRMIS_EM_93, HRMIS_EM_94: Verify Add designation , Cancel and cross button", () => {
    // login to Application

    sideBar.navigateTo("Employee Management", "Designations");
    cy.wait(1000);
    DesignationPage.select_Department(testData.Departments.Genric);
    DesignationPage.clickOnAddDesingation();
    DesignationPage.addUpdateDesignationHeader
      .should("be.visible")
      .and("have.text", "Add  Designation");

    // cancel button functionality
    DesignationPage.clickOnCancelBtn();
    DesignationPage.addUpdateDesignationHeader.should("not.be.visible");

    DesignationPage.clickOnAddDesingation();
    // cross button functionality
    DesignationPage.clickOnCrossIcon();
    DesignationPage.addUpdateDesignationHeader.should("not.be.visible");
  });

  it("HRMIS_7: Verify validation messages on Add Designation pop up", () => {
    // login to Application

    sideBar.navigateTo("Employee Management", "Designations");
    cy.wait(1000);
    DesignationPage.select_Department(testData.Departments.Genric);
    DesignationPage.clickOnAddDesingation();
    DesignationPage.addUpdateDesignationHeader
      .should("be.visible")
      .and("have.text", "Add  Designation");

    DesignationPage.clickOnSubmit();
    DesignationPage.assertValidation(
      DesignationPage.designationNameTxt,
      "Please fill out this field."
    );
  });

  it("HRMIS_EM_97: Verify new designation added on clicking submit button", () => {
    // login to Application

    const DesignationName = "Desination Auto " + generateRandomString(5);
    expect(DesignationName.length).to.be.at.least(21);
    sideBar.navigateTo("Employee Management", "Designations");
    cy.wait(1000);
    DesignationPage.select_Department(testData.Departments.AutomationTesting);

    DesignationPage.clickOnAddDesingation();
    DesignationPage.enterDesignationName(DesignationName);
    DesignationPage.clickOnSubmit();
    cy.validateSuccessMessages("Designation created successfully");
    DesignationPage.lastDesignationName.should("have.text", DesignationName);
  });
});
