import sideBar from "../components/SideBar";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";

describe("Employee Profile Tests", () => {
    let testData;
    before(function(){
        cy.fixture('data').then((data) => {
            testData = data;
          });
    })

    beforeEach(function () {
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

        // Verify that 'Basic Info' accordion gets expanded, when user clicks 'Basic Info' accordion.
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.getFieldValue("First Name").should('equal',testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that data do not get saved on clicking 'Close' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('DDinesh');
        EmployeeProfilePage.updateMiddleName('D');
        EmployeeProfilePage.updateLastName('Kumar');
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal',testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that data gets saved on clicking 'Update' button.
        EmployeeProfilePage.clickOnEditBasicInfoDetails();
        EmployeeProfilePage.updateFirstName('Autom');
        EmployeeProfilePage.updateMiddleName('Mation');
        EmployeeProfilePage.updateLastName('User');
        EmployeeProfilePage.clickOnUpdateButton();
        EmployeeProfilePage.validateSuccessMessage();
        EmployeeProfilePage.getFieldValue("First Name").should('equal', testData.EmployeeData.FirstName);
        EmployeeProfilePage.getFieldValue("Middle Name").should('equal', testData.EmployeeData.MiddleName);
        EmployeeProfilePage.getFieldValue("Last Name").should('equal', testData.EmployeeData.LastName);
        EmployeeProfilePage.getFieldValue("Employee Id").should('equal', testData.EmployeeData.EmployeeID);
        EmployeeProfilePage.getFieldValue("Email").should('equal', testData.EmployeeData.EmailID);

        // Verify that 'Basic Info' accordion gets collapsed.
        EmployeeProfilePage.clickOnBasicInfo();
        EmployeeProfilePage.validateAccordionCollapsed();
    });

    

    it.skip("HRMIS_3: Verify that the 'Personal Details' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        // const EmployeeData = {
        //     DateOfBirth: '30-09-1993',
        //     OriginalDOB: '1993-09-30',
        //     AdhaarNumber: '232324324322',
        //     PassportNumber: '238928392323',
        //     PanNumber: 'BSSSS5123D',
        //     PresentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
        //     BloodGroup: 'B+ve',
        //     Gender: 'male',
        //     AlternateNumber: '4523542343',
        //     MaritalStatus: 'Single',
        //     PermanentAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',

        //     //Updated Employee Test Data
        //     UpdatedDateOfBirth: '2000-05-09',
        //     UpdatededDateOfBirth: '09-05-2000',
        //     AdhaarNumber2: '488123345262',
        //     PassportNumber2: 'B20964573432',
        //     PanNumber2: 'ABCD42215Y',
        //     PresentAddress2: '#1000 CHANDIGARH (PIN 160014)',
        //     BloodGroup2: 'A+ve',
        //     Gender2: 'female',
        //     AlternateNumber2: '7676767676',
        //     MaritalStatus2: 'Single',
        //     PermanentAddress2: '#1000 CHANDIGARH (PIN 160014)',

        // }

        // Verify that 'Personal Details' accordion gets expanded, when user clicks 'Personal Details' accordion.
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnPersonalDetails();
        EmployeeProfilePage.getFieldValue("Date of Birth").should('equal', testData.EmployeePersonalData.DateOfBirth);
        EmployeeProfilePage.getFieldValue("Aadhar Card Number").should('equal', testData.EmployeePersonalData.AdhaarNumber);
        EmployeeProfilePage.getFieldValue("Passport Number").should('equal', testData.EmployeePersonalData.PassportNumber);
        EmployeeProfilePage.getFieldValue("PAN Number").should('equal', testData.EmployeePersonalData.PanNumber);
        EmployeeProfilePage.getFieldValue("Present Address").should('equal', testData.EmployeePersonalData.PresentAddress);
        EmployeeProfilePage.getFieldValue("Blood Group").should('equal', testData.EmployeePersonalData.BloodGroup);
        EmployeeProfilePage.getFieldValue("Gender").should('equal', testData.EmployeePersonalData.Gender);
        EmployeeProfilePage.getFieldValue("Marital Status").should('equal', testData.EmployeePersonalData.MaritalStatus);
        EmployeeProfilePage.getFieldValue("Alternate Number").should('equal', testData.EmployeePersonalData.AlternateNumber);
        EmployeeProfilePage.getFieldValue("Permanent Address").should('equal', testData.EmployeePersonalData.PermanentAddress);


        //Verify that data do not get saved on clicking 'Close' button' 
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

        // Assert after clicking on close button
        EmployeeProfilePage.getFieldValue("Date of Birth").should('equal', testData.EmployeePersonalData.DateOfBirth);
        EmployeeProfilePage.getFieldValue("Aadhar Card Number").should('equal', testData.EmployeePersonalData.AdhaarNumber);
        EmployeeProfilePage.getFieldValue("Passport Number").should('equal', testData.EmployeePersonalData.PassportNumber);
        EmployeeProfilePage.getFieldValue("PAN Number").should('equal', testData.EmployeePersonalData.PanNumber);
        EmployeeProfilePage.getFieldValue("Present Address").should('equal', testData.EmployeePersonalData.PresentAddress);
        EmployeeProfilePage.getFieldValue("Blood Group").should('equal', testData.EmployeePersonalData.BloodGroup);
        EmployeeProfilePage.getFieldValue("Gender").should('equal', testData.EmployeePersonalData.Gender);
        EmployeeProfilePage.getFieldValue("Marital Status").should('equal', testData.EmployeePersonalData.MaritalStatus);
        EmployeeProfilePage.getFieldValue("Alternate Number").should('equal', testData.EmployeePersonalData.AlternateNumber);
        EmployeeProfilePage.getFieldValue("Permanent Address").should('equal', testData.EmployeePersonalData.PermanentAddress);

         //Verify that data do not get saved on clicking 'update' button' 
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
         EmployeeProfilePage.clickOnUpdateButton();


         // Assert after clicking on update button
        EmployeeProfilePage.getFieldValue("Date of Birth").should('equal', testData.EmployeePersonalData.UpdatededDateOfBirth);
        EmployeeProfilePage.getFieldValue("Aadhar Card Number").should('equal', testData.EmployeePersonalData.AdhaarNumber2);
        EmployeeProfilePage.getFieldValue("Passport Number").should('equal', testData.EmployeePersonalData.PassportNumber2);
        EmployeeProfilePage.getFieldValue("PAN Number").should('equal', testData.EmployeePersonalData.PanNumber2);
        EmployeeProfilePage.getFieldValue("Present Address").should('equal', testData.EmployeePersonalData.PresentAddress2);
        EmployeeProfilePage.getFieldValue("Blood Group").should('equal', testData.EmployeePersonalData.BloodGroup2);
        EmployeeProfilePage.getFieldValue("Gender").should('equal', testData.EmployeePersonalData.Gender2);
        EmployeeProfilePage.getFieldValue("Marital Status").should('equal', testData.EmployeePersonalData.MaritalStatus2);
        EmployeeProfilePage.getFieldValue("Alternate Number").should('equal', testData.EmployeePersonalData.AlternateNumber2);
        EmployeeProfilePage.getFieldValue("Permanent Address").should('equal', testData.EmployeePersonalData.PermanentAddress2);

        //Clean up and revert back to previous details
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
        EmployeeProfilePage.editPersonalDetailsBtn.should('not.be.visible');

    });

    it.skip("HRMIS_4: Verify that the 'Work' accordion expands, and validate the update and close functionalities.", () => {

        //Employee Details Test Data
        // const EmployeeData = {
        //     Department: 'Technical',
        //     Designation: 'Application Developer',
        //     ReportingTo: 'chandler  shan',
        //     DOJ: '30-09-2024',
        //     EmployeeStatus: 'VERIFIED',
        //     EmployeeType: 'Full Time',
        //     UpdateDOJ: '2024-11-30',
        //     UpdatedDOJ: '30-11-2024',
        //     RecentDOJ: '2024-07-25',
        // }

        // Verify that 'Work' accordion gets expanded, when user clicks 'Work' accordion.
        EmployeeListPage.navigateToUserDashboardPage("Autom Mation User");
        EmployeeProfilePage.clickOnWork();
        EmployeeProfilePage.getFieldValue("Department").should('equal', testData.EmployeeWorkData.Department);
        EmployeeProfilePage.getFieldValue("Designation").should('equal', testData.EmployeeWorkData.Designation);
        EmployeeProfilePage.getFieldValue("Reporting To").should('equal', testData.EmployeeWorkData.ReportingTo);
        EmployeeProfilePage.getFieldValue("Date of Joining").should('equal', testData.EmployeeWorkData.DOJ);
        EmployeeProfilePage.getFieldValue("Employee Status").should('equal', testData.EmployeeWorkData.EmployeeStatus);
        EmployeeProfilePage.getFieldValue("Employee Type").should('equal', testData.EmployeeWorkData.EmployeeType);

        //Verify that data do not get saved on clicking 'Close' button'
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.updateDOJ(testData.EmployeeWorkData.UpdateDOJ);
        EmployeeProfilePage.clickOnCloseButton();
        EmployeeProfilePage.getFieldValue("Date of Joining").should('equal', testData.EmployeeWorkData.DOJ);

        //Verify that data do not get saved on clicking 'Update' button'
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.updateDOJ(testData.EmployeeWorkData.UpdateDOJ);
        EmployeeProfilePage.clickOnUpdateButton();
        EmployeeProfilePage.validateSuccessMessage();
        EmployeeProfilePage.getFieldValue("Date of Joining").should('equal', testData.EmployeeWorkData.UpdatedDOJ);

        //Rollback Date Of Joining Under Work Into Accordion
        EmployeeProfilePage.clickOnEditWorkDetails();
        EmployeeProfilePage.updateDOJ(testData.EmployeeWorkData.RecentDOJ);
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
