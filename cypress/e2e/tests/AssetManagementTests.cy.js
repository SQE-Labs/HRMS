import sideBar from "../components/SideBar";
import AssetMgmtPage from "../pages/AssetMgmtPage";
import AssetDashBoardPage from "../pages/AssetDashBoardPage";
import AssetCreationPage from "../pages/AssetCreationPage";
import AssetAllocationPage from "../pages/AssetAllocationPage";
import {
  generateRandomString,
  generateRandomNumber,
} from "../../support/utils";

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

describe("Employee Asset Managment Request Tests", () => {
  it("HRMIS_1: Verify Asset Request Tab", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Request");
    AssetMgmtPage.assetReqHeader
      .should("be.visible")
      .and("have.text", "Asset Request");
    AssetMgmtPage.assetReqBtn.should("be.visible");
    AssetMgmtPage.clickOnAssetReq();
    AssetMgmtPage.assetReqLbl
      .should("be.visible")
      .and("have.text", "Asset Request");
    AssetMgmtPage.clickOnBackAssetReqList();
    AssetMgmtPage.assetReqLbl.should("not.exist");
    AssetMgmtPage.assetReqHeader
      .should("be.visible")
      .and("have.text", "Asset Request");
  });

  it("HRMIS_2: Verify Reset Asset Request Details", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Request");
    AssetMgmtPage.clickOnAssetReq();
    AssetMgmtPage.selectAsset_Type("Keyboard");
    AssetMgmtPage.enterReqReason("ReasonRequest");
    AssetMgmtPage.clickOnResetBtn();
    AssetMgmtPage.requestReason.should("have.text", "");
    AssetMgmtPage.selectAssetType.should("contain", "Select an asset type");
  });

  it("HRMIS_3: Verify Submit Asset Request ", () => {
    // login to Application

    const reason = "Reason For Request " + generateRandomString(5);
    sideBar.navigateTo("Asset Management", "Asset Request");
    AssetMgmtPage.clickOnAssetReq();
    AssetMgmtPage.selectAsset_Type(testData.AssetsNames.Keyboard);
    AssetMgmtPage.enterReqReason(reason);
    AssetMgmtPage.clickOnSubmit();
    cy.validateSuccessMessages("Successfully Submitted");
    AssetMgmtPage.clickNextUntilDisabled();

    cy.xpath(`//tbody/tr/td[contains(text(), "${reason}")]`).should(
      "have.text",
      reason
    );
  });

  it("HRMIS_4: Verify Asset Management Subtabs and Asset Dashboard Page  ", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Overview");
    AssetDashBoardPage.assert_SubMenus(testData.AssetManagement.SubMenus);
    AssetDashBoardPage.DashBoardHeader.should("be.visible").and(
      "have.text",
      "Asset Overview"
    );
  });

  it("HRMIS_5: Verify Asset Type Filter on Dashboard Page  ", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Overview");
    AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
    AssetDashBoardPage.clickOnFilterBtn();
    AssetDashBoardPage.assertAllCardsContainKeyword("Keyboard");
    AssetDashBoardPage.assertTotalCount();
  });

  it("HRMIS_6: Verify Asset Type Filter 'No Record Available' on Dashboard Page  ", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Overview");
    AssetDashBoardPage.selectAssetType(testData.AssetsNames.Pendrive);
    AssetDashBoardPage.clickOnFilterBtn();
    AssetDashBoardPage.RecordeLbl.should("be.visible").and(
      "have.text",
      "Pendrive"
    );
  });

  it("HRMIS_7:  Verify Asset Owner and Asset Type Filter on Dashboard Page", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Overview");
    AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
    AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
    AssetDashBoardPage.clickOnFilterBtn();
    AssetDashBoardPage.assertAllCardsContainKeyword("Keyboard"
    );
    AssetDashBoardPage.assertTotalCount();

  });

  // Functionality changed confirmed by dogra sir.

  it("HRMIS_8:Verify 'No Record Available' message appear after clicking Export when Asset Owner is blank on Dashboard Page", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Overview");
    AssetDashBoardPage.selectAssetType(testData.AssetsNames.WiredMouse);
    AssetDashBoardPage.clickOnExportBtn();
    AssetDashBoardPage.validateErrorMessages();
  });

  // Functionality changed confirmed by dogra sir

  it("HRMIS_9:Verify CSV file is downloaded after clicking Export on Dashboard Page", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Overview");
    AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
    AssetDashBoardPage.selectAssetType(testData.AssetsNames.Keyboard);
    AssetDashBoardPage.clickOnExportBtn();
    AssetDashBoardPage.checkFile("cypress/downloads/asset_list.xlsx");
  });

  // Functionality changed confirmed by dogra sir.

  it("HRMIS_10: Verify No Record Available message when Asset type and asset Owner with no record is selected ", () => {
    // login to Application

    sideBar.navigateTo("Asset Management", "Asset Overview");
    AssetDashBoardPage.selectAssetOwner(testData.AssetsOwner.Caelius);
    AssetDashBoardPage.selectAssetType(testData.AssetsNames.WiredMouse);
    AssetDashBoardPage.clickOnExportBtn();
    AssetDashBoardPage.validateErrorMessages();
  });

  it("HRMIS_11: Verify User able to create a Asset on create Asset Page", () => {
    // login to Application
    const model = "Model" + generateRandomString(5);
    const serilaNo = "Len" + generateRandomNumber(5);

    sideBar.navigateTo("Asset Management", "New Asset Enrollment");
    AssetCreationPage.createAssetHeader
      .should("be.visible")
      .and("have.text", "New Asset Enrollment");

    AssetCreationPage.clickOnSubmit();
    AssetCreationPage.assertValidationItem(
      AssetCreationPage.assetTypeDrp,
      "Please select an item in the list."
    );
    AssetCreationPage.selectAssetType("Keyboard");

    AssetCreationPage.clickOnSubmit();
    AssetCreationPage.assertValidationField(
      AssetCreationPage.modelTxt,
      "Please fill out this field."
    );
    AssetCreationPage.enterModel(model);

    AssetCreationPage.clickOnSubmit();
    AssetCreationPage.assertValidationItem(
      AssetCreationPage.ownerDrp,
      "Please select an item in the list."
    );
    AssetCreationPage.selectOwner("Caelius");

    AssetCreationPage.clickOnSubmit();
    AssetCreationPage.assertValidationField(
      AssetCreationPage.manufactureTxt,
      "Please fill out this field."
    );

    AssetCreationPage.selectSuperOwner("CAELIUS_OWNED");
    AssetCreationPage.clickOnSubmit();
    AssetCreationPage.assertValidationField(
      AssetCreationPage.manufactureTxt,
      "Please fill out this field."
    );

    AssetCreationPage.enterManufacture("Lenovo");

    AssetCreationPage.clickOnSubmit();
    AssetCreationPage.assertValidationField(
      AssetCreationPage.serialNoTxt,
      "Please fill out this field."
    );
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
    AssetAllocationPage.asserSearchSerialNo(
      AssetAllocationPage.serialNo1rowLbl
    );
  });
});
