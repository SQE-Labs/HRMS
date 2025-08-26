import sideBar from "../components/SideBar";
import ApplyLeavePage from "../pages/ApplyLeavePage";

let testData;
before(function () {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

beforeEach(() => {
  cy.login("superUser");
});

describe("Attendence Management Apply Leave Tests", () => {
  it("HRMIS_1: Verify Apply Leave Page @first", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    ApplyLeavePage.applyLeaveHeader
      .should("be.visible")
      .and("have.text", "Apply Leaves");
  });

  it.skip("HRMIS_2:Verify that 'S.No.' column gets sorted in asecending order after clicking 'S.No.' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(ApplyLeavePage.gridDataList("1")) // Adjust the selector to match your grid cells
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

        sortedData = [...originalData].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );
        cy.log("Sorted Data:", JSON.stringify(sortedData));
        console.log("Sorted Data:", JSON.stringify(sortedData));

        // ApplyLeavePage.clickOnIdCol();

        cy.get(ApplyLeavePage.gridDataList("1")) // Re-fetch the data after sorting
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

  // it("HRMIS_3:Verify that 'From' column gets sorted in asecending order after clicking 'From' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
  //     sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

  //     let originalData = []; // Initialize an empty array to store the text data
  //     let uiSortedData = [];
  //     let sortedData = [];

  //     // Retrieve the list of texts from the grid column
  //     cy.get(ApplyLeavePage.gridDataList("2"))  // Adjust the selector to match your grid cells
  //         .each(($cell) => {
  //             const text = $cell.text().trim(); // Get the text and remove any extra spaces
  //             if (text) { // Only push non-empty text to the array
  //                 originalData.push(text);
  //             }
  //         })
  //         .then(() => {
  //             // Log the extracted data
  //             cy.log("Extracted Data:", JSON.stringify(originalData));

  //             sortedData = [...originalData].sort((a, b) =>
  //                 a.localeCompare(b, undefined, { sensitivity: "base" })
  //             );
  //             cy.log("Sorted Data:", JSON.stringify(sortedData));

  //             ApplyLeavePage.ClickOnfromCol();

  //             cy.get(ApplyLeavePage.gridDataList("2")) // Re-fetch the data after sorting
  //                 .each(($cell) => {
  //                     const text = $cell.text().trim();
  //                     if (text) {
  //                         uiSortedData.push(text);
  //                     }
  //                 })
  //                 .then(() => {
  //                     // Log the data after sorting from the UI
  //                     cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
  //                     cy.log("Data After Sorting (UI):", JSON.stringify(sortedData));

  //                     // Now, assert that the UI sorted data matches the expected sorted data

  //                     expect(uiSortedData).to.deep.equal(sortedData);

  //                 });

  //         })

  // });

  it("HRMIS_3: Verify that 'From' column gets sorted in ascending order after clicking 'From' header with 'Sort' icon, on 'Apply Leave' page.", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    let originalData = [];
    let uiSortedData = [];
    let sortedData = [];

    // Step 1: Get the original data from 'From' column
    cy.get(ApplyLeavePage.gridDataList("2"))
      .each(($cell) => {
        const text = $cell.text().trim();
        if (text) {
          originalData.push(text);
        }
      })
      .then(() => {
        cy.log("Original From Column Data:", JSON.stringify(originalData));

        // Step 2: Convert to Date objects and sort in ascending order
        sortedData = [...originalData].sort((a, b) => {
          return new Date(a) - new Date(b);
        });

        cy.log("Expected Sorted Dates:", JSON.stringify(sortedData));

        // Step 3: Click on the 'From' column header to trigger UI sort
        ApplyLeavePage.ClickOnfromCol();

        // Step 4: Get the UI data after sorting
        cy.get(ApplyLeavePage.gridDataList("2"))
          .each(($cell) => {
            const text = $cell.text().trim();
            if (text) {
              uiSortedData.push(text);
            }
          })
          .then(() => {
            cy.log("UI Sorted Dates:", JSON.stringify(uiSortedData));

            // Step 5: Validate the UI sorting
            expect(uiSortedData).to.deep.equal(sortedData);
          });
      });
  });

  it("HRMIS_4:Verify that 'To' column gets sorted in asecending order after clicking 'To' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(ApplyLeavePage.gridDataList("3")) // Adjust the selector to match your grid cells
      .each(($cell) => {
        const text = $cell.text().trim(); // Get the text and remove any extra spaces
        if (text) {
          // Only push non-empty text to the array
          originalData.push(text);
        }
      })
      .then(() => {
        // Log the extracted data
        // cy.log("Extracted Data:", JSON.stringify(originalData));

        // sortedData = [...originalData].sort((a, b) =>
        //   a.localeCompare(b, undefined, { sensitivity: "base" })
        // );
        // cy.log("Sorted Data:", JSON.stringify(sortedData));

        cy.log("Original From Column Data:", JSON.stringify(originalData));

        // Step 2: Convert to Date objects and sort in ascending order
        sortedData = [...originalData].sort((a, b) => {
          return new Date(a) - new Date(b);
        });

        cy.log("Expected Sorted Dates:", JSON.stringify(sortedData));

        ApplyLeavePage.clickOnToCol();

        cy.get(ApplyLeavePage.gridDataList("3")) // Re-fetch the data after sorting
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
      });
  });

  it("HRMIS_5:Verify that 'Type' column gets sorted in asecending order after clicking 'Type' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(ApplyLeavePage.gridDataList("4")) // Adjust the selector to match your grid cells
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

        sortedData = [...originalData].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );
        cy.log("Sorted Data:", JSON.stringify(sortedData));

        ApplyLeavePage.clickOnTypeCol();

        cy.get(ApplyLeavePage.gridDataList("4")) // Re-fetch the data after sorting
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
      });
  });

  it("HRMIS_6:Verify that 'Reason' column gets sorted in asecending order after clicking 'Reason' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    let originalData = [];
    let uiSortedData = [];

    cy.get(ApplyLeavePage.gridDataList("5"))
      .each(($cell) => {
        const text = $cell.text().trim();
        if (text) originalData.push(text);
      })
      .then(() => {
        // Use default locale string comparison (matches most browser sorting)
        const sortedData = [...originalData].sort((a, b) => a.localeCompare(b));

        console.log("Original Data:", originalData);
        console.log("Expected Sorted Data:", sortedData);

        cy.log("Expected Sorted Data: " + JSON.stringify(sortedData));

        ApplyLeavePage.clickOnReasonCol();

        cy.get(ApplyLeavePage.gridDataList("5"))
          .each(($cell) => {
            const text = $cell.text().trim();
            if (text) uiSortedData.push(text);
          })
          .then(() => {
            console.log("UI Sorted Data:", uiSortedData);
            cy.log("UI Sorted Data: " + JSON.stringify(uiSortedData));

            expect(uiSortedData).to.deep.equal(sortedData);
          });
      });
  });

  it("HRMIS_7:Verify that 'Leave Count' column gets sorted in asecending order after clicking 'Leave Count' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(ApplyLeavePage.gridDataList("6")) // Adjust the selector to match your grid cells
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

        const sortedData = originalData.sort((a, b) => Number(a) - Number(b));
        cy.log("Sorted Data:", JSON.stringify(sortedData));

        ApplyLeavePage.clickOnLeaveCountCol();

        cy.get(ApplyLeavePage.gridDataList("6")) // Re-fetch the data after sorting
          .each(($cell) => {
            const text = $cell.text().trim();
            if (text) {
              uiSortedData.push(text);
            }
          })
          .then(() => {
            // Log the data after sorting from the UI
            cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
            cy.log("Sorted Data:", JSON.stringify(sortedData));

            // Now, assert that the UI sorted data matches the expected sorted data

            expect(uiSortedData).to.deep.equal(sortedData);
          });
      });
  });

  it("HRMIS_8:Verify that 'Leave Count' column gets sorted in asecending order after clicking 'Leave Count' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(ApplyLeavePage.gridDataList("7")) // Adjust the selector to match your grid cells
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

        sortedData = [...originalData].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "variant" })
        );
        cy.log("Sorted Data:", JSON.stringify(sortedData));

        ApplyLeavePage.clickOnStatusCol();

        cy.get(ApplyLeavePage.gridDataList("7")) // Re-fetch the data after sorting
          .each(($cell) => {
            const text = $cell.text().trim();
            if (text) {
              uiSortedData.push(text);
            }
          })
          .then(() => {
            // Log the data after sorting from the UI
            cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
            cy.log("Sorted Data:", JSON.stringify(sortedData));

            // Now, assert that the UI sorted data matches the expected sorted data

            expect(uiSortedData).to.deep.equal(sortedData);
          });
      });
  });
  it("HRMIS_9: Verify Apply Leave and verify yes or no button on coformation message popup", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    ApplyLeavePage.clickOnApplyLeaveBtn();
    cy.wait(3000);

    ApplyLeavePage.validateApplyLeaveHeader();
    ApplyLeavePage.selectLeaveType("Privilege Leave");
    ApplyLeavePage.assertConfMess();

    ApplyLeavePage.clickOnNoBtn();
    ApplyLeavePage.selectLeaveType("Privilege Leave");
    ApplyLeavePage.clickOnYesBtn();
  });

  it("HRMIS_10:Verify that 'Apply Leave' popup gets closed after clicking 'Cross' icon", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    ApplyLeavePage.clickOnApplyLeaveBtn();
    ApplyLeavePage.validateApplyLeaveHeader();
    cy.wait(3000);
    ApplyLeavePage.clickOnCrossBtn();

    ApplyLeavePage.clickOnApplyLeaveBtn();
    cy.wait(3000);

    ApplyLeavePage.clickOnCancelButton();
  });

  it("HRMIS_11:should select current date and future date (2 days ahead)", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");

    ApplyLeavePage.clickOnApplyLeaveBtn();
    cy.wait(3000);

    ApplyLeavePage.validateApplyLeaveHeader();
    ApplyLeavePage.clickOnSubmitBtn();
    ApplyLeavePage.assertVal_Msg();
    ApplyLeavePage.selectLeaveType("Privilege Leave");
    ApplyLeavePage.clickOnYesBtn();
    ApplyLeavePage.clickOnSubmitBtn();
    ApplyLeavePage.assertDatePicker_Msg();
    ApplyLeavePage.selectcurrentandFutureDate();
    ApplyLeavePage.clickOnSubmitBtn();

    ApplyLeavePage.assertReason_Msg();
    ApplyLeavePage.enterReasonInApplyLeave("Normal Testing");
    ApplyLeavePage.clickOnSubmitBtn();
    //ApplyLeavePage.assertLeaveSucc_Msg();
  });

  it("HRMIS_12: Verify Apply Leave Page @first", () => {
    sideBar.navigateTo("Attendance & Leaves", "Apply Leaves");
    cy.wait(3000);
    ApplyLeavePage.clickOnWithdrawLink();
    ApplyLeavePage.assertWithdrawHeader();
    cy.wait(2000);
    ApplyLeavePage.clickOnSubBtn();
    ApplyLeavePage.assertValidationMsg();

    ApplyLeavePage.enterReason("Ap");
    ApplyLeavePage.clickOnSubBtn();
    cy.wait(2000);

    ApplyLeavePage.assertMessage();
    cy.wait(2000);

    ApplyLeavePage.enterReason("Applied for leave");

    ApplyLeavePage.clickOnSubBtn();
    ApplyLeavePage.assertSucc_Msg();
  });
});
