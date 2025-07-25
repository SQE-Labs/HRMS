import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import xpath from "cypress-xpath";
import { selectDrpValueByText } from "../../support/utils";

class AssetAllocationPage extends BasePage {
  //Locators
  get subMenus() {
    return cy.get("ul.submenu.show li");
  }
  get assetAllocationHeader() {
    return cy.get("h1");
  }
  get backToAssetList() {
    return cy.get("div.total a");
  }
  get assetMgmtForm() {
    return cy.get("#assign-asset h3");
  }
  get noRecordeLbl() {
    return cy.get(".fs-4");
  }
  get assignAsset() {
    return cy.get("div.actions a.export");
  }
  get searchTxt() {
    return cy.get("input[name='search']");
  }
  get itemPerPageDrp() {
    return cy.get("#itemsPerPage");
  }
  get gridRows() {
    return cy.get("tbody tr");
  }
  get lastAssetName() {
    return cy.get("tbody tr:last-of-type td:nth-child(2)");
  }
  get paginationBtn() {
    return cy.xpath("//li[@class='page-item disabled']");
  }

  gridDataList(title) {
    return cy.xpath(`//th[contains(text(),'${title}')]`).invoke("text");
  }

  clickOnSort(header_title) {
    return cy.xpath(`//th[contains(text(),'${header_title}')]`).invoke("text");
  }

  gridSingleData(title) {
    return `tbody tr:first-of-type td:nth-child(2)`;
  }
  get assetOwnerData() {
    return cy.get("tbody tr td:nth-child(2)");
  }
  get OwnerSortIcon() {
    return cy.get("tr th:nth-child(4)");
  }
  get assetTypeSortIcon() {
    return cy.get("tr th:nth-child(3)");
  }
  get employeeSortIcon() {
    return cy.get("tr th:nth-child(5)");
  }
  get serialNoSortIcon() {
    return cy.get("tr th:nth-child(3)");
  }

  get selectAssetTypeDrp() {
    return cy.get("#react-select-2-input");
  }
  get selectEmployeeDrp() {
    return cy.get("#react-select-3-input");
  }
  get commentTxt() {
    return cy.get("textarea[name='comment']");
  }
  get submitBtn() {
    return cy.get("div.action button");
  }
  get assetAssignePopup() {
    return cy.get("#staticBackdropLabel");
  }
  get assetAssigneGridHeader() {
    return cy.get("thead tr th");
  }
  get unavailbleAssetLbl() {
    return cy.get("#staticBackdropAsset h4");
  }
  get crossBtn() {
    return cy.get("#staticBackdropAsset button");
  }

  get serialNo2rowLbl() {
    return cy.get("tbody tr:nth-child(2) td:nth-child(4)");
  }
  get serialNo1rowLbl() {
    return cy.get("tbody tr:nth-child(1) td:nth-child(4)");
  }
  selectedassetRBtn() {
    return cy.xpath("(//input[@name='selectAsset'])[1]");
  }
  get enterAssetName() {
    return cy.get("input");
  }
  get lastAssignedAssetName() {
    return cy.get("tbody tr").last().find("td").eq(1);
  }
  get lastAssignedAssetEmp() {
    return cy.get("tbody tr").last().find("td").eq(4);
  }

  get selectEmployee_Drp() {
    return cy.get("#react-select-2-input");
  }
  get deleteIcon() {
    return cy.get("tr:last-of-type td a[name='selectAsset']");
  }
  get selectAssetConditionDrp() {
    return cy.get("#assetCondition");
  }
  get repairCostTxt() {
    return cy.get("input[name='repairCost']");
  }
  get submit2Btn() {
    return cy.get("div button[type='submit']");
  }

  //Methods

  clickOnSubmit2() {
    this.submit2Btn.click();
    Loaders.threeDotLoading.should("not.exist");
  }

  enterRepairCost(cost) {
    this.repairCostTxt.type(cost);
  }

  selectAssetCondition(text) {
    cy.selectDrpValueByText(this.selectAssetConditionDrp, text, false);
  }

  clickOnDelete() {
    this.deleteIcon.click();
  }

  select_Employee(text) {
    cy.selectDrpValueByText(
      this.selectEmployee_Drp,
      text,
      true,
      this.selectEmployee_Drp
    );
  }

  assetSelectedDetails() {
    cy.get("tbody")
      .find("tr")
      .first()
      .within(() => {
        cy.get("td:nth-child(1)")
          .invoke("text")
          .then((text1) => {
            const expectedId = text1.trim();

            cy.get("td:nth-child(2)")
              .invoke("text")
              .then((text2) => {
                const expectedManufacturer = text2.trim();

                cy.get("td:nth-child(3)")
                  .invoke("text")
                  .then((text3) => {
                    const expectedAssetName = text3.trim();

                    cy.get("td:nth-child(4)")
                      .invoke("text")
                      .then((text4) => {
                        const expectedSerialNumber = text4.trim();

                        cy.get("td:nth-child(5)")
                          .invoke("text")
                          .then((text5) => {
                            const expectedOwner = text5.trim();

                            this.clickOnAssetAction();

                            cy.xpath(
                              "//label[contains(text(),'Selected Asset')]//parent::div//textarea"
                            )
                              .should("exist") // Ensure it exists in the DOM
                              .should("be.visible")
                              .invoke("val")
                              .then((textareaValue) => {
                                // Step 3: Split the value from the textarea
                                const textareaDetails =
                                  textareaValue.split("\n");

                                const idFromTextarea = textareaDetails[0]
                                  .split(":")[1]
                                  .trim();
                                const manufacturerFromTextarea =
                                  textareaDetails[1].split(":")[1].trim();
                                const serialNumberFromTextarea =
                                  textareaDetails[2].split(":")[1].trim();
                                const ownerFromTextarea = textareaDetails[3]
                                  .split(":")[1]
                                  .trim();
                                const assetNameFromTextarea = textareaDetails[6]
                                  .split(":")[1]
                                  .trim();

                                // Step 4: Assertions to compare grid values with textarea values
                                expect(idFromTextarea).to.equal(expectedId);
                                expect(manufacturerFromTextarea).to.equal(
                                  expectedManufacturer
                                );
                                expect(serialNumberFromTextarea).to.equal(
                                  expectedSerialNumber
                                );
                                expect(ownerFromTextarea).to.equal(
                                  expectedOwner
                                );
                                expect(assetNameFromTextarea).to.equal(
                                  expectedAssetName
                                );
                              });
                          });
                      });
                  });
              });
          });
      });
  }

