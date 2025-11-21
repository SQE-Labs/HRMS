import BasePage from "./BasePage";
import "cypress-xpath";


class ProjectListPage extends BasePage{

    //Locators
    get projectListHeader(){
        return cy.xpath("//h1[text()='Project List']");
    }
    get createBtn(){
        return cy.xpath("//a[text()='Create Project']");
    }
    get createProjectHeader(){
        return cy.xpath("//h1[text()='Create Project']");
    }
    get pjName(){
        return cy.xpath("//input[@name='projectName']");
    }
    get submitBtn(){
        return cy.xpath("//button[@type='submit']");
    }


    //Methods
    createProjectBtn(){
        this.createBtn.click();
    }
    projectName(text){
        this.pjName
            .should('be.visible')
            .clear()
            .type(text);
    }
    assertValMsg_Field(){
    cy.xpath("//input[@name='projectName']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  clickSubmitBtn(){
    this.submitBtn.click();
  }
}

export default new ProjectListPage();