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
                    // Helper function to determine the priority of the first character
                    const getPriority = (char) => {
                        if (/[^a-zA-Z0-9]/.test(char)) return 0; // Special characters have the highest priority
                        if (/[A-Z]/.test(char)) return 1;        // Uppercase characters have the next priority
                        return 2;                                // Lowercase characters have the lowest priority
                    };

                    const priorityA = getPriority(a[0]);
                    const priorityB = getPriority(b[0]);

                    if (priorityA !== priorityB) {
                        return priorityA - priorityB;
                    }
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


    it("HRMIS_8:Verify that 'Status' column gets sorted in asecending order after clicking 'Status' header with 'Sort' icon, on 'Apply Leave' page. ", () => {
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


    it("HRMIS_9: Verify that 'ID' column gets sorted in descending order after clicking two times 'ID' header with 'Sort' icon, on 'Apply Leave' page.", () => {

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
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                ApplyLeavePage.clickOnIdCol();
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
                        cy.log("Sorted Data: ", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })


    it("HRMIS_10: Verify that 'From' column gets sorted in descending order after clicking two times 'From' header with 'Sort' icon, on 'Apply Leave' page.", () => {

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
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                ApplyLeavePage.ClickOnfromCol();
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
                        cy.log("Sorted Data: ", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })


    it("HRMIS_11: Verify that 'To' column gets sorted in descending order after clicking two times 'To' header with 'Sort' icon, on 'Apply Leave' page.", () => {

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
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                ApplyLeavePage.clickOnToCol();
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
                        cy.log("Sorted Data: ", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })



    it("HRMIS_12: Verify that 'Type' column gets sorted in descending order after clicking two times 'Type' header with 'Sort' icon, on 'Apply Leave' page.", () => {

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
                    b.localeCompare(a, undefined, { sensitivity: "base" })
                );
                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                ApplyLeavePage.clickOnTypeCol();
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
                        cy.log("Sorted Data: ", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })



    it("HRMIS_13: Verify that 'Reason' column gets sorted in descending order after clicking two times 'Reason' header with 'Sort' icon, on 'Apply Leave' page.", () => {

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
                    // Helper function to determine the priority of the first character
                    const getPriority = (char) => {
                        if (/[^a-zA-Z0-9]/.test(char)) return 0; // Special characters have the highest priority
                        if (/[A-Z]/.test(char)) return 1;        // Uppercase characters have the next priority
                        return 2;                                // Lowercase characters have the lowest priority
                    };

                    const priorityA = getPriority(a[0]);
                    const priorityB = getPriority(b[0]);

                    // Reverse the priority order (higher priority values should come later)
                    if (priorityA !== priorityB) {
                        return priorityB - priorityA;
                    }

                    // Reverse lexicographical comparison
                    return b.localeCompare(a);
                });

                cy.log("reverse Sorted Data:", JSON.stringify(sortedData));

                ApplyLeavePage.clickOnReasonCol();
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
                        cy.log("Sorted Data: ", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })




    it("HRMIS_14: Verify that 'Leave Count' column gets sorted in descending order after clicking two times 'Leave Count' header with 'Sort' icon, on 'Apply Leave' page.", () => {

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

                const sortedData = originalData.sort((a, b) => Number(b) - Number(a));
                cy.log("Sorted Data:", JSON.stringify(sortedData));


                ApplyLeavePage.clickOnLeaceCountCol();
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
                        cy.log("Sorted Data: ", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })


    it("HRMIS_15: Verify that 'Status' column gets sorted in descending order after clicking two times 'Status' header with 'Sort' icon, on 'Apply Leave' page.", () => {

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
                    b.localeCompare(a, undefined, { sensitivity: "variant" })
                );
                cy.log("Sorted Data:", JSON.stringify(sortedData));


                ApplyLeavePage.clickOnStatusCol();
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
                        cy.log("Sorted Data: ", JSON.stringify(sortedData));

                        // Now, assert that the UI sorted data matches the expected sorted data

                        expect(uiSortedData).to.deep.equal(sortedData);

                    });

            })
    })

    it("Verify that 'Apply Leave' popup on 'Apply Leave' page.", () => {
        sideBar.navigateTo("Attendence Management", "Apply Leave");
        ApplyLeavePage.clickOnApplyLeave();
        ApplyLeavePage.applyLeavePopUpLbl.should('be.visible').and('have.text', 'Apply Leave');

        ApplyLeavePage.clickOnCancel();
        ApplyLeavePage.applyLeavePopUpLbl.should('not.be.visible');

        ApplyLeavePage.clickOnApplyLeave();
        ApplyLeavePage.clickOnCross();
        ApplyLeavePage.applyLeavePopUpLbl.should('not.be.visible');

    })


    it("Verify that validation message appear after click on submit button on 'Apply Leave' pop up.", () => {

        const formatDate = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

        const currentDate = new Date();
        const nextDayDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

        cy.log("Current Date:", formatDate(new Date()));
        cy.log("Next Day Date:", formatDate(nextDayDate));

        sideBar.navigateTo("Attendence Management", "Apply Leave");
        ApplyLeavePage.clickOnApplyLeave();

        ApplyLeavePage.clickOnSubmit();
        ApplyLeavePage.assertValidation(ApplyLeavePage.leavetypeDrp, 'Please select an item in the list.')

        ApplyLeavePage.selectLeaveType("Privilege Leave");

        ApplyLeavePage.clickOnSubmit();
        ApplyLeavePage.assertValidation(ApplyLeavePage.dateRange, 'Please fill out this field.')
        ApplyLeavePage.enterDateRange(formatDate(new Date()) + "-" +formatDate(nextDayDate));
        ApplyLeavePage.clickOnSubmit();
        ApplyLeavePage.assertValidation(ApplyLeavePage.resaonTxt, 'Please fill out this field.')

    })


    it("Verify that validation message appear after click on submit button when end date is blank on 'Apply Leave' pop up.", () => {

        const formatDate = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

        const currentDate = new Date();
       
        cy.log("Current Date:", formatDate(new Date()));
        sideBar.navigateTo("Attendence Management", "Apply Leave");
        ApplyLeavePage.clickOnApplyLeave();
        ApplyLeavePage.selectLeaveType("Privilege Leave");

        ApplyLeavePage.enterDateRange(formatDate(new Date()));
        ApplyLeavePage.enterReason("Resaon");
        ApplyLeavePage.clickOnSubmit();
        ApplyLeavePage.dateValidationLbl.should('be.visible').and('have.text','End Date is required')
    })

    

});
