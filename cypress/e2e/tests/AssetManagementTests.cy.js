import sideBar from "../components/SideBar";
import AssetMgmtPage from "../pages/AssetMgmtPage"
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
        AssetMgmtPage.lastRequestReason.should('have.text',reason);

    });


});