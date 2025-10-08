// cypress/e2e/pages/AnnouncementPage.js
import "cypress-xpath";

class AnnouncementPage {
  get newAnnouncementHeader() {
    return cy.contains("New Announcement");
  }
  get createAnnouncementBtn() {
    return cy.contains("+ Create Announcement");
  }
  get createAnnouncementHeader() {
    return cy.contains("Create Announcement");
  }
  get submitBtn() {
    return cy.contains("button", "Submit");
  }
  get successMsg() {
    return cy.contains("Announcement created successfully"); // Update as per actual success message
  }

  selectEventType(type) {
    cy.get("select").first().select(type);
  }
  enterTitle(title) {
    cy.get('input[placeholder="Enter title"]')
      .clear({ force: true })
      .type(title, { force: true });
  }
  enterStartDateTime() {
    // open date picker
    cy.get('input[placeholder="YYYY-MM-DDTHH:mm:ss"]').eq(0).click();

    // select date (1st October 2025)
    cy.xpath("//div[text()='7']").click();

    // select time (10:00 AM)
    cy.xpath("//li[text()='10:00 AM']").click();
  }
  enterEndDateTime() {
    // open date picker
    cy.get('input[placeholder="YYYY-MM-DDTHH:mm:ss"]').eq(1).click();

    // select date (1st October 2025)
    cy.xpath("//div[text()='7']").click();

    // select time (10:00 AM)
    cy.xpath("//li[text()='10:00 AM']").click();
  }
  clickOutside() {
    cy.get(".col-md-2").first().click(); // Click outside to close datetime picker
  }
  enterPresentedBy(name) {
    cy.get('input[placeholder="Enter presenter name"]').type(name);
  }
  enterVenue(venue) {
    cy.get('input[placeholder="Enter venue"]').type(venue);
  }
  enterMode(mode) {
    cy.get('input[placeholder="Enter mode"]').type(mode);
  }
  uploadFile(filePath) {
    cy.get('input[type="file"]').selectFile(filePath);
  }
  enterDescription(desc) {
    cy.get('textarea[placeholder="Enter description"]').type(desc);
  }
  validateAnnouncementInList(title) {
    cy.xpath(`//td[@data-title='title' and text()='${title}']`).should("exist");
  }
}

export default new AnnouncementPage();
