import sideBar from "../components/SideBar";
import AnnouncementPage from "../pages/AnnouncementPage";
import { generateRandomString } from "../../support/utils";

describe("Announcement Management - Create Announcement", () => {
  beforeEach(() => {
    cy.login("superUser");
  });

  it("HRMIS_ANN_1: Verify creation of a new announcement", () => {
    sideBar.navigateTo("Announcements", "New Announcement");
    AnnouncementPage.newAnnouncementHeader
      .should("be.visible")
      .and("have.text", "New Announcement");
    AnnouncementPage.createAnnouncementBtn.click();
    // AnnouncementPage.createAnnouncementHeader
    //   .should("be.visible")
    //   .and("have.text", "Create Announcement");
    cy.get("#eventType option").then((options) => {
      const actual = [...options].map((o) => o.text);
      expect(actual).to.deep.eq([
        "Select event type",
        "Classroom Session",
        "Coffee & Learn Session",
        "MuleSoft Meetups",
        "Salesforce Session",
        "Display Announcement",
      ]);
    });
    cy.get("#eventType")
      .select("Classroom Session")
      .should("have.value", "Classroom Session");

    // Fill the form
    const title = `Test Announcement ${generateRandomString(4)}`;
    AnnouncementPage.enterTitle(title);
    AnnouncementPage.enterStartDateTime();
    AnnouncementPage.enterEndDateTime();
    AnnouncementPage.enterPresentedBy("Test Presenter");
    AnnouncementPage.enterVenue("Test Venue");
    AnnouncementPage.enterMode("Online");
    AnnouncementPage.uploadFile("cypress/fixtures/resources/dummy.pdf");
    AnnouncementPage.enterDescription("This is a test announcement.");
    AnnouncementPage.submitBtn.click();

    // Assert success (update selector/message as per actual app)
    AnnouncementPage.successMsg.should("be.visible");
    AnnouncementPage.validateAnnouncementInList(title, "pending");
  });
});
