import sideBar from "../components/SideBar";
import AssetAllocationPage from "../pages/AssetAllocationPage"
import { generateRandomString } from '../../support/utils';

let testData;
before(function () {
    cy.fixture('data').then((data) => {
        testData = data;
    });
   
})

beforeEach(() => {

    // login to Application
    cy.login();
})


describe("Employee Asset Managment Asset Allocation Tests", () => {

    it("HRMIS_1: Verify Asset Management Collapse and Open", () => {

       
        sideBar.navigateTo("Asset Management");
        cy.get("a[aria-expanded='true'] + ul li").should('be.visible');
        sideBar.navigateTo("Asset Management");
        cy.get("a[aria-expanded='true'] + ul li").should('not.exist');


    });

    it("HRMIS_2: Verify Asset Allocation Page open after clicking on Asset Allocation subtab", () => {

        sideBar.navigateTo("Asset Management", "Asset Allocation");
        AssetAllocationPage.assetAllocationHeader.should('be.visible').and('have.text', 'Asset Allocation');
        AssetAllocationPage.assignAsset.should('be.visible');

        AssetAllocationPage.selectItemPerPage('5');
        AssetAllocationPage.itemPerPageDrp.should('have.value', '5');
        AssetAllocationPage.gridRows.should('have.length', 5);

    });


    it("HRMIS_3: Verify Searching with Asset type ,Employee Name and serial Number on Asset Allocation subtab", () => {

        
        sideBar.navigateTo("Asset Management", "Asset Allocation");

        // Searching By Asset Type
        AssetAllocationPage.searchBy("Name");
        AssetAllocationPage.assetSearchBy("Name");


        // Searching By Employee
        AssetAllocationPage.searchBy("empName");
        AssetAllocationPage.assetSearchBy("empName");

        // Searching By Serial Number
        AssetAllocationPage.searchBy("serialNumber");
        AssetAllocationPage.assetSearchBy("serialNumber");

        // Searching By Invalid Data
        AssetAllocationPage.searchBy("serialNumber", "Invalid");
        AssetAllocationPage.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available.');

    });


    it("HRMIS_4: Verify 'Next' and 'Previous' Pagination button Asset Allocation Page", () => {
        // Navigate to Modify Policy Page
        sideBar.navigateTo("Asset Management", "Asset Allocation");
        AssetAllocationPage.selectItemPerPage('5');
        AssetAllocationPage.itemPerPageDrp.should('have.value', '5');
        AssetAllocationPage.gridRows.should('have.length', 5);
        // Step 1: Capture the initial policy title
        let expectedAssetName, acctualAssetName1, actualAssetName, actualAssetName2;

        AssetAllocationPage.lastAssetName
            .invoke('text')
            .then((text) => {
                expectedAssetName = text.trim();

                // Step 2: Click Next and capture the next policy title
                AssetAllocationPage.clickNext();
                return AssetAllocationPage.lastAssetName.invoke('text');
            })
            .then((text) => {
                acctualAssetName1 = text.trim();

                // Step 3: Click Previous and capture the previous policy title
                AssetAllocationPage.clickPrevious();
                return AssetAllocationPage.lastAssetName.invoke('text');
            })
            .then((text) => {
                actualAssetName = text.trim();

                // Step 4: Click Next again and capture the policy title
                AssetAllocationPage.clickNext();
                return AssetAllocationPage.lastAssetName.invoke('text');
            })
            .then((text) => {
                actualAssetName2 = text.trim();

                // Assertions
                expect(acctualAssetName1).to.equal(actualAssetName2);
                expect(actualAssetName).to.equal(expectedAssetName);
            });



        AssetAllocationPage.clickNextUntilDisabled();
        cy.wait(500)
        AssetAllocationPage.paginationBtn.contains('Next').parent()
            .should('have.class', 'disabled');

        cy.wait(1000)
        AssetAllocationPage.clickPreviousUntilDisabled();
        cy.wait(500)
        AssetAllocationPage.paginationBtn.contains('Previous').parent()
            .should('have.class', 'disabled');

    })


    it("HRMIS_5: Verify 'Next' and 'Previous' Pagination button disable when only one page preset Asset Allocation Page", () => {
        // Navigate to Modify Policy Page
        sideBar.navigateTo("Asset Management", "Asset Allocation");
        AssetAllocationPage.selectItemPerPage('40');
        AssetAllocationPage.itemPerPageDrp.should('have.value', '40');
        cy.wait(500)
        AssetAllocationPage.paginationBtn.contains('Next').parent()
            .should('have.class', 'disabled');

        cy.wait(500)
        AssetAllocationPage.paginationBtn.contains('Previous').parent()
            .should('have.class', 'disabled');

    })


    it("HRMIS_6: Verify that 'Owner' column gets sorted in asecending order after clicking 'Owner' header with 'Sort' icon, on 'Asset Allocation' page.", () => {
        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = [];
        let uiSortedData = [];

        AssetAllocationPage.getColumnDataList("owner").then((data) => {
            // Normalize the data, split concatenated text (e.g., "CaeliusConsultant" -> ["Caelius", "Consultant"])
            const normalizedData = Array.isArray(data)
                ? data.map(text => text.trim().split(/(?=[A-Z])/))  // Split at uppercase letters (for camel case data)
                : [data.trim().split(/(?=[A-Z])/)]; // Fallback if single string

            // Flatten the array (in case the split results in nested arrays)
            originalData = normalizedData.flat();

            cy.log("Data Before Sorting:", JSON.stringify(originalData));

            // Programmatically sort the normalized data
            const expectedSortedData = [...originalData].sort((a, b) =>
                a.localeCompare(b, undefined, { sensitivity: "base" })
            );
            cy.log("Expected Sorted Data:", JSON.stringify(expectedSortedData));

            // Perform the sorting action on the UI
            AssetAllocationPage.clickOnOwner();

            // Fetch data again after sorting in the UI
            AssetAllocationPage.getColumnDataList("owner").then((dataAfterClick) => {
                // Normalize the data after sorting, split concatenated text
                const normalizedDataAfterClick = Array.isArray(dataAfterClick)
                    ? dataAfterClick.map(text => text.trim().split(/(?=[A-Z])/)) // Split camel case
                    : [dataAfterClick.trim().split(/(?=[A-Z])/)];

                // Flatten the array again
                uiSortedData = normalizedDataAfterClick.flat();

                cy.log("Data After Sorting:", JSON.stringify(uiSortedData));

                // Verify the UI sorted data matches the expected sorted data
                expect(uiSortedData).to.deep.equal(expectedSortedData);
            });
        });
    })


    it("HRMIS_7: Verify that the Asset Type get sorted in ascending order after clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {
        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = [];
        let uiSortedData = [];

        // Retrieve the data for the column (e.g., asset type, owner, etc.)
        AssetAllocationPage.getColumnDataList("Name").then((data) => {
            // Normalize the data (remove extra spaces)
            const normalizedData = Array.isArray(data)
                ? data.map(text => text.trim()) // Trim any extra spaces
                : [data.trim()]; // Handle case for a single string if necessary

            // Log the data before sorting

            const regex = /[A-Z][a-z]+(?: [A-Z][a-z]+)*/g;

            // Use the regex to match words or phrases (with spaces if necessary)
            const splitData = data.match(regex);
            originalData = splitData;
            cy.log("Data Before Sorting:", JSON.stringify(originalData));

            // Programmatically sort the normalized data alphabetically
            const expectedSortedData = [...originalData].sort((a, b) =>
                a.localeCompare(b, undefined, { sensitivity: "base" })
            );
            cy.log("Expected Sorted Data:", JSON.stringify(expectedSortedData));


            AssetAllocationPage.clickOnAssetType(); // Ensure this method clicks the column header for sorting

            // Fetch data again after sorting in the UI
            AssetAllocationPage.getColumnDataList("Name").then((dataAfterClick) => {
                // Normalize and split data after clicking

                uiSortedData = dataAfterClick.match(regex);
                cy.log("Data After Sorting:", JSON.stringify(uiSortedData));

                // Verify that the UI sorted data matches the expected sorted data
                expect(uiSortedData).to.deep.equal(expectedSortedData);
            });
        })
    })


    it("HRMIS_8: Verify that the Employee get sorted in ascending order after clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {

        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get('tbody tr td[data-title="empName"]')  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                sortedData = [...originalData].sort((a, b) =>
                    a.localeCompare(b, undefined, { sensitivity: "base" })
                );
                cy.log("Sorted Data:", JSON.stringify(sortedData));

                AssetAllocationPage.clickOnEmployeeCol();

                cy.get('tbody tr td[data-title="empName"]') // Re-fetch the data after sorting
                    .each(($cell) => {
                        const text = $cell.text().trim();
                        if (text) {
                            uiSortedData.push(text);
                        }
                    })
                    .then(() => {
                        // Log the data after sorting from the UI
                        cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
                        cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });




            })
    })



    it("HRMIS_9: Verify that the serial Number get sorted in ascending order after clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {

        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(AssetAllocationPage.gridDataList("serialNumber"))  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                sortedData = [...originalData].sort((a, b) =>
                    a.localeCompare(b, undefined, { sensitivity: "base" })
                );
                cy.log("Sorted Data:", JSON.stringify(sortedData));

                AssetAllocationPage.clickOnSerialNoCol();

                cy.get(AssetAllocationPage.gridDataList("serialNumber")) // Re-fetch the data after sorting
                    .each(($cell) => {
                        const text = $cell.text().trim();
                        if (text) {
                            uiSortedData.push(text);
                        }
                    })
                    .then(() => {
                        // Log the data after sorting from the UI
                        cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
                        cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })


    it("HRMIS_10: Verify that the serial Number get sorted in descending order after double clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {

        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(AssetAllocationPage.gridDataList("serialNumber"))  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                sortedData = [...originalData].sort((a, b) =>
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                AssetAllocationPage.clickOnSerialNoCol();
                AssetAllocationPage.clickOnSerialNoCol();

                cy.get(AssetAllocationPage.gridDataList("serialNumber")) // Re-fetch the data after sorting
                    .each(($cell) => {
                        const text = $cell.text().trim();
                        if (text) {
                            uiSortedData.push(text);
                        }
                    })
                    .then(() => {
                        // Log the data after sorting from the UI
                        cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
                        cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })



    it("HRMIS_11: Verify that the employe get sorted in descending order after double clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {

        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(AssetAllocationPage.gridDataList("empName"))  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                sortedData = [...originalData].sort((a, b) =>
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                AssetAllocationPage.clickOnEmployeeCol();
                AssetAllocationPage.clickOnEmployeeCol();

                cy.get(AssetAllocationPage.gridDataList("empName")) // Re-fetch the data after sorting
                    .each(($cell) => {
                        const text = $cell.text().trim();
                        if (text) {
                            uiSortedData.push(text);
                        }
                    })
                    .then(() => {
                        // Log the data after sorting from the UI
                        cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
                        cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })



    it("HRMIS_12: Verify that the Asset Type get sorted in descending order after double clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {

        
        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(AssetAllocationPage.gridDataList("Name"))  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                sortedData = [...originalData].sort((a, b) =>
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                AssetAllocationPage.clickOnAssetType();
                AssetAllocationPage.clickOnAssetType();

                cy.get(AssetAllocationPage.gridDataList("Name")) // Re-fetch the data after sorting
                    .each(($cell) => {
                        const text = $cell.text().trim();
                        if (text) {
                            uiSortedData.push(text);
                        }
                    })
                    .then(() => {
                        // Log the data after sorting from the UI
                        cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
                        cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })


    it("HRMIS_13: Verify that the Owner get sorted in descending order after double clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {

       
        sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(AssetAllocationPage.gridDataList("owner"))  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                sortedData = [...originalData].sort((a, b) =>
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                AssetAllocationPage.clickOnOwner();
                AssetAllocationPage.clickOnOwner();

                cy.get(AssetAllocationPage.gridDataList("owner")) // Re-fetch the data after sorting
                    .each(($cell) => {
                        const text = $cell.text().trim();
                        if (text) {
                            uiSortedData.push(text);
                        }
                    })
                    .then(() => {
                        // Log the data after sorting from the UI
                        cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
                        cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })



    it("HRMIS_14:Verify Asset Assign Asset Management Page",()=>{
       
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 

        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.assetAllocationHeader.should('be.visible').and('have.text','Assign Asset');
        AssetAllocationPage.backToAssetList.should('be.visible').and('have.text','Back to Assigned Asset List');
        AssetAllocationPage.assetMgmtForm.should('be.visible').and('have.text','Asset Management');

        AssetAllocationPage.clickOnBackToAssetList();
        AssetAllocationPage.backToAssetList.should('not.exist');
        AssetAllocationPage.assetMgmtForm.should('not.exist');


    })


    it("HRMIS_15:Verify Asset Assign Asset Management Page validations",()=>{
       
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 

        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.clickOnSubmit();
        AssetAllocationPage.assertValidation(cy.xpath("//input[@id='react-select-2-input']"),"Please fill out this field.");

    })



    it("HRMIS_16:Verify 'Assets are not available for selected type !' message after selecting Unavailable asset type",()=>{
       
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 

        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.selectAssetType("USB HUB Adapter");
        AssetAllocationPage.assetAssignePopup.should('be.visible').and('have.text','Assign Asset');
        AssetAllocationPage.unavailbleAssetLbl.should('be.visible').and('have.text','Assets are not available for selected type !');
        
        AssetAllocationPage.clickOnCross();
        AssetAllocationPage.assetAssignePopup.should('not.be.visible');


    })



    it("HRMIS_17:Verify Asset Assign pop up after selecting asset from asset type",()=>{
       
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 

        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.selectAssetType("Keyboard");
        AssetAllocationPage.assetAssignePopup.should('be.visible').and('have.text','Assign Asset');
        AssetAllocationPage.assert_Columns(testData.AssetAssigneeCol.Colunms);

    })


    it("HRMIS_18:Verify relevant recorde should appear after searching with serial number on asset assigne pop up",()=>{
       
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 

        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.selectAssetType("Keyboard");
        AssetAllocationPage.searchBySerialno(AssetAllocationPage.serialNo2rowLbl);
        AssetAllocationPage.asserSearchSerialNo(AssetAllocationPage.serialNo1rowLbl);
      
    })


    
    it("HRMIS_19:Verify 'Assets are not available for selected type !' appear after searching with invalid serial number on asset assigne pop up",()=>{
        
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 

        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.selectAssetType("Keyboard");
        AssetAllocationPage.searchBySerialno("invalid Type");
        AssetAllocationPage.unavailbleAssetLbl.should('be.visible').and('have.text','Assets are not available for selected type !');
        
      
    })


    it("HRMIS_20:Verify that 'Selected Asset' field appears, when user clicks any radion button on 'Assign Asset' page",()=>{
        
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 
        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.selectAssetType("Keyboard");
        AssetAllocationPage.searchBySerialno(AssetAllocationPage.serialNo2rowLbl);
        AssetAllocationPage.assetSelectedDetails();
    })





});
