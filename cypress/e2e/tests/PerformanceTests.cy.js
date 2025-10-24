import PerformancePage from "../pages/PerformancePage";
import sideBar from "../components/SideBar";

describe("Performance Dashboard Form Automation", () => {
  beforeEach(() => {
    cy.login("superUser");
    sideBar.navigateTo("Performance");
  });

  it("should fill out and submit the performance form successfully @Bug", () => {
    PerformancePage.checkCertificationNone();
    PerformancePage.fillOtherCertifications("N.A.");
    PerformancePage.checkExercisesNone();
    PerformancePage.selectMockInterviews("3");
    PerformancePage.fillMockInterviewDetails("N.A.");
    PerformancePage.selectExpertLedSessions("2-3");
    PerformancePage.fillCoffeeNLearnDetails("N.A.");

    PerformancePage.selectRadioByLabel(
      "Are you a MuleSoft Meetup Leader?",
      "No"
    );
    PerformancePage.selectRadioByLabel("Are you a MuleSoft Mentor?", "No");
    PerformancePage.selectRadioByLabel("Are you a MuleSoft Ambassador?", "No");
    PerformancePage.selectRadioByLabel(
      "Have you completed the Caelius AI Enablement Program?",
      "No"
    );
    PerformancePage.selectRadioByLabel(
      "Have you appeared as a speaker in any of the MuleSoft Meetups?",
      "No"
    );
    PerformancePage.fillTextareaByLabel(
      "If you appeared as a speaker in any of the MuleSoft Meetups",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel(
      "Have you presented at any MuleSoft or Salesforce events other than Meetup as a speaker?",
      "N.A."
    );
    PerformancePage.selectRadioByLabel(
      "How many Salesforce Sessions have you presented during the last 12 months?",
      "0"
    );
    PerformancePage.fillTextareaByLabel(
      "How many employees have you assisted during the Review Period as a Training Buddy?",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel(
      "How many employees have you assisted during the Review Period as a Mentor/Advisor/Lead?",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel(
      "How many reviews have you taken as a Reviewer?",
      "N.A."
    );
    PerformancePage.selectRadioByid("projectsUndertaken", "2");
    PerformancePage.fillTextareaByLabel("Project Details", "N.A.");
    PerformancePage.fillTextareaByLabel(
      "How many code reviews have you taken in the past 12 months? Please attach the code review link.",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel(
      "How many code reviews have you taken in the past 12 months? Please attach the code review sheet/PR Link.",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel(
      "How many architectural solutions have you designed for use cases in the past 12 months?",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel("Achievements/Appreciations", "N.A.");
    PerformancePage.fillTextareaByLabel(
      "Did you receive a CSAT score of 5/5 on any projects in the last 12 months?",
      "N.A."
    );

    PerformancePage.selectRadioByid("responsiveness", "2");

    PerformancePage.fillSelfRatings(
      [
        "Knowledge of Job Skills",
        "Technical Skills",
        "Communication & Listening Skills",
        "Ability to Work Across Different Teams",
        "Flexibility to Work in Different Time Zones",
        "Inclusiveness",
        "Initiative and Creativity",
      ],
      "8"
    );

    PerformancePage.fillTextareaByLabel(
      "Write about the initiatives taken by you",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel(
      "Are there any specific areas of training or development where you want to improve",
      "N.A."
    );
    PerformancePage.fillTextareaByLabel(
      "Anything else that you want to share with us?",
      "N.A."
    );

    PerformancePage.submitForm();

    // Update the message below to match the actual success message shown after submission
    PerformancePage.validateSuccessMessage(
      "Performance review submitted successfully"
    );
  });
});
