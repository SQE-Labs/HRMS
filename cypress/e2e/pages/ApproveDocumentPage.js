import BasePage from "./BasePage";
import "cypress-xpath";
// import Loaders from "../components/Loaders";

class ApproveDocumentPage extends BasePage{
    
    //Locators
    get approveDocumentHeader(){
        return cy.xpath("//h1[text()='Approve Document']");
    }






    //Methods
}

export default new ApproveDocumentPage();