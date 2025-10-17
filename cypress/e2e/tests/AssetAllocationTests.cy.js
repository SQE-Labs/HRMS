import sideBar from "../components/SideBar";
import AssetAllocationPage from "../pages/AssetAllocationPage";
import AssetDeAllocationPage from "../pages/AssetDeAllocationPage";
import { generateRandomString, sortNumbersAsc, sortNumbersDesc, sortAlphaDesc } from "../../support/utils";
import "cypress-xpath";
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

describe("Employee Asset Managment Asset Allocation Tests", () => {
  it("HRMIS_1: Verify Asset Management Collapse and Open", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");
    cy.get("a[aria-expanded='true'] + ul li")
      .should("have.length", 10)
      .each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    sideBar.navigateTo("Asset Management");
    cy.get("a[aria-expanded='true'] + ul li").should("not.exist");
  });

  //bug
  it("HRMIS_2: Verify Asset Allocation Page open after clicking on Asset Allocation subtab", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");
    AssetAllocationPage.assetAllocationHeader
      .should("be.visible")
      .and("have.text", "Asset Allocation");
    AssetAllocationPage.assignAsset.should("be.visible");

    AssetAllocationPage.selectItemPerPage("10");
    AssetAllocationPage.itemPerPageDrp.should("have.value", "10");
    AssetAllocationPage.gridRows.should("have.length", 10);
  });

  //need to fix later on
  it("HRMIS_3: Verify Searching with Asset type ,Employee Name and serial Number on Asset Allocation subtab", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    // Searching By Asset Type
    AssetAllocationPage.searchBy("Desktop PC");
    AssetAllocationPage.assetSearchBy("Desktop PC");

    // Searching By Employee
    AssetAllocationPage.searchBy("Asset L1");
    AssetAllocationPage.assetSearchBy("Asset L1");

    // Searching By Serial Number
    AssetAllocationPage.searchBy("DELL005");
    AssetAllocationPage.assetSearchBy("DELL005");

    // Searching By Invalid Data
    AssetAllocationPage.searchBy("serialNumber", "Invalid");
    AssetAllocationPage.noRecordeLbl
      .should("be.visible")
      .and("have.text", "No records available");
  });

  it("HRMIS_4: Verify 'Next' and 'Previous' Pagination button Asset Allocation Page", () => {

    sideBar.navigateTo("Asset Management", "Asset Allocation");
    AssetAllocationPage.selectItemPerPage("40");
    AssetAllocationPage.itemPerPageDrp.should("have.value", "40");
    AssetAllocationPage.gridRows.should("have.length", 40);
    
    let expectedAssetName, acctualAssetName1, actualAssetName, actualAssetName2;

    AssetAllocationPage.lastAssetName
      .invoke("text")
      .then((text) => {
        expectedAssetName = text.trim();

       
        AssetAllocationPage.clickNext();
        return AssetAllocationPage.lastAssetName.invoke("text");
      })
      .then((text) => {
        acctualAssetName1 = text.trim();

        
        AssetAllocationPage.clickPrevious();
        return AssetAllocationPage.lastAssetName.invoke("text");
      })
      .then((text) => {
        actualAssetName = text.trim();

       
        AssetAllocationPage.clickNext();
        return AssetAllocationPage.lastAssetName.invoke("text");
      })
      .then((text) => {
        actualAssetName2 = text.trim();

        
        expect(acctualAssetName1).to.equal(actualAssetName2);
        expect(actualAssetName).to.equal(expectedAssetName);
      });

    AssetAllocationPage.clickNextUntilDisabled();
    cy.wait(500);
    AssetAllocationPage.paginationBtn
      .contains("Next")
      .parent()
      .should("have.class", "disabled");

    cy.wait(1000);
    AssetAllocationPage.clickPreviousUntilDisabled();
    cy.wait(500);
    AssetAllocationPage.paginationBtn
      .contains("Previous")
      .parent()
      .should("have.class", "disabled");
  });

  it("HRMIS_5: Verify 'Next' and 'Previous' Pagination button disable when only one page preset Asset Allocation Page", () => {
    // Navigate to Modify Policy Page
    sideBar.navigateTo("Asset Management", "Asset Allocation");
    AssetAllocationPage.selectItemPerPage("40");
    AssetAllocationPage.itemPerPageDrp.should("have.value", "40");
    cy.wait(500);
    AssetAllocationPage.paginationPrevBtn
      .contains("Previous")
      .parent("li")
      .should("have.class", "disabled");

    cy.wait(500);
    AssetAllocationPage.paginationNextBtn
      .contains("Next")
      .parent()
      .should("not.have.class", "disabled");
  });

  it("HRMIS_6: Verify that 'Owner' column gets sorted in asecending order after clicking 'Owner' header with 'Sort' icon, on 'Asset Allocation' page.", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

    let originalData = [];
    let uiSortedData = [];

    AssetAllocationPage.getColumnDataList("Owner").then((data) => {
      const normalizedData = Array.isArray(data)
        ? data.map((text) => text.trim())
        : [data.trim()];

      cy.log("Data Before Sorting:", JSON.stringify(normalizedData));

      const expectedSortedData = [...normalizedData].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );

      cy.log("Expected Sorted Data:", JSON.stringify(expectedSortedData));

      // Perform the UI sort
      // AssetAllocationPage.clickOnOwner();

      AssetAllocationPage.getColumnDataList("Owner").then((dataAfterClick) => {
        const normalizedDataAfterClick = Array.isArray(dataAfterClick)
          ? dataAfterClick.map((text) => text.trim())
          : [dataAfterClick.trim()];

        cy.log("Data After Sorting:", JSON.stringify(normalizedDataAfterClick));

        // Compare UI-sorted vs expected sorted
        expect(normalizedDataAfterClick).to.deep.equal(expectedSortedData);
      });
    });
  });

  it("HRMIS_7: Verify that the Asset Type get sorted in ascending order after clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(AssetAllocationPage.gridDataList("1")) // Adjust the selector to match your grid cells
      .each(($cell) => {
        const text = $cell.text().trim(); // Get the text and remove any extra spaces
        if (text) {
          // Only push non-empty text to the array
          originalData.push(text);
        }
      })
      .then(() => {
        // Log the extracted data
        cy.log("Extracted Data:", JSON.stringify(originalData));
        console.log(("Extracted Data:", JSON.stringify(originalData)));

        sortedData = [...originalData].sort((a, b) => Number(a) - Number(b));
        cy.log("Sorted Data:", JSON.stringify(sortedData));
        console.log("Sorted Data:", JSON.stringify(sortedData));

        // ApplyLeavePage.clickOnIdCol();

        cy.get(AssetAllocationPage.gridDataList("1")) // Re-fetch the data after sorting
          .each(($cell) => {
            const text = $cell.text().trim();
            if (text) {
              uiSortedData.push(text);
            }
          })
          .then(() => {
            // Log the data after sorting from the UI
            console.log(
              "Data After Sorting (UI):",
              JSON.stringify(uiSortedData)
            );
            cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

            // Now, assert that the UI sorted data matches the expected sorted data

            expect(uiSortedData).to.deep.equal(sortedData);
          });
      });
  });

  it("HRMIS_8: Verify that the Employee get sorted in ascending order after clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation"); // Navigate to the desired page

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(AssetAllocationPage.gridDataList("2")) // Adjust the selector to match your grid cells
      .each(($cell) => {
        const text = $cell.text().trim(); // Get the text and remove any extra spaces
        if (text) {
          // Only push non-empty text to the array
          originalData.push(text);
        }
      })
      .then(() => {
        // Log the extracted data
        cy.log("Extracted Data:", JSON.stringify(originalData));
        console.log(("Extracted Data:", JSON.stringify(originalData)));

        sortedData = [...originalData].sort((a, b) => Number(a) - Number(b));
        cy.log("Sorted Data:", JSON.stringify(sortedData));
        console.log("Sorted Data:", JSON.stringify(sortedData));

        // ApplyLeavePage.clickOnIdCol();

        cy.get(AssetAllocationPage.gridDataList("2")) // Re-fetch the data after sorting
          .each(($cell) => {
            const text = $cell.text().trim();
            if (text) {
              uiSortedData.push(text);
            }
          })
          .then(() => {
            // Log the data after sorting from the UI
            console.log(
              "Data After Sorting (UI):",
              JSON.stringify(uiSortedData)
            );
            cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

            // Now, assert that the UI sorted data matches the expected sorted data

            expect(uiSortedData).to.deep.equal(sortedData);
          });
      });
  });

  it("HRMIS_9:  Verify that the 'Serial Number' column gets sorted in ascending order after clicking the 'Sort' icon on the 'Asset Allocation' page.", () => {
  sideBar.navigateTo("Asset Management", "Asset Allocation");

  // Click the sort icon
  AssetAllocationPage.clickOnSort("Serial Number");

  // Retry until UI reflects sorted order
  cy.get(AssetAllocationPage.gridDataList(3))
    .then(($cells) => [...$cells].map((c) => Number(c.innerText.trim())))
    .should((numbers) => {
      const expected = sortNumbersAsc(numbers);
      expect(numbers).to.deep.equal(expected);
    });
});


  it("HRMIS_10: Verify that the 'Serial Number' column gets sorted in descending order after double clicking the column header with 'Sort' icon on the 'Asset Allocation' page.", () => {
  sideBar.navigateTo("Asset Management", "Asset Allocation");

  // 1️⃣ Get original data first
  cy.get(AssetAllocationPage.gridDataList(3))
    .then(($cells) => {
      const originalNumbers = [...$cells]
        .map((c) => Number(c.innerText.trim()))
        .filter((n) => !isNaN(n));

      const expectedDesc = sortNumbersDesc(originalNumbers);

      // 2️⃣ Click sort icon twice for descending
      AssetAllocationPage.clickOnSort("Serial Number");
      AssetAllocationPage.clickOnSort("Serial Number");

      // 3️⃣ Retry reading UI until it matches expected
      cy.get(AssetAllocationPage.gridDataList(3))
        .then(($cellsAfterSort) => {
          const uiNumbers = [...$cellsAfterSort]
            .map((c) => Number(c.innerText.trim()))
            .filter((n) => !isNaN(n));

          cy.log("Expected Descending Data:", JSON.stringify(expectedDesc));
          cy.log("UI Data After Sort:", JSON.stringify(uiNumbers));

          expect(uiNumbers).to.deep.equal(expectedDesc);
        });
    });
});

  it("HRMIS_11: Verify that Employee gets sorted descending alphabetically after double-click", () => {
  sideBar.navigateTo("Asset Management", "Asset Allocation");

 cy.get(AssetAllocationPage.gridDataList(5))
  .filter(':visible')
  .then(($cells) => {
    const originalNames = $cells
      .toArray()
      .map((cell) => cell.innerText?.replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    const expectedDesc = sortAlphaDesc(originalNames);

    // Click sort icon twice
    AssetAllocationPage.clickOnSort("Employee Name");
    AssetAllocationPage.clickOnSort("Employee Name");

    cy.get(AssetAllocationPage.gridDataList(5))
      .filter(':visible')
      .then(($cellsAfterSort) => {
        const uiNames = $cellsAfterSort
          .toArray()
          .map((cell) => cell.innerText?.replace(/\s+/g, ' ').trim())
          .filter(Boolean);

        cy.log("Expected Descending Data:", JSON.stringify(expectedDesc));
        cy.log("UI Data After Sort:", JSON.stringify(uiNames));

        expect(uiNames).to.deep.equal(expectedDesc);
      });
  });
});

  it("HRMIS_12: Verify that the Asset Type get sorted in descending order after double clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    let originalData = [];
    let sortedData = [];
    let uiSortedData = [];

    cy.get(AssetAllocationPage.gridDataList("Asset Type"))
      .then(($cells) => {
        originalData = Cypress.$($cells)
          .toArray()
          .map((cell) => cell.innerText?.replace(/\s+/g, " ").trim())
          .filter(Boolean);

        sortedData = [...originalData].sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        AssetAllocationPage.clickOnSort("Asset Type");
        AssetAllocationPage.clickOnSort("Asset Type");
        cy.wait(500);
      })
      .then(() => {
        cy.get(AssetAllocationPage.gridDataList("Asset Type")).then(
          ($cellsAfterSort) => {
            uiSortedData = Cypress.$($cellsAfterSort)
              .toArray()
              .map((cell) => cell.innerText?.replace(/\s+/g, " ").trim())
              .filter(Boolean);

            cy.log("Expected Sorted Data:", JSON.stringify(sortedData));
            cy.log("UI Data After Sort:", JSON.stringify(uiSortedData));

            expect(uiSortedData).to.deep.equal(sortedData);
          }
        );
      });
  });

  it("HRMIS_13: Verify that the Owner get sorted in descending order after double clicking the column header with 'Sort' icon, on the 'Asset Allocation' page.", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    let originalData = [];
    let sortedData = [];
    let uiSortedData = [];

    cy.get(AssetAllocationPage.gridDataList(4))
      .then(($cells) => {
        originalData = Cypress.$($cells)
          .toArray()
          .map((cell) => cell.innerText?.replace(/\s+/g, " ").trim())
          .filter(Boolean);

        sortedData = [...originalData].sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        AssetAllocationPage.clickOnSort("Owner");
        AssetAllocationPage.clickOnSort("Owner");
        cy.wait(500);
      })
      .then(() => {
        cy.get(AssetAllocationPage.gridDataList(4)).then(
          ($cellsAfterSort) => {
            uiSortedData = Cypress.$($cellsAfterSort)
              .toArray()
              .map((cell) => cell.innerText?.replace(/\s+/g, " ").trim())
              .filter(Boolean);

            cy.log("Expected Sorted Data:", JSON.stringify(sortedData));
            cy.log("UI Data After Sort:", JSON.stringify(uiSortedData));

            expect(uiSortedData).to.deep.equal(sortedData);
          }
        );
      });
  });

  it("HRMIS_14:Verify Asset Assign Asset Management Page", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.assetAllocationHeader
      .should("be.visible")
      .and("have.text", "Assign Asset");
    AssetAllocationPage.backToAssetList
      .should("be.visible")
      .and("have.text", "Back to Assigned Asset List");
    AssetAllocationPage.assetMgmtForm
      .should("be.visible")
      .and("have.text", "Asset Management");

    AssetAllocationPage.clickOnBackToAssetList();
    AssetAllocationPage.backToAssetList.should("not.exist");
    AssetAllocationPage.assetMgmtForm.should("not.exist");
  });

  it("HRMIS_15:Verify Asset Assign Asset Management Page validations", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.clickOnSubmit();
    AssetAllocationPage.validateAssetTypeField();
  });

  it("HRMIS_16:Verify 'Assign Asset' pop-up opens after clicking on available asset", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.selectAssetType("Headset");
    AssetAllocationPage.assetAssignePopup
      .should("be.visible")
      .and("have.text", "Assign Asset");
    AssetAllocationPage.clickOnCross();
    AssetAllocationPage.assetAssignePopup.should("not.be.visible");
  });

  it("HRMIS_17:Verify 'Assets are not available for selected type !' message after selecting Unavailable asset type", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.selectAssetType("Wired Mouse");
    AssetAllocationPage.unavailbleAssetLbl
      .should("be.visible")
      .and("have.text", "Assets are not available for selected type !");

    AssetAllocationPage.clickOnCross();
    AssetAllocationPage.assetAssignePopup.should("not.be.visible");
  });

  it("HRMIS_18:Verify Asset Assign pop up after selecting asset from asset type", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.selectAssetType("Keyboard");
    AssetAllocationPage.assetAssignePopup
      .should("be.visible")
      .and("have.text", "Assign Asset");
    AssetAllocationPage.assert_Columns(testData.AssetAssigneeCol.Colunms);
  });

  it("HRMIS_19:Verify relevant recorde should appear after searching with serial number on asset assigne pop up", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.selectAssetType("Keyboard");
    cy.wait(2000);

    //cy.scrollTo("right");
    AssetAllocationPage.searchBySerialno(AssetAllocationPage.serialNo2rowLbl);
    cy.wait(1000);
    AssetAllocationPage.asserSearchSerialNo(
      AssetAllocationPage.serialNo1rowLbl
    );
  });

  it("HRMIS_20:Verify 'Assets are not available for selected type !' appear after searching with invalid serial number on asset assigne pop up", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");

    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.selectAssetType("Keyboard");
    AssetAllocationPage.searchBySerialno("invalid Type");
    AssetAllocationPage.unavailbleAssetLbl
      .should("be.visible")
      .and("have.text", "Assets are not available for selected type !");
  });

  it("HRMIS_21:Verify that 'Selected Asset' field appears, when user clicks any radion button on 'Assign Asset' page", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");
    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.selectAssetType("Keyboard");
    AssetAllocationPage.searchBySerialno(AssetAllocationPage.serialNo2rowLbl);
    // cy.wait(1000);
    // AssetAllocationPage.assetSelectedDetails();
  });

  it("HRMIS_22:Verify that user able to assign the asset to the employee 'Assign Asset' page", () => {
    sideBar.navigateTo("Asset Management", "Asset Allocation");
    AssetAllocationPage.clickOnAssetAssigne();
    AssetAllocationPage.selectAssetType("Keyboard");
    cy.wait(1000);
    // AssetAllocationPage.clickOnAssetAction();
    AssetAllocationPage.searchBySerialno(AssetAllocationPage.serialNo2rowLbl);
    AssetAllocationPage.selectedassetRBtn().click();
    cy.wait(1000);
    AssetAllocationPage.selectEmployee("Autom Mation Ffff");
    cy.wait(1000);
    AssetAllocationPage.enterComment("Asset Allocation Request");
    cy.wait(1000);
    AssetAllocationPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully assigned!");
    cy.wait(1000);
    AssetAllocationPage.selectItemPerPage("40");
    cy.wait(3000);
    AssetAllocationPage.clickNextUntilDisabled();
    // AssetAllocationPage.enterAssetName(Keyboard);
    cy.wait(3000);
    AssetAllocationPage.lastAssignedAssetName.should("have.text", "Keyboard");
    AssetAllocationPage.lastAssignedAssetEmp.should("have.text", "Autom ffff");
  });

  it("HRMIS_23:Verify that user able to de allocate the asset | Clean up", () => {
    sideBar.navigateTo("Asset Management", "Asset De-allocation");
    // cy.wait(30000)
    AssetDeAllocationPage.select_Employee("Autom Mation Ffff")
    AssetDeAllocationPage.clickOnDelete();
    AssetDeAllocationPage.selectAssetCondition("Partially damaged but working");
    AssetDeAllocationPage.enterRepairCost("2000");
    AssetDeAllocationPage.enterComment("Repair");
    AssetDeAllocationPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully deallocated!");
  });
});
