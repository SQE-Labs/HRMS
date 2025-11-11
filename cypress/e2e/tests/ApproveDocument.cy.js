import sideBar from "../components/SideBar";
import ApproveDocumentPage from "../pages/ApproveDocumentPage";

beforeEach(() => {
  cy.login("superUser");
});

describe("Attendance Management - Approve Document", () => {

    it("HRMIS_EM_63: Verify the navigation of Approve Document page", () => {

        sideBar.navigateTo("Attendance & Leaves", "Approve Document");
        ApproveDocumentPage.approveDocumentHeader.should("be.visible").and("have.text", "Approve Document");
    });
});