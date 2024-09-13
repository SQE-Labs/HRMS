import BasePage from "./BasePage";


class Homepage extends BasePage{


navigateToHomePage(){
    cy.visit("https://topuptalent.com/");
   }    

} 

export default new Homepage();