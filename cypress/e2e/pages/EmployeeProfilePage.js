import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils';
import Loaders from "../components/Loaders";


class EmployeeProfilePage extends BasePage {

    // Locators 
   
    get assetTab(){return cy.get("#tab4-tab")}
    get noRecordInfo(){return cy.get("#tab4 div.table-responsive div ")}
    get refershbutton(){return cy.get("#tab4 div button")}
  
    // Methods 
    clickOnAssetTab(){
    this.assetTab.click();
    Loaders.threeDotLoading.should('not.exist');
   }

   validateNoRecordInfo(){
    this.refershbutton.should('be.visible');
    this.noRecordInfo.should('have.text','No records available');
   }
    
}


export default new EmployeeProfilePage();