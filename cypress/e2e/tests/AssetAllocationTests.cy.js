import sideBar from "../components/SideBar";
import AssetAllocationPage from "../pages/AssetAllocationPage"
import { generateRandomString } from '../../support/utils';

let testData;
before(function () {
    cy.fixture('data').then((data) => {
        testData = data;
    });
})


describe("Employee Asset Managment Asset Allocation Tests", () => {

    it("HRMIS_1: Verify Asset Management Collapse and Open", () => {

        cy.login();
        sideBar.navigateTo("Asset Management");
        cy.get("a[aria-expanded='true'] + ul li").should('be.visible');
        sideBar.navigateTo("Asset Management");
        cy.get("a[aria-expanded='true'] + ul li").should('not.exist');


    });

    it("HRMIS_2: Verify Asset Allocation Page open after clicking on Asset Allocation subtab", () => {

        cy.login();
        sideBar.navigateTo("Asset Management", "Asset Allocation");
        AssetAllocationPage.assetAllocationHeader.should('be.visible').and('have.text', 'Asset Allocation');
        AssetAllocationPage.assignAsset.should('be.visible');

        AssetAllocationPage.selectItemPerPage('5');
        AssetAllocationPage.itemPerPageDrp.should('have.value', '5');
        AssetAllocationPage.gridRows.should('have.length', 5);

    });


    it("HRMIS_3: Verify Searching with Asset type ,Employee Name and serial Number on Asset Allocation subtab", () => {

        cy.login();
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
        cy.login();
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
        cy.login();
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


});