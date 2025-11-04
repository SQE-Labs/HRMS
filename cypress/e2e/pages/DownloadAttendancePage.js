import BasePage from "./BasePage";
import "cypress-xpath";
import Loaders from "../components/Loaders";
import selectDrpValueByText from "../../support/utils";

class DownloadAttendancePage extends BasePage{

    //Locators
    get downloadAttendanceHeader(){
        return cy.xpath("//h1[text()='Download Attendance']");
    }
    get empMonth(){
        return cy.get("#month");
    }
    get empYear(){
        return cy.get("#year");
    }
    get empFlag(){
        return cy.get("#employee-flag");
    }
    get employee(){
        return cy.get("#react-select-3-input");
    }
    get resetButton() {
        return cy.xpath("//button[(text())='Reset']");
    }
    get downloadButton(){
        return cy.xpath("//button[(text())='Compile & Download']");
    }


    //Methods
    selectMonth(month) {
    this.empMonth.select(month);
    cy.log("Employee Month is selected");
    }

    selectYear(year) {
        this.empYear.select(year);
        cy.log("Employee Year is selected");
    }

    selectEmpFlag(flag) {
        this.empFlag.select(flag);
        cy.log("Employee Flag is selected");
    }
    selectEmployee(empl){
      cy.selectDrpValueByText(
      this.employee,
      empl,
      true,
      this.employee
    );
    cy.log("Employee is selected");
  }

    clickResetButton() {
        this.resetButton.click();
        Loaders.threeDotLoading.should("not.exist");
        cy.log("Clicked on Reset Button");
    }

    clickDownloadButton() {
        this.downloadButton.click({ force: true });
        cy.log("Clicked on Download Button");
        // Loaders.spinnerLoading.should("not.exist", {timeout:40000});
        cy.wait(40000);
        cy.log("Download completed, spinner disappeared");
    }
}
export default new DownloadAttendancePage();