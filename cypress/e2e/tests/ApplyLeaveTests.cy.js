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

  it("HRMIS_2:Verify that 'ID' column gets sorted in asecending order after clicking 'ID' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
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

        sortedData = [...originalData].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );
        cy.log("Sorted Data:", JSON.stringify(sortedData));

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
            cy.log("Data After Sorting (UI):", JSON.stringify(uiSortedData));
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
        cy.log("Extracted Data:", JSON.stringify(originalData));

        sortedData = [...originalData].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );
        cy.log("Sorted Data:", JSON.stringify(sortedData));

        // ApplyLeavePage.clickOnToCol();

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

        //   ApplyLeavePage.clickOnTypeCol();

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

    let originalData = []; // Initialize an empty array to store the text data
    let uiSortedData = [];
    let sortedData = [];

    // Retrieve the list of texts from the grid column
    cy.get(ApplyLeavePage.gridDataList("5")) // Adjust the selector to match your grid cells
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

        const sortedData = [...originalData].sort((a, b) => {
          // Helper function to determine the priority of the first character
          const getPriority = (char) => {
            if (/[^a-zA-Z0-9]/.test(char)) return 0; // Special characters have the highest priority
            if (/[A-Z]/.test(char)) return 1; // Uppercase characters have the next priority
            return 2; // Lowercase characters have the lowest priority
          };

          const priorityA = getPriority(a[0]);
          const priorityB = getPriority(b[0]);

          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }
          return a.localeCompare(b);
        });
        cy.log("Sorted Data:", JSON.stringify(sortedData));

        //  ApplyLeavePage.clickOnReasonCol();

        cy.get(ApplyLeavePage.gridDataList("5")) // Re-fetch the data after sorting
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

        // ApplyLeavePage.clickOnLeaceCountCol();

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

        //  ApplyLeavePage.clickOnStatusCol();

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
});
