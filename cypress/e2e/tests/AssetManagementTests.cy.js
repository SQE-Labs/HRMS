import sideBar from "../components/SideBar";
import AssetMgmtPage from "../pages/AssetMgmtPage"
import AssetDashBoardPage from "../pages/AssetDashBoardPage"
import { generateRandomString } from '../../support/utils';

let testData;
before(function(){
    cy.fixture('data').then((data) => {
        testData = data;
      });
})


describe("Employee Asset Managment Request Tests", () => {

    it("HRMIS_1: Verify Asset Request Tab", () => {

        // login to Application
        cy.login(); 
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
        cy.login(); 
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
        cy.login(); 
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
        cy.login(); 
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.assert_SubMenus(testData.AssetManagement.SubMenus);
        AssetDashBoardPage.DashBoardHeader.should('be.visible').and('have.text','Asset Dashboard')

    });

    it("HRMIS_5: Verify Asset Type Filter on Dashboard Page  ", () => {

        // login to Application
        cy.login(); 
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
        AssetDashBoardPage.clickOnFilterBtn();
        AssetDashBoardPage.assertAllCardsContainKeyword(AssetDashBoardPage.assetCards,testData.AssetsNames.Keyboard);
    });

    it("HRMIS_6: Verify Asset Type Filter 'No Record Available' on Dashboard Page  ", () => {

        // login to Application
        cy.login(); 
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetType(testData.AssetsNames.Pendrive);
        AssetDashBoardPage.clickOnFilterBtn();
        AssetDashBoardPage.noRecordeLbl.should('be.visible').and('have.text', 'No Record Available');
    });

    it.only("HRMIS_7: Verify Asset Owner Filter on Dashboard Page  ", () => {

        // login to Application
        cy.login(); 
        sideBar.navigateTo("Asset Management","Asset Dashboard");
        AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
        AssetDashBoardPage.clickOnFilterBtn();
        AssetDashBoardPage.assertAllCardsContainKeyword(AssetDashBoardPage.assetCardOwner,testData.AssetsOwner.Caelius);
    });


});