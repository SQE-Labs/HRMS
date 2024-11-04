import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";

describe("Employee Profile Tests", () => {

    beforeEach(function () {
        cy.fixture('testData').then((data) => {
            this.testData = data;
          });
        cy.login();
    });

    it("HRMIS_1: Verify that the 'Employee List' page and the User Dashboard load successfully.", () => {

        //Login and Navigate to Employees List Page
        sideBar.navigateTo("Employee Management", "Employees List");

        // Verify that information message, when user enters invalid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('invalidName');
        EmployeeListPage.validateNoRecordsAppear('No Record Available');

        // Verify that information message, when user enters valid data in 'Search By Name' field
        EmployeeListPage.enterNameIntoSearchField('Autom Mation User');
        EmployeeListPage.getTotalEmployeescount(1);

    });

    it("HRMIS_2: Verify that the 'Basic Info' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        // const EmployeeData = {
        //     FirstName: 'Autom',
        //     LastName: 'User',
        //     MiddleName: 'Mation',
        //     EmployeeID: 'CCIT/10_24/559',
        //     EmailID: 'autouser@caeliusconsulting.com',

        // }

        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.getFieldValue("First Name").should('equal',this.testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', this.testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', this.testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', this.testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', this.testData.EmployeeData.EmailID);

        // Verify that data do not get saved on clicking 'Close' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('DDinesh');
        EmployeeProfilePage.updateMiddleName('D');
        EmployeeProfilePage.updateLastName('Kumar');
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', this.testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', this.testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', this.testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal',this.testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', this.testData.EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'Update' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Autom');
        EmployeeProfilePage.updateMiddleName('Mation');
        EmployeeProfilePage.updateLastName('User');
        EmployeeProfilePage.clickOnUpdateButton();
        EmployeeProfilePage.validateSuccessMessage();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', this.testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', this.testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', this.testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', this.testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', this.testData.EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.validateAccordionCollapsed();
    });

    

    it.skip("HRMIS_3: Verify that the 'Personal Details' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        const EmployeeData = {
            DateOfBirth: '30-09-1993',
            OriginalDOB: '1993-09-30',
            AdhaarNumber: '232324324322',
            PassportNumber: '238928392323',
            PanNumber: 'BSSSS5123D',
            PresentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
            BloodGroup: 'B+ve',
            Gender: 'male',
            AlternateNumber: '4523542343',
            MaritalStatus: 'Single',
            PermanentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',

            //Updated Employee Test Data
            UpdatedDateOfBirth: '2000-05-09',
            UpdatededDateOfBirth: '09-05-2000',
            AdhaarNumber2: '488123345262',
            PassportNumber2: 'B20964573432',
            PanNumber2: 'ABCD42215Y',
            PresentAddress2: '#1000 CHANDIGARH (PIN 160014)',
            BloodGroup2: 'A+ve',
            Gender2: 'female',
            AlternateNumber2: '7676767676',
            MaritalStatus2: 'Single',
            PermanentAddress2: '#1000 CHANDIGARH (PIN 160014)',

        }

        // Verify that 'Personal Details' accordion gets expanded, when user clicks 'Personal Details' accordion.
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnPersonalDetails();
        EmployeeProfilePage.getFieldValue("Date of Birth").should('equal', EmployeeData.DateOfBirth);
        EmployeeProfilePage.getFieldValue("Aadhar Card Number").should('equal', EmployeeData.AdhaarNumber);
        EmployeeProfilePage.getFieldValue("Passport Number").should('equal', EmployeeData.PassportNumber);
        EmployeeProfilePage.getFieldValue("PAN Number").should('equal', EmployeeData.PanNumber);
        EmployeeProfilePage.getFieldValue("Present Address").should('equal', EmployeeData.PresentAddress);
        EmployeeProfilePage.getFieldValue("Blood Group").should('equal', EmployeeData.BloodGroup);
        EmployeeProfilePage.getFieldValue("Gender").should('equal', EmployeeData.Gender);
        EmployeeProfilePage.getFieldValue("Marital Status").should('equal', EmployeeData.MaritalStatus);
        EmployeeProfilePage.getFieldValue("Alternate Number").should('equal', EmployeeData.AlternateNumber);
        EmployeeProfilePage.getFieldValue("Permanent Address").should('equal', EmployeeData.PermanentAddress);


        //Verify that data do not get saved on clicking 'Close' button' 
        EmployeeProfilePage.clickOnEditPersonalDetails();
        EmployeeProfilePage.updateDateOfBirth(EmployeeData.UpdatedDateOfBirth);
        EmployeeProfilePage.updateBloodGroup(EmployeeData.BloodGroup2);
        EmployeeProfilePage.updateAdhaarNumber(EmployeeData.AdhaarNumber2);
        EmployeeProfilePage.updateGender(EmployeeData.Gender2);
        EmployeeProfilePage.updatePassportNumber(EmployeeData.PassportNumber2);
        EmployeeProfilePage.updateMaritalStatus(EmployeeData.MaritalStatus2);
        EmployeeProfilePage.updatePanNumber(EmployeeData.PanNumber2);
        EmployeeProfilePage.updateAlternateNumber(EmployeeData.AlternateNumber2);
        EmployeeProfilePage.updatePermanentAddress(EmployeeData.PermanentAddress2);
        EmployeeProfilePage.updatePresentAddress(EmployeeData.PresentAddress2);
        EmployeeProfilePage.clickOnCloseButton();

        // Assert after clicking on close button
        EmployeeProfilePage.getFieldValue("Date of Birth").should('equal', EmployeeData.DateOfBirth);
        EmployeeProfilePage.getFieldValue("Aadhar Card Number").should('equal', EmployeeData.AdhaarNumber);
        EmployeeProfilePage.getFieldValue("Passport Number").should('equal', EmployeeData.PassportNumber);
        EmployeeProfilePage.getFieldValue("PAN Number").should('equal', EmployeeData.PanNumber);
        EmployeeProfilePage.getFieldValue("Present Address").should('equal', EmployeeData.PresentAddress);
        EmployeeProfilePage.getFieldValue("Blood Group").should('equal', EmployeeData.BloodGroup);
        EmployeeProfilePage.getFieldValue("Gender").should('equal', EmployeeData.Gender);
        EmployeeProfilePage.getFieldValue("Marital Status").should('equal', EmployeeData.MaritalStatus);
        EmployeeProfilePage.getFieldValue("Alternate Number").should('equal', EmployeeData.AlternateNumber);
        EmployeeProfilePage.getFieldValue("Permanent Address").should('equal', EmployeeData.PermanentAddress);

         //Verify that data do not get saved on clicking 'update' button' 
         EmployeeProfilePage.clickOnEditPersonalDetails();
         EmployeeProfilePage.updateDateOfBirth(EmployeeData.UpdatedDateOfBirth);
         EmployeeProfilePage.updateBloodGroup(EmployeeData.BloodGroup2);
         EmployeeProfilePage.updateAdhaarNumber(EmployeeData.AdhaarNumber2);
         EmployeeProfilePage.updateGender(EmployeeData.Gender2);
         EmployeeProfilePage.updatePassportNumber(EmployeeData.PassportNumber2);
         EmployeeProfilePage.updateMaritalStatus(EmployeeData.MaritalStatus2);
         EmployeeProfilePage.updatePanNumber(EmployeeData.PanNumber2);
         EmployeeProfilePage.updateAlternateNumber(EmployeeData.AlternateNumber2);
         EmployeeProfilePage.updatePermanentAddress(EmployeeData.PermanentAddress2);
         EmployeeProfilePage.updatePresentAddress(EmployeeData.PresentAddress2);
         EmployeeProfilePage.clickOnUpdateButton();


         // Assert after clicking on update button
        EmployeeProfilePage.getFieldValue("Date of Birth").should('equal', EmployeeData.UpdatededDateOfBirth);
        EmployeeProfilePage.getFieldValue("Aadhar Card Number").should('equal', EmployeeData.AdhaarNumber2);
        EmployeeProfilePage.getFieldValue("Passport Number").should('equal', EmployeeData.PassportNumber2);
        EmployeeProfilePage.getFieldValue("PAN Number").should('equal', EmployeeData.PanNumber2);
        EmployeeProfilePage.getFieldValue("Present Address").should('equal', EmployeeData.PresentAddress2);
        EmployeeProfilePage.getFieldValue("Blood Group").should('equal', EmployeeData.BloodGroup2);
        EmployeeProfilePage.getFieldValue("Gender").should('equal', EmployeeData.Gender2);
        EmployeeProfilePage.getFieldValue("Marital Status").should('equal', EmployeeData.MaritalStatus2);
        EmployeeProfilePage.getFieldValue("Alternate Number").should('equal', EmployeeData.AlternateNumber2);
        EmployeeProfilePage.getFieldValue("Permanent Address").should('equal', EmployeeData.PermanentAddress2);

        //Clean up and revert back to previous details
        EmployeeProfilePage.clickOnEditPersonalDetails();
        EmployeeProfilePage.updateDateOfBirth(EmployeeData.OriginalDOB);
        EmployeeProfilePage.updateBloodGroup(EmployeeData.BloodGroup);
        EmployeeProfilePage.updateAdhaarNumber(EmployeeData.AdhaarNumber);
        EmployeeProfilePage.updateGender(EmployeeData.Gender);
        EmployeeProfilePage.updatePassportNumber(EmployeeData.PassportNumber);
        EmployeeProfilePage.updateMaritalStatus(EmployeeData.MaritalStatus);
        EmployeeProfilePage.updatePanNumber(EmployeeData.PanNumber);
        EmployeeProfilePage.updateAlternateNumber(EmployeeData.AlternateNumber);
        EmployeeProfilePage.updatePermanentAddress(EmployeeData.PermanentAddress);
        EmployeeProfilePage.updatePresentAddress(EmployeeData.PresentAddress);
        EmployeeProfilePage.clickOnUpdateButton();


        EmployeeProfilePage.clickOnPersonalDetails();
        EmployeeProfilePage.editPersonalDetailsBtn.should('not.be.visible');

    });

    it.skip("HRMIS_4: Verify that the 'Work' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        const EmployeeData = {
            Department: 'Technical',
            Designation: 'Application Developer',
            ReportingTo: 'chandler  shan',
            DOJ: '30-09-2024',
            EmployeeStatus: 'VERIFIED',
            EmployeeType: 'Full Time',
            UpdateDOJ: '2024-11-30',
            UpdatedDOJ: '30-11-2024',
            RecentDOJ: '2024-07-25',
        }

        // Verify that 'Work' accordion gets expanded, when user clicks 'Work' accordion.
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnWork();
        EmployeeProfilePage.getFieldValue("Department").should('equal', EmployeeData.Department);
        EmployeeProfilePage.getFieldValue("Designation").should('equal', EmployeeData.Designation);
        EmployeeProfilePage.getFieldValue("Reporting To").should('equal', EmployeeData.ReportingTo);
        EmployeeProfilePage.getFieldValue("Date of Joining").should('equal', EmployeeData.DOJ);
        EmployeeProfilePage.getFieldValue("Employee Status").should('equal', EmployeeData.EmployeeStatus);
        EmployeeProfilePage.getFieldValue("Employee Type").should('equal', EmployeeData.EmployeeType);

        //Verify that data do not get saved on clicking 'Close' button'
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.updateDOJ(EmployeeData.UpdateDOJ);
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("Date of Joining").should('equal', EmployeeData.DOJ);

        //Verify that data do not get saved on clicking 'Update' button'
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.updateDOJ(EmployeeData.UpdateDOJ);
        EmployeeProfilePage.clickOnUpdateButton();
        EmployeeProfilePage.validateSuccessMessage();
        EmployeeProfilePage.getFieldValue("Date of Joining").should('equal', EmployeeData.UpdatedDOJ);

        //Rollback Date Of Joining Under Work Into Accordion
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.updateDOJ(EmployeeData.RecentDOJ);
        EmployeeProfilePage.clickOnUpdateButton();

        //Verify that 'Work' accordion gets collapsed,  when user clicks on 'Work' accordion.
        EmployeeProfilePage.clickOnWork();
        EmployeeProfilePage.validateAccordionCollapsed();

    });

    it.skip("HRMIS_5: Verify that the 'Work Experience' accordion expands,validate table columns", () => {

        const expectedTexts = ['Job Title', 'Previous Company', 'From', 'To','Description'];
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnWorkExperience();
        EmployeeProfilePage.assertExpectedTableLbl(EmployeeProfilePage.workExpColLbl,expectedTexts);

        EmployeeProfilePage.clickOnWorkExperience();
        EmployeeProfilePage.workExpColLbl.should('not.be.visible');
  
    });



    it.skip("HRMIS_6: Verify that the 'Education' accordion expands,validate table columns", () => {

        const expectedTexts = ['Highest Degree', 'College', 'From', 'To'];
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.assertExpectedTableLbl(EmployeeProfilePage.workEduColLbl,expectedTexts);

        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.workExpColLbl.should('not.be.visible');
  
    });


    it.skip("HRMIS_7: Verify that the 'Dependents' accordion expands,validate table columns", () => {

        const expectedTexts = ['Name', 'Gender', 'DOB', 'Relation','Mobile Number'];
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.assertExpectedTableLbl(EmployeeProfilePage.workDependentsColLbl,expectedTexts);

        EmployeeProfilePage.clickOnEducationDetail();
        EmployeeProfilePage.workExpColLbl.should('not.be.visible');
  
    });


})
