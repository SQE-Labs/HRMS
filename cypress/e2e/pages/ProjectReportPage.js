import BasePage from "./BasePage";
import "cypress-xpath";
import { selectDrpValueByText } from "../../support/utils";


class ProjectReportPage extends BasePage{
    //Locators
    get projectReportHeader(){
        return cy.xpath("//h1[text()='Project Report']");
    }
    get projectPerformanceHeader(){
        return cy.xpath("//h5[text()=' Project Performance Report']");
    }
    get downloadButton() {
        return cy.xpath("//button[contains(text(),'Download')]");
    }




    //Methods
    selectFilter(filterValue){
        cy.get('#filter').select(filterValue);
    }
    selectName(name){   
        cy.get('#secondDropdown').select(name);
    }
    clickDownloadButton() {
    this.downloadButton.click({ force: true });
  }
}

export default new ProjectReportPage();