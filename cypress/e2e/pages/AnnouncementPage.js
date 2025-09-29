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
    cy.get('input[placeholder="Enter title"]').type(title);
  }
  enterStartDateTime(dateTime) {
    cy.get('input[placeholder="YYYY-MM-DDTHH:mm:ss"]').eq(0).type(dateTime);
  }
  enterEndDateTime(dateTime) {
    cy.get('input[placeholder="YYYY-MM-DDTHH:mm:ss"]').eq(1).type(dateTime);
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
    cy.get('input[type="file"]').attachFile(filePath);
  }
  enterDescription(desc) {
    cy.get('textarea[placeholder="Enter description"]').type(desc);
  }
}

export default new AnnouncementPage();
