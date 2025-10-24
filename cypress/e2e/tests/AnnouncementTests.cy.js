import sideBar from "../components/SideBar";
import AnnouncementPage from "../pages/AnnouncementPage";
import { generateRandomString } from "../../support/utils";

describe("Announcement Management - Create Announcement", () => {
  beforeEach(() => {
    cy.login("superUser");
  });

  it("HRMIS_ANN_1: Verify creation of a new announcement", { retries: 2 }, () => {
    sideBar.navigateTo("Announcements", "New Announcement");
    AnnouncementPage.newAnnouncementHeader
      .should("be.visible")
      .and("have.text", "New Announcement");
    AnnouncementPage.createAnnouncementBtn.click();
    AnnouncementPage.createAnnouncementHeader
      .should("be.visible")
      .and("have.text", "Create Announcement");

    // Fill the form
    AnnouncementPage.selectEventType("Salesforce Session");
    const title = `Test Announcement ${generateRandomString(4)}`;
    AnnouncementPage.enterTitle(title);
    AnnouncementPage.enterStartDateTime("2025-10-01T10:00:00");
    AnnouncementPage.enterEndDateTime("2025-10-01T12:00:00");
    AnnouncementPage.enterPresentedBy("Test Presenter");
    AnnouncementPage.enterVenue("Test Venue");
    AnnouncementPage.enterMode("Online");
    AnnouncementPage.uploadFile("resources/Sample.html");
    AnnouncementPage.enterDescription("This is a test announcement.");
    AnnouncementPage.submitBtn.click();

    // Assert success (update selector/message as per actual app)
    AnnouncementPage.successMsg.should("be.visible", { timeout: 10000 });
  });
});