  clickOnAssetAction() {
    this.selectedassetRBtn.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(2000);
  }

  getserialnumber(locator) {
    return locator.invoke("text");
  }

  getSerachValue() {
    return this.searchTxt.invoke("val");
  }

  searchBySerialno(locatorOrString) {
    if (typeof locatorOrString === "string") {
      this.searchTxt.wait(1000).type(locatorOrString);
    } else {
      this.getserialnumber(locatorOrString).then((text) => {
        this.searchTxt.type(text);
      });
    }
  }

  asserSearchSerialNo(locator) {
    this.getSerachValue().then((text1) => {
      this.getserialnumber(locator).then((text2) => {
        expect(text1.trim()).to.equal(text2.trim());
      });
    });
  }

  clickOnCross() {
    this.crossBtn.wait(1000).click();
  }

  assert_Columns(columns) {
    this.assetAssigneGridHeader
      .should("have.length", columns.length)
      .each((element, index) => {
        expect(element.text().trim()).to.equal(columns[index]);
      });
  }

  clickOnSubmit() {
    this.submitBtn.wait(1000).click();
    Loaders.threeDotLoading.should("not.exist");
    cy.wait(2000);
  }

  enterComment(text) {
    this.commentTxt.type(text);
  }

  selectAssetType(type) {
    cy.selectDrpValueByText(
      this.selectAssetTypeDrp,
      type,
      true,
      this.selectAssetTypeDrp
    );
    Loaders.threeDotLoading.should("not.exist");
    Loaders.overlay.should("not.exist");
  }

  selectEmployee(type) {
    cy.selectDrpValueByText(
      this.selectEmployeeDrp,
      type,
      true,
      this.selectEmployeeDrp
    );
  }

  selectItemPerPage(count) {
    cy.selectDrpValueByText(this.itemPerPageDrp, count, false);
  }

  clickOnAssetAssigne() {
    this.assignAsset.click();
    0;
    Loaders.threeDotLoading.should("not.exist");
  }

  clickOnBackToAssetList() {
    this.backToAssetList.click();
  }

  clickOnOwner() {
    this.OwnerSortIcon.click();
  }

  clickOnAssetType() {
    this.assetTypeSortIcon.click();
  }

  clickOnEmployeeCol() {
    this.employeeSortIcon.click();
  }

  clickOnSerialNoCol() {
    this.serialNoSortIcon.click();
  }

  getColumnDataList(title) {
    return cy.xpath(`//th[contains(text(),'${title}')]`).invoke("text");
  }

  getEmployeeColumnDataList() {
    return cy.get("tbody tr td:nth-child(5)").invoke("text");
  }

  getAssetTypeColumnDataList() {
    return cy.get("tbody tr td:nth-child(2)").invoke("text");
  }

  getColumnData(title) {
    return cy.get(this.gridSingleData(title)).invoke("text");
  }

  searchBy(dataTitle = "Name", searchKey = "") {
    if (searchKey) {
      this.searchTxt.clear().type(searchKey).should("have.value", searchKey);
    } else {
      this.getColumnData(dataTitle).then((searchTexts) => {
        this.searchTxt
          .clear()
          .type(searchTexts)
          .should("have.value", searchTexts);
      });
    }
  }

  assetSearchBy(dataTitle = "Name") {
    this.searchTxt.invoke("val").then((text1) => {
      this.getColumnData(dataTitle).then((text2) => {
        expect(text1.trim()).to.equal(text2.trim());
      });
    });
  }

  clickNext() {
    cy.get("ul.pagination li")
      .contains("Next")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
        }
      });
  }

  clickPrevious() {
    cy.get("ul.pagination li")
      .contains("Previous")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
        }
      });
  }

  clickNextUntilDisabled() {
    cy.get("ul.pagination li")
      .contains("Next")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
          this.clickNextUntilDisabled();
        }
      });
  }

  clickPreviousUntilDisabled() {
    cy.get("ul.pagination li")
      .contains("Previous")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
          this.clickPreviousUntilDisabled();
        }
      });
  }

  getValidationMessage(element) {
    return element.invoke("prop", "validationMessage");
  }

  assertValidation(element, expectedMessage) {
    this.getValidationMessage(element).then((message) => {
      expect(message).to.equal(expectedMessage);
    });
  }
}

export default new AssetAllocationPage();
