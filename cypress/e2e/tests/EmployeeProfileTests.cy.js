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

  it("HRMIS_1: Verify that the 'Employee List' page and the User Dashboard load successfully.", () => {
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

  it("HRMIS_2: Verify that the 'Basic Info' accordion expands, and validate the update and close functionalities.", () => {
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

  it("HRMIS_3: Verify that the 'Personal Details' accordion expands, and validate the update and close functionalities.", () => {
  // Verify that 'Personal Details' accordion expands
  EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
  EmployeeProfilePage.clickOnPersonalDetails();

  // Initial field value assertions
  EmployeeProfilePage.getPersonalFieldValue("Date of Birth").should("equal", testData.EmployeePersonalData.DateOfBirth);
  EmployeeProfilePage.getPersonalFieldValue("Aadhaar Card Number").should("equal", testData.EmployeePersonalData.AdhaarNumber);
  EmployeeProfilePage.getPersonalFieldValue("Passport Number").should("equal", testData.EmployeePersonalData.PassportNumber);
  EmployeeProfilePage.getPersonalFieldValue("PAN Number").should("equal", testData.EmployeePersonalData.PanNumber);
  EmployeeProfilePage.getPersonalFieldValue("Present Address").should("equal", testData.EmployeePersonalData.PresentAddress);
  EmployeeProfilePage.getPersonalFieldValue("Blood Group").should("equal", testData.EmployeePersonalData.BloodGroup);
  EmployeeProfilePage.getPersonalFieldValue("Gender").should("equal", testData.EmployeePersonalData.Gender);
  EmployeeProfilePage.getPersonalFieldValue("Marital Status").should("equal", testData.EmployeePersonalData.MaritalStatus);
  EmployeeProfilePage.getPersonalFieldValue("Alternate Number").should("equal", testData.EmployeePersonalData.AlternateNumber);
  EmployeeProfilePage.getPersonalFieldValue("Permanent Address").should("equal", testData.EmployeePersonalData.PermanentAddress);

  // Verify data does not get saved on clicking 'Close' button
  EmployeeProfilePage.clickOnEditPersonalDetails();
  EmployeeProfilePage.updateDateOfBirth(testData.EmployeePersonalData.UpdatedDateOfBirth);
  EmployeeProfilePage.updateBloodGroup(testData.EmployeePersonalData.BloodGroup2);
  EmployeeProfilePage.updateAdhaarNumber(testData.EmployeePersonalData.AdhaarNumber2);
  EmployeeProfilePage.updateGender(testData.EmployeePersonalData.Gender2);
  EmployeeProfilePage.updatePassportNumber(testData.EmployeePersonalData.PassportNumber2);
  EmployeeProfilePage.updateMaritalStatus(testData.EmployeePersonalData.MaritalStatus2);
  EmployeeProfilePage.updatePanNumber(testData.EmployeePersonalData.PanNumber2);
  EmployeeProfilePage.updateAlternateNumber(testData.EmployeePersonalData.AlternateNumber2);
  EmployeeProfilePage.updatePermanentAddress(testData.EmployeePersonalData.PermanentAddress2);
  EmployeeProfilePage.updatePresentAddress(testData.EmployeePersonalData.PresentAddress2);
  EmployeeProfilePage.clickOnCloseButton();

  // Assert after clicking on Close button
  EmployeeProfilePage.getPersonalFieldValue("Date of Birth").should("equal", testData.EmployeePersonalData.DateOfBirth);
  EmployeeProfilePage.getPersonalFieldValue("Aadhaar Card Number").should("equal", testData.EmployeePersonalData.AdhaarNumber);
  EmployeeProfilePage.getPersonalFieldValue("Passport Number").should("equal", testData.EmployeePersonalData.PassportNumber);
  EmployeeProfilePage.getPersonalFieldValue("PAN Number").should("equal", testData.EmployeePersonalData.PanNumber);
  EmployeeProfilePage.getPersonalFieldValue("Present Address").should("equal", testData.EmployeePersonalData.PresentAddress);
  EmployeeProfilePage.getPersonalFieldValue("Blood Group").should("equal", testData.EmployeePersonalData.BloodGroup);
  EmployeeProfilePage.getPersonalFieldValue("Gender").should("equal", testData.EmployeePersonalData.Gender);
  EmployeeProfilePage.getPersonalFieldValue("Marital Status").should("equal", testData.EmployeePersonalData.MaritalStatus);
  EmployeeProfilePage.getPersonalFieldValue("Alternate Number").should("equal", testData.EmployeePersonalData.AlternateNumber);
  EmployeeProfilePage.getPersonalFieldValue("Permanent Address").should("equal", testData.EmployeePersonalData.PermanentAddress);

  // Verify data gets saved on clicking 'Update' button
  EmployeeProfilePage.clickOnEditPersonalDetails();
  EmployeeProfilePage.updateDateOfBirth(testData.EmployeePersonalData.UpdatededDateOfBirth);
  EmployeeProfilePage.updateBloodGroup(testData.EmployeePersonalData.BloodGroup2);
  EmployeeProfilePage.updateAdhaarNumber(testData.EmployeePersonalData.AdhaarNumber2);
  EmployeeProfilePage.updateGender(testData.EmployeePersonalData.Gender2);
  EmployeeProfilePage.updatePassportNumber(testData.EmployeePersonalData.PassportNumber2);
  EmployeeProfilePage.updateMaritalStatus(testData.EmployeePersonalData.MaritalStatus2);
  EmployeeProfilePage.updatePanNumber(testData.EmployeePersonalData.PanNumber2);
  EmployeeProfilePage.updateAlternateNumber(testData.EmployeePersonalData.AlternateNumber2);
  EmployeeProfilePage.updatePermanentAddress(testData.EmployeePersonalData.PermanentAddress2);
  EmployeeProfilePage.updatePresentAddress(testData.EmployeePersonalData.PresentAddress2);
  EmployeeProfilePage.clickOnUpdateButton();

  // Assert after clicking on Update button
  EmployeeProfilePage.getPersonalFieldValue("Date of Birth").should("equal", testData.EmployeePersonalData.UpdatededDateOfBirth);
  EmployeeProfilePage.getPersonalFieldValue("Aadhaar Card Number").should("equal", testData.EmployeePersonalData.AdhaarNumber2);
  EmployeeProfilePage.getPersonalFieldValue("Passport Number").should("equal", testData.EmployeePersonalData.PassportNumber2);
  EmployeeProfilePage.getPersonalFieldValue("PAN Number").should("equal", testData.EmployeePersonalData.PanNumber2);
  EmployeeProfilePage.getPersonalFieldValue("Present Address").should("equal", testData.EmployeePersonalData.PresentAddress2);
  EmployeeProfilePage.getPersonalFieldValue("Blood Group").should("equal", testData.EmployeePersonalData.BloodGroup2);
  EmployeeProfilePage.getPersonalFieldValue("Gender").should("equal", testData.EmployeePersonalData.Gender2);
  EmployeeProfilePage.getPersonalFieldValue("Marital Status").should("equal", testData.EmployeePersonalData.MaritalStatus2);
  EmployeeProfilePage.getPersonalFieldValue("Alternate Number").should("equal", testData.EmployeePersonalData.AlternateNumber2);
  EmployeeProfilePage.getPersonalFieldValue("Permanent Address").should("equal", testData.EmployeePersonalData.PermanentAddress2);

  // Clean up — revert to original data
  EmployeeProfilePage.clickOnEditPersonalDetails();
  EmployeeProfilePage.updateDateOfBirth(testData.EmployeePersonalData.OriginalDOB);
  EmployeeProfilePage.updateBloodGroup(testData.EmployeePersonalData.BloodGroup);
  EmployeeProfilePage.updateAdhaarNumber(testData.EmployeePersonalData.AdhaarNumber);
  EmployeeProfilePage.updateGender(testData.EmployeePersonalData.Gender);
  EmployeeProfilePage.updatePassportNumber(testData.EmployeePersonalData.PassportNumber);
  EmployeeProfilePage.updateMaritalStatus(testData.EmployeePersonalData.MaritalStatus);
  EmployeeProfilePage.updatePanNumber(testData.EmployeePersonalData.PanNumber);
  EmployeeProfilePage.updateAlternateNumber(testData.EmployeePersonalData.AlternateNumber);
  EmployeeProfilePage.updatePermanentAddress(testData.EmployeePersonalData.PermanentAddress);
  EmployeeProfilePage.updatePresentAddress(testData.EmployeePersonalData.PresentAddress);
  EmployeeProfilePage.clickOnUpdateButton();

  EmployeeProfilePage.clickOnPersonalDetails();
  EmployeeProfilePage.editPersonalDetailsBtn.should("not.be.visible");
});


  it("HRMIS_4: Verify that the 'Work' accordion expands, and validate the update and close functionalities.", () => {
  // Verify that 'Work' accordion gets expanded, when user clicks 'Work' accordion.
  EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
  EmployeeProfilePage.clickOnWork();
  EmployeeProfilePage.getPersonalFieldValue("Department").should(
    "equal",
    testData.EmployeeWorkData.Department
  );
  EmployeeProfilePage.getPersonalFieldValue("Designation").should(
    "equal",
    testData.EmployeeWorkData.Designation
  );
  EmployeeProfilePage.getPersonalFieldValue("Reporting To").should(
    "equal",
    testData.EmployeeWorkData.ReportingTo
  );
  EmployeeProfilePage.getPersonalFieldValue("Date of Joining").should(
    "equal",
    testData.EmployeeWorkData.DOJ
  );
  EmployeeProfilePage.getPersonalFieldValue("Employee Status").should(
    "equal",
    testData.EmployeeWorkData.EmployeeStatus
  );
  EmployeeProfilePage.getPersonalFieldValue("Employee Type").should(
    "equal",
    testData.EmployeeWorkData.EmployeeType
  );

  //Verify that data do not get saved on clicking 'Close' button'
  EmployeeProfilePage.clickOnEditWorkDetails();
  EmployeeProfilePage.updateDOJ(testData.EmployeeWorkData.UpdateDOJ);
  EmployeeProfilePage.clickOnCloseButton();
  EmployeeProfilePage.getPersonalFieldValue("Date of Joining").should(
    "equal",
    testData.EmployeeWorkData.DOJ
  );

  //Verify that data do not get saved on clicking 'Update' button'
  EmployeeProfilePage.clickOnEditWorkDetails();
  EmployeeProfilePage.updateDOJ(testData.EmployeeWorkData.UpdateDOJ);
  EmployeeProfilePage.clickOnUpdateButton();
  EmployeeProfilePage.validateSuccessMessage();
  EmployeeProfilePage.getPersonalFieldValue("Date of Joining").should(
    "equal",
    testData.EmployeeWorkData.UpdatedDOJ
  );

  //Rollback Date Of Joining Under Work Into Accordion
  EmployeeProfilePage.clickOnEditWorkDetails();
  EmployeeProfilePage.updateDOJ(testData.EmployeeWorkData.RecentDOJ);
  EmployeeProfilePage.clickOnUpdateButton();

  //Verify that 'Work' accordion gets collapsed,  when user clicks on 'Work' accordion.
  EmployeeProfilePage.clickOnWork();
  EmployeeProfilePage.validateAccordionCollapsed();
});


  it("HRMIS_5: Verify that the 'Work Experience' accordion expands,validate table columns", () => {
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

  it("HRMIS_6: Verify that the 'Education' accordion expands,validate table columns", () => {
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

  it("HRMIS_7: Verify that the 'Dependents' accordion expands,validate table columns", () => {
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
