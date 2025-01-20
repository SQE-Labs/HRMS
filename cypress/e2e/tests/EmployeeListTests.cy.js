import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";

describe("Employee List Tests", () => {

    let testData;
    before(function () {
        cy.fixture('data').then((data) => {
            testData = data;
        });
    })

    beforeEach(() => {

        // login to Application
        cy.login("superUser");
    })

    it("HRMIS_1: Verify that 'Employee List' page opens up, when user clicks on 'Employee Management'.", () => {
        
        sideBar.navigateTo("Employee Management", "Employee Directory");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('invalidName');
        EmployeeListPage.noRecordAvailable.should('have.text', "No Record Available");

        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField(testData.EmployeeName);
        EmployeeListPage.getTotalEmployeescount().then((employcount) => {
            expect(employcount).to.equal(1);
        });

        // Verify that the information message appears for the selected department with no records.
        EmployeeListPage.clickOnUserCard(testData.EmployeeName);
        //EmployeeListPage.clickCrossButton();

        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that data do not get saved on clicking 'Close' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Autom');
        EmployeeProfilePage.updateMiddleName('Mation1');
        EmployeeProfilePage.updateLastName('User1');
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'update' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Autom');
        EmployeeProfilePage.updateMiddleName('Mation');
        EmployeeProfilePage.updateLastName('User');
        EmployeeProfilePage.clickOnUpdateButton();
        cy.validateSuccessMessages("success");
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.editBasicInfoBtn.should('not.be.visible');
        cy.log("Accordion Is Collapsed");

        // Verify that 'Work' accordion gets expanded, when user clicks 'Basic Info' accordion.
        EmployeeProfilePage.clickOnWork();
        EmployeeProfilePage.getFieldValue("Department").should('equal', testData.EmployeeWorkInfoData.Department);
        EmployeeProfilePage.getFieldValue("Designation").should('equal', testData.EmployeeWorkInfoData.Designation);
        EmployeeProfilePage.getFieldValue("Reporting To").should('equal', testData.EmployeeWorkInfoData.ReportingTo);
        EmployeeProfilePage.getFieldValue("Employee Status").should('equal', testData.EmployeeWorkInfoData.EmployeeStatus);
        EmployeeProfilePage.getFieldValue("Employee Type").should('equal', testData.EmployeeWorkInfoData.EmployeeType);
        // EmployeeProfilePage.noRecordAvailableInfo.should('have.text', "No records available");
        // cy.log("No Records Appear")

        // Verify that data do not get saved on clicking 'Close' button.
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("Department").should('equal', testData.EmployeeWorkInfoData.Department);
        EmployeeProfilePage.getFieldValue("Designation").should('equal', testData.EmployeeWorkInfoData.Designation);
        EmployeeProfilePage.getFieldValue("Reporting To").should('equal', testData.EmployeeWorkInfoData.ReportingTo);
        EmployeeProfilePage.getFieldValue("Employee Status").should('equal', testData.EmployeeWorkInfoData.EmployeeStatus);
        EmployeeProfilePage.getFieldValue("Employee Type").should('equal', testData.EmployeeWorkInfoData.EmployeeType);

        // Verify that data gets saved on clicking 'update' button.
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.clickOnUpdateButton();
        cy.validateSuccessMessages("success");
        EmployeeProfilePage.getFieldValue("Department").should('equal', testData.EmployeeWorkInfoData.Department);
        EmployeeProfilePage.getFieldValue("Designation").should('equal', testData.EmployeeWorkInfoData.Designation);
        EmployeeProfilePage.getFieldValue("Reporting To").should('equal', testData.EmployeeWorkInfoData.ReportingTo);
        EmployeeProfilePage.getFieldValue("Employee Status").should('equal', testData.EmployeeWorkInfoData.EmployeeStatus);
        EmployeeProfilePage.getFieldValue("Employee Type").should('equal', testData.EmployeeWorkInfoData.EmployeeType);

        // Verify that 'Basic Info' accordion gets collapsed.
        EmployeeProfilePage.clickOnWork();
        EmployeeProfilePage.editWorkInfoBtn.should('not.be.visible');
        cy.log("Accordion Is Collapsed");

        // Verify that 'Personal Details' accordion gets expanded.
        EmployeeProfilePage.clickOnPersonalDetails();
        EmployeeProfilePage.getFieldValue("Date of Birth").should('equal', testData.EmployeePersonalDetails.DateOfBirth);
        EmployeeProfilePage.getFieldValue("Aadhar Card Number").should('equal', testData.EmployeePersonalDetails.AdhaarNumber);
        EmployeeProfilePage.getFieldValue("Passport Number").should('equal', testData.EmployeePersonalDetails.PassportNumber);
        EmployeeProfilePage.getFieldValue("PAN Number").should('equal', testData.EmployeePersonalDetails.PanNumber);
        EmployeeProfilePage.getFieldValue("Present Address").should('equal', testData.EmployeePersonalDetails.PresentAddress);
        EmployeeProfilePage.getFieldValue("Blood Group").should('equal', testData.EmployeePersonalDetails.BloodGroup);
        EmployeeProfilePage.getFieldValue("Gender").should('equal', testData.EmployeePersonalDetails.Gender);
        EmployeeProfilePage.getFieldValue("Marital Status").should('equal', testData.EmployeePersonalDetails.MaritalStatus);
        EmployeeProfilePage.getFieldValue("Alternate Number").should('equal', testData.EmployeePersonalDetails.AlternateNumber);
        EmployeeProfilePage.getFieldValue("Permanent Address").should('equal', testData.EmployeePersonalDetails.PermanentAddress);

        // Verify that data do not get saved on clicking 'Close' button.
        EmployeeProfilePage.clickOnEditPersonalDetails();
        //EmployeeProfilePage.updateLastName('User1');
        EmployeeProfilePage.clickOnCloseButton();

        // Verify that data gets saved on clicking 'update' button.
        EmployeeProfilePage.clickOnEditPersonalDetails();
        // EmployeeProfilePage.updateLastName('User');
        EmployeeProfilePage.clickOnUpdateButton();
        cy.validateSuccessMessages("success");

        // Verify that 'Basic Info' accordion gets collapsed.
        EmployeeProfilePage.clickOnPersonalDetails();
        EmployeeProfilePage.editPersonalDetailsBtn.should('not.be.visible');
        cy.log("Accordion Is Collapsed");

        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        const expectedTexts = ['Job Title', 'Previous Company', 'From', 'To','Description'];
        EmployeeProfilePage.clickOnWorkExperience();
        EmployeeProfilePage.assertExpectedTableLbl(EmployeeProfilePage.workExpColLbl,expectedTexts);
       
        EmployeeProfilePage.clickOnWorkExperience();
        EmployeeProfilePage.workExpColLbl.should('not.be.visible');

        // Verify that 'Personal Details' accordion gets expanded.
        const expectedTexts1 = ['Degree', 'College', 'From', 'To'];
        // EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.assertExpectedTableLbl(EmployeeProfilePage.workEduColLbl,expectedTexts1);
        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.workExpColLbl.should('not.be.visible');

        // Verify that 'Personal Details' accordion gets expanded.
        const expectedTexts2 = ['Name', 'Gender', 'DOB', 'Relation','Mobile Number'];
        //EmployeeListPage.navigateToUserDashboardPage(testData.EmployeeName);
        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.assertExpectedTableLbl(EmployeeProfilePage.workDependentsColLbl,expectedTexts2);
        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.workExpColLbl.should('not.be.visible');

    });
})