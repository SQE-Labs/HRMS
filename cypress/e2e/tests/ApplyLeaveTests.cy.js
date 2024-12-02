import sideBar from "../components/SideBar";
import ApplyLeavePage from "../pages/ApplyLeavePage";

let testData;
before(function () {
    cy.fixture('data').then((data) => {
        testData = data;
    });
})

beforeEach(() => {
    cy.login("superUser");
})

describe("Attendence Management Apply Leave Tests", () => {

    it("HRMIS_1: Verify Apply Leave Page ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        ApplyLeavePage.applyLeaveHeader.should('be.visible').and('have.text', 'Apply Leave');

        
    });


    it("HRMIS_2:Verify that 'ID' column gets sorted in asecending order after clicking 'ID' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(ApplyLeavePage.gridDataList("1"))  // Adjust the selector to match your grid cells
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

                ApplyLeavePage.clickOnIdCol();

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

            })

        
    });



    it("HRMIS_3:Verify that 'From' column gets sorted in asecending order after clicking 'From' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(ApplyLeavePage.gridDataList("2"))  // Adjust the selector to match your grid cells
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

                ApplyLeavePage.ClickOnfromCol();

                cy.get(ApplyLeavePage.gridDataList("2")) // Re-fetch the data after sorting
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

        
    });



    it("HRMIS_4:Verify that 'To' column gets sorted in asecending order after clicking 'To' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(ApplyLeavePage.gridDataList("3"))  // Adjust the selector to match your grid cells
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

            })

        
    });


    it("HRMIS_5:Verify that 'Type' column gets sorted in asecending order after clicking 'Type' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(ApplyLeavePage.gridDataList("4"))  // Adjust the selector to match your grid cells
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

            })

        
    });

    
    it("HRMIS_6:Verify that 'Reason' column gets sorted in asecending order after clicking 'Reason' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(ApplyLeavePage.gridDataList("5"))  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                const sortedData = [...originalData].sort((a, b) => {
                    // Sort uppercase strings first
                    if (a[0] !== b[0]) {
                      return a[0].toUpperCase() === a[0] ? -1 : 1;
                    }
                    
                    // If both strings start with the same case, sort lexicographically
                    return a.localeCompare(b);
                  });
                cy.log("Sorted Data:", JSON.stringify(sortedData));

                ApplyLeavePage.clickOnReasonCol();

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

            })

        
    });



    it("HRMIS_7:Verify that 'Leave Count' column gets sorted in asecending order after clicking 'Leave Count' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(ApplyLeavePage.gridDataList("6"))  // Adjust the selector to match your grid cells
            .each(($cell) => {
                const text = $cell.text().trim(); // Get the text and remove any extra spaces
                if (text) { // Only push non-empty text to the array
                    originalData.push(text);
                }
            })
            .then(() => {
                // Log the extracted data
                cy.log("Extracted Data:", JSON.stringify(originalData));

                const sortedData = originalData.sort((a, b) => Number(a) - Number(b));
                cy.log("Sorted Data:", JSON.stringify(sortedData));

                ApplyLeavePage.clickOnLeaceCountCol();

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

            })

        
    });


    it("HRMIS_8:Verify that 'Leave Count' column gets sorted in asecending order after clicking 'Leave Count' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
      
        let originalData = []; // Initialize an empty array to store the text data
        let uiSortedData = [];
        let sortedData = [];

        // Retrieve the list of texts from the grid column
        cy.get(ApplyLeavePage.gridDataList("7"))  // Adjust the selector to match your grid cells
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

            })

        
    });
    
    
    
});
