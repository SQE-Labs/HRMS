import BasePage from "./BasePage";
import "cypress-xpath";
// import Loaders from "../components/Loaders";

class ApproveDocumentPage extends BasePage{
    
    //Locators
    get approveDocumentHeader(){
        return cy.xpath("//h1[text()='Approve Document']");
    }
    get selectEmployeeDrp() {
        return cy.get("#react-select-2-input");
    }
    get submitBtn() {
        return cy.get("div.modal-footer button[type='submit']");
    }
    get chooseFile() {
        return cy.get("#file-input");
    }
    get commnetTxtArea() {
        return cy.get("textarea[name='comment']");
    }
    get selectEmployeeInput() {
      return cy.get('#react-select-3-input');
}
    get actionbutton(){
        return cy.xpath("//button[@class='btn btn-secondary' and text()='Action']");
    }
    get documantAction(){
      return cy.get("#documentAction");
    }
    get submitRejectBtn(){
      return cy.get("button[type='submit'");
    }
    get commentArea(){
      return cy.get("textarea[class='border']");
    }
    get succMsg_Upload(){
      return cy.xpath("//div[contains(text(),'PAN Card Uploaded Successfully.')]");
    }
    get succMsg_Approve(){
      return cy.xpath("//div[contains(text(),'Document Approval Status Changed to rejected')]");
    }





    //Methods
    selectEmployee(text) {
    cy.selectDrpValueByText(
      this.selectEmployeeDrp,
      text,
      true,
      this.selectEmployeeDrp
    );
  }

  panCardActBtn(text) {
  return cy.get('tbody tr', { timeout: 10000 })
    .filter((index, el) => {
      const thirdTd = el.querySelectorAll('td')[1]; // 2nd index if counting from 0: S.No., Document Name, ...
      return thirdTd && thirdTd.innerText.trim() === text;
    })
    .find('i.fa.fa-upload')
    .should('be.visible');
}

clickOnUploadAct(text) {
  this.panCardActBtn(text)
    .scrollIntoView()
    .click({ force: true });
  cy.log(`✅ Clicked on the Upload icon for ${text}`);
}

  selectSamplePdf(filePath) {
    this.chooseFile.selectFile(filePath);
    cy.log("PDF file is Selected");
  }
  enterComments(){
    this.commnetTxtArea.click().type("Commented");
  }

  clickOnSubmitBnt() {
    this.submitBtn.click();
  }

  selectEmployeeDocument(text) {
  this.selectEmployeeInput
    .click({ force: true })
    .type(text, { force: true })
}

  
  clickOnActBtn(){
    this.actionbutton.click();
  }
  selectRejectOption(optionText) {
  this.documantAction.select(optionText);
  cy.log(`✅ Selected option: ${optionText}`);
}
  enterRejectComments(){
    this.commentArea.click().type("Commented");
  }
  clickOnSubmitBtn(){
    this.submitRejectBtn.click();
  }
  assertValMsg_Field() {
    cy.get("#documentAction").then(($el) => {
      expect($el[0].validationMessage).to.eq(
        "Please select an item in the list."
      );
    });
  }
  assertValMsg_Reason(){
    cy.get("textarea[class='border']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  assertValMsg_Comment(){
    cy.get("textarea[name='comment']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  assertSuccMsg_Upload(){
    this.succMsg_Upload.should("contain.text", "PAN Card Uploaded Successfully.");
  }
  assertSuccMsg_Approve(){
    this.succMsg_Approve.should("contain.text", "Document Approval Status Changed to rejected");
  }
}

export default new ApproveDocumentPage();