describe("Teams flow", () => {
  beforeEach(() => {
    cy.navigateTeams().as("teams");
  });

  it("Teams list works", () => {
    cy.get("@teams").then((teams) => {
      teams.forEach((team) => {
        cy.contains(team.divName).parent().contains(team.fullName);
      });

      cy.contains(teams[0].fullName).click();

      cy.url().should(
        "eql",
        `http://localhost:3000/team-detail/${teams[0].teamId}`
      );
    });
  });
});
