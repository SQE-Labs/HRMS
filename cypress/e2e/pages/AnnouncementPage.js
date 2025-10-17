import "cypress-xpath";

class AnnouncementPage {
  get newAnnouncementHeader() {
    return cy.contains("New Announcement");
  }
  get createAnnouncementBtn() {
    return cy.contains("+ Create Announcement");
  }
  get createAnnouncementHeader() {
    return cy.xpath("//h5[contains(text(), 'Create')]");
  }
  get submitBtn() {
    return cy.contains("button", "Submit");
  }
  get successMsg() {
    return cy.contains("Announcement created successfully");
  }

  selectEventType(type) {
    cy.get("#eventType").first().select(type);
  }
  enterTitle(title) {
    cy.get('input[placeholder="Enter title"]').type(title);
  }
  enterStartDateTime() {
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const startTime = `${formattedDate}T14:30:00`; // 2:30 PM

  cy.xpath('(//input[@placeholder="YYYY-MM-DDTHH:mm:ss"])[1]')
    .should('exist')
    .scrollIntoView()
    .click({ force: true })
    .clear({ force: true })
    .type(startTime, { force: true })
    .should('have.value', startTime)
    .blur();

  // Close any popup that may appear
  cy.get('body').click(0, 0);
  }

  enterEndDateTime() {
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const endTime = `${formattedDate}T15:30:00`; // 3:30 PM

  // Ensure previous datepicker is closed
  cy.get('body').click(0, 0);

  cy.xpath('(//input[@placeholder="YYYY-MM-DDTHH:mm:ss"])[2]')
    .should('exist')
    .scrollIntoView()
    .click({ force: true })
    .clear({ force: true })
    .type(endTime, { force: true })
    .should('have.value', endTime)
    .blur();

  // ✅ Extra step to close the datepicker overlay
  cy.get('body').click(0, 0);  // click outside
  cy.wait(500);                // short wait to ensure overlay closes
  cy.get('.react-datepicker__day-names').should('not.exist');
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
