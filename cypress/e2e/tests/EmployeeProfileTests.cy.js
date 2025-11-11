import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";

describe("Employee Profile Tests", () => {
  let testData;
  before(function () {
    cy.fixture("data").then((data) => {
      testData = data;
    });
  });

  beforeEach(function () {
    cy.login("superUser");
  });

  it("HRMIS_EM_1, HRMIS_EM_2: Verify that the 'Employee List' page and the User Dashboard load successfully.", () => {
    //Login and Navigate to Employees List Page
    sideBar.navigateTo("Employee Management", "Employee Directory");

    // Validate Title
    EmployeeProfilePage.validateTitle("Employee Directory");

    // Verify that information message, when user enters invalid data in 'Search By Name' field
    EmployeeListPage.enterNameIntoSearchField("invalidName");
    EmployeeListPage.validateNoRecordsAppear("No Record Available");

    // Verify that records get sorted as per the selection of option from the 'Select Department' dropdown field.
    EmployeeProfilePage.selectDept(testData.Department);
    EmployeeProfilePage.totalDeptCards();

    //Verify that records get sorted as per the selection of option from the 'Status' dropdown fields

    EmployeeProfilePage.selectStatusCards(testData.Status);
    EmployeeProfilePage.totalStatusCards();

    // Verify that all records get sorted as per the selection of option from the 'Select Department' & 'Status' dropdown fields.
    EmployeeProfilePage.totalStatusCards();

    // Verify that information message, when user enters valid data in 'Search By Name' field
    EmployeeListPage.enterNameIntoSearchField(testData.Reimbursement);
    EmployeeListPage.getTotalEmployeescount(1);

    //Verify that selected employee card opens up, when user clicks on '<Employee name>' card.
    EmployeeListPage.enterNameIntoSearchField(testData.EmployeeName);
    EmployeeProfilePage.clickOnEmployeeCard(testData.EmployeeName);
  });

  it("HRMIS_EM_8: Verify that the 'Basic Info' accordion expands, and validate the update and close functionalities.", () => {
    // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
    EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
    EmployeeProfilePage.clickOnBasicInfo();
    EmployeeProfilePage.getFieldValue("First Name").should(
      "equal",
      testData.EmployeeData.FirstName
    );
    EmployeeProfilePage.getFieldValue("Middle Name").should(
      "equal",
      testData.EmployeeData.MiddleName
    );
    EmployeeProfilePage.getFieldValue("Last Name").should(
      "equal",
      testData.EmployeeData.LastName
    );
    EmployeeProfilePage.getFieldValue("Employee Id").should(
      "equal",
      testData.EmployeeData.EmployeeID
    );
    EmployeeProfilePage.getFieldValue("Email").should(
      "equal",
      testData.EmployeeData.EmailID
    );

    // Verify that data do not get saved on clicking 'Close' button.
    EmployeeProfilePage.clickOnEditBasicInfoDetails();
    EmployeeProfilePage.updateFirstName("DDinesh");
    EmployeeProfilePage.updateMiddleName("D");
    EmployeeProfilePage.updateLastName("Kumar");
    EmployeeProfilePage.clickOnCloseButton();
    EmployeeProfilePage.getFieldValue("First Name").should(
      "equal",
      testData.EmployeeData.FirstName
    );
    EmployeeProfilePage.getFieldValue("Middle Name").should(
      "equal",
      testData.EmployeeData.MiddleName
    );
    EmployeeProfilePage.getFieldValue("Last Name").should(
      "equal",
      testData.EmployeeData.LastName
    );
    EmployeeProfilePage.getFieldValue("Employee Id").should(
      "equal",
      testData.EmployeeData.EmployeeID
    );
    EmployeeProfilePage.getFieldValue("Email").should(
      "equal",
      testData.EmployeeData.EmailID
    );

    // Verify that data gets saved on clicking 'Update' button.
    EmployeeProfilePage.clickOnEditBasicInfoDetails();
    EmployeeProfilePage.updateFirstName(testData.EmployeeData.FirstName);
    EmployeeProfilePage.updateMiddleName(testData.EmployeeData.MiddleName);
    EmployeeProfilePage.updateLastName(testData.EmployeeData.LastName);
    EmployeeProfilePage.clickOnUpdateButton();
    EmployeeProfilePage.validateSuccessMessage();
    EmployeeProfilePage.getFieldValue("First Name").should(
      "equal",
      testData.EmployeeData.FirstName
    );
    EmployeeProfilePage.getFieldValue("Middle Name").should(
      "equal",
      testData.EmployeeData.MiddleName
    );
    EmployeeProfilePage.getFieldValue("Last Name").should(
      "equal",
      testData.EmployeeData.LastName
    );
    EmployeeProfilePage.getFieldValue("Employee Id").should(
      "equal",
      testData.EmployeeData.EmployeeID
    );
    EmployeeProfilePage.getFieldValue("Email").should(
      "equal",
      testData.EmployeeData.EmailID
    );

    // Verify that 'Basic Info' accordion gets collapsed.
    EmployeeProfilePage.clickOnBasicInfoCollapsed();
    EmployeeProfilePage.validateAccordionCollapsed();
  });

  it("HRMIS_EM_15: Verify that the 'Personal Details' accordion expands and displays correct details.", () => {
  // Navigate to profile and expand Personal Details section
  EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
  EmployeeProfilePage.clickOnPersonalDetails();

  // Validate manually visible values
  EmployeeProfilePage.validatePersonalDetailsSection();
});


  it("HRMIS_EM_11: Verify that the 'Work' accordion expands and displays correct details.", () => {
  // Navigate to employee profile and expand Work section
  EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
  EmployeeProfilePage.clickOnWork();

  // Validate text manually inside Work accordion
  EmployeeProfilePage.validateWorkSectionDetails();
});



  it("HRMIS_EM_18: Verify that the 'Work Experience' accordion expands,validate table columns", () => {
    const expectedTexts = [
      "Job Title",
      "Previous Company",
      "From",
      "To",
      "Description",
    ];
    EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
    EmployeeProfilePage.clickOnWorkExperience();
    EmployeeProfilePage.assertExpectedTableLbl(
      EmployeeProfilePage.workExpColLbl,
      expectedTexts
    );

    EmployeeProfilePage.clickOnWorkExperience();
    EmployeeProfilePage.workExpColLbl.should("not.be.visible");
  });

  it("HRMIS_EM_20: Verify that the 'Education' accordion expands,validate table columns", () => {
    const expectedTexts = ["Degree", "College", "From", "To"];
    EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
    EmployeeProfilePage.clickOnEducationDetail();
    EmployeeProfilePage.assertExpectedTableLbl(
      EmployeeProfilePage.workEduColLbl,
      expectedTexts
    );

    EmployeeProfilePage.clickOnEducationDetail();
    EmployeeProfilePage.workExpColLbl.should("not.be.visible");
  });

  it("HRMIS_EM_22: Verify that the 'Dependents' accordion expands,validate table columns", () => {
    const expectedTexts = [
      "Name",
      "Gender",
      "DOB",
      "Relation",
      "Mobile Number",
    ];
    EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
    EmployeeProfilePage.clickOnEducationDetail();
    EmployeeProfilePage.assertExpectedTableLbl(
      EmployeeProfilePage.workDependentsColLbl,
      expectedTexts
    );

    EmployeeProfilePage.clickOnEducationDetail();
    EmployeeProfilePage.workExpColLbl.should("not.be.visible");
  });
  it("HRMIS_8: Verify that the information message appears for employees with no dependent records, when user clicks on 'Dependents' accordion,", () => {
    // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
    EmployeeListPage.navigateToUserDashboardPage("Taylor Swift");
    EmployeeProfilePage.clickOnWorkExperience();
    EmployeeProfilePage.validateExpSec("No records available");

    //  Verify that the information message appears for employee with no educational records, when user clicks on 'Education' accordion
    EmployeeProfilePage.clickOnEducationDetail();
    EmployeeProfilePage.validateEducationSec("No records available");

    // Verify that the information message appears for employees with no dependent records, when user clicks on 'Dependents' accordion
    EmployeeProfilePage.clickOndependentDetail();
    EmployeeProfilePage.validatedependentSec("No records available");
  });
});
