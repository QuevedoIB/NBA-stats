describe("Teams flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/teams");
  });

  it("Teams list works", () => {
    cy.intercept("GET", "https://data.nba.net/10s/prod/v2/2021/teams.json").as(
      "teams"
    );

    cy.wait("@teams").then(
      ({
        response: {
          body: {
            league: { standard },
          },
        },
      }) => {
        const nbaTeams = standard.filter((e) => e.isNBAFranchise);

        nbaTeams.forEach((team) => {
          cy.contains(team.divName).parent().contains(team.fullName);
        });

        cy.contains(nbaTeams[0].fullName).click();

        cy.url().should(
          "eql",
          `http://localhost:3000/team-detail/${nbaTeams[0].teamId}`
        );
      }
    );
  });
});
