import sideBar from "../components/SideBar";
import AssetMgmtPage from "../pages/AssetMgmtPage"
import AssetDashBoardPage from "../pages/AssetDashBoardPage"
import AssetCreationPage from "../pages/AssetCreationPage";
import AssetAllocationPage from "../pages/AssetAllocationPage";
import { generateRandomString ,generateRandomNumber} from '../../support/utils';

let testData;
before(function(){
    cy.fixture('data').then((data) => {
        testData = data;
      });
})

beforeEach(() => {

    // login to Application
    cy.login("superUser");
})


describe("Employee Asset Managment Request Tests", () => {

    it("HRMIS_1: Verify Asset Request Tab", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management", "Asset Request");
        AssetMgmtPage.assetReqHeader.should('be.visible').and('have.text','Asset Request');
        AssetMgmtPage.assetReqBtn.should('be.visible');
        AssetMgmtPage.clickOnAssetReq();
        AssetMgmtPage.assetReqLbl.should('be.visible').and('have.text','Asset Request');
        AssetMgmtPage.clickOnBackAssetReqList();
        AssetMgmtPage.assetReqLbl.should('not.exist');
        AssetMgmtPage.assetReqHeader.should('be.visible').and('have.text','Asset Request');
        
       
    });

    it("HRMIS_2: Verify Reset Asset Request Details", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management", "Asset Request");
        AssetMgmtPage.clickOnAssetReq();
        AssetMgmtPage.selectAsset_Type('Keyboard');
        AssetMgmtPage.enterReqReason('ReasonRequest');
        AssetMgmtPage.clickOnResetBtn();
        AssetMgmtPage.requestReason.should('have.text', '')
        AssetMgmtPage.selectAssetType.should('contain', 'Select an asset type')

    });


    it("HRMIS_3: Verify Submit Asset Request ", () => {

        // login to Application
         
        const reason = "Reason For Request "+generateRandomString(5); 
        sideBar.navigateTo("Asset Management", "Asset Request");
        AssetMgmtPage.clickOnAssetReq();
        AssetMgmtPage.selectAsset_Type(testData.AssetsNames.Keyboard);
        AssetMgmtPage.enterReqReason(reason);
        AssetMgmtPage.clickOnSubmit();
        cy.validateSuccessMessages("Successfully Submitted");
        AssetMgmtPage.clickNextUntilDisabled();
        AssetMgmtPage.lastRequestReason.should('have.text',reason);

    });


    it("HRMIS_4: Verify Asset Management Subtabs and Asset Dashboard Page  ", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.assert_SubMenus(testData.AssetManagement.SubMenus);
        AssetDashBoardPage.DashBoardHeader.should('be.visible').and('have.text','Asset Dashboard')

    });

    it("HRMIS_5: Verify Asset Type Filter on Dashboard Page  ", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
        AssetDashBoardPage.clickOnFilterBtn();
        AssetDashBoardPage.assertAllCardsContainKeyword(AssetDashBoardPage.assetCards,testData.AssetsNames.Keyboard);
        AssetDashBoardPage.assertTotalCount(AssetDashBoardPage.assetCards);
    });

    it("HRMIS_6: Verify Asset Type Filter 'No Record Available' on Dashboard Page  ", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Pendrive);
        AssetDashBoardPage.clickOnFilterBtn();
        AssetDashBoardPage.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available');
    });

    it("HRMIS_7: Verify Asset Owner Filter on Dashboard Page  ", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
        AssetDashBoardPage.clickOnFilterBtn();
        AssetDashBoardPage.assertAllCardsContainKeyword(AssetDashBoardPage.assetCardOwner,testData.AssetsOwner.Caelius);
        AssetDashBoardPage.assertTotalCount(AssetDashBoardPage.assetCardOwner);
    });

    it("HRMIS_8:  Verify Asset Owner and Asset Type Filter on Dashboard Page", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
        AssetDashBoardPage.clickOnFilterBtn();
        AssetDashBoardPage.assertAllCardsContainKeyword(AssetDashBoardPage.assetCardOwner,testData.AssetsOwner.Caelius);
        AssetDashBoardPage.assertAllCardsContainKeyword(AssetDashBoardPage.assetCards,testData.AssetsNames.Keyboard);
        AssetDashBoardPage.assertTotalCount(AssetDashBoardPage.assetCards);


    });


    it("HRMIS_9:Verify 'No Record Available' message appear after clicking Export when Asset Owner is blank on Dashboard Page", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
        AssetDashBoardPage.clickOnExportBtn();
        cy.validateSuccessMessages("No Record Available!");
        
    });


    it("HRMIS_10:Verify 'No Record Available' message appear after clicking Export when Asset Type is blank on Dashboard Page", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
        AssetDashBoardPage.clickOnExportBtn();
        cy.validateSuccessMessages("No Record Available!");
        
    });


    it("HRMIS_11:Verify CSV file is downloaded after clicking Export on Dashboard Page", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
        AssetDashBoardPage.clickOnExportBtn();
        AssetDashBoardPage.checkFile('cypress/downloads/asset_list.xlsx');
        
    });

    it("HRMIS_12: Verify No Record Available message when Asset type and asset Owner with no record is selected ", () => {

        // login to Application
         
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Pendrive);
        AssetDashBoardPage.clickOnExportBtn();
        cy.validateSuccessMessages("No Record Available!");
    });


    it("HRMIS_13: Verify User able to create a Asset on create Asset Page", () => {

        // login to Application
        const model = "Model"+generateRandomString(5); 
        const serilaNo = "Len"+generateRandomNumber(5); 
         
        sideBar.navigateTo("Asset Management","Create Asset");
        AssetCreationPage.createAssetHeader.should('be.visible').and('have.text','Create Asset');

        AssetCreationPage.clickOnSubmit();
        AssetCreationPage.assertValidation(AssetCreationPage.assetTypeDrp,"Please select an item in the list.");
        AssetCreationPage.selectAssetType("Keyboard");

        AssetCreationPage.clickOnSubmit();
        AssetCreationPage.assertValidation(AssetCreationPage.modelTxt,"Please fill out this field.");
        AssetCreationPage.enterModel(model);

        AssetCreationPage.clickOnSubmit();
        AssetCreationPage.assertValidation(AssetCreationPage.ownerDrp,"Please select an item in the list.");
        AssetCreationPage.selectOwner("Caelius");

        AssetCreationPage.clickOnSubmit();
        AssetCreationPage.assertValidation(AssetCreationPage.manufactureTxt,"Please fill out this field.");
        AssetCreationPage.enterManufacture("Lenovo");

        AssetCreationPage.clickOnSubmit();
        AssetCreationPage.assertValidation(AssetCreationPage.serialNoTxt,"Please fill out this field.");
        AssetCreationPage.enterSerialNo(serilaNo);

        AssetCreationPage.enterWarranty("2");
        AssetCreationPage.enterPurchaseDate("2024-05-06");
        AssetCreationPage.enterComment("Asset Created");

        AssetCreationPage.clickOnSubmit();
        cy.validateSuccessMessages("Successfully Created!");

        // Assert Created Asset
        sideBar.navigateTo("Asset Management", "Asset Allocation"); 
        AssetAllocationPage.clickOnAssetAssigne();
        AssetAllocationPage.selectAssetType("Keyboard");
        AssetAllocationPage.searchBySerialno(serilaNo);
        AssetAllocationPage.asserSearchSerialNo(AssetAllocationPage.serialNo1rowLbl);
    
    });



});