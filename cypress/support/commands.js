Cypress.Commands.add("getPlayers", () => {
  cy.intercept(
    "GET",
    `${Cypress.env("REACT_APP_API_ENDPOINT")}/v1/2021/players.json`
  )
    .as("fetchPlayers")
    .then((data) => {
      if (!data) return;
      const {
        response: {
          body: {
            league: { standard: players },
          },
        },
      } = data;
      return players;
    });
});

Cypress.Commands.add("goToPlayerDetail", () => {
  cy.getPlayers();
  cy.getTeams();

  cy.visit("http://localhost:3000/players");

  cy.wait(["@fetchTeams", "@fetchPlayers"]).then(([teamsData, playersData]) => {
    const parseData = (data) => data.response.body.league.standard;
    const players = parseData(playersData);

    cy.get("section [data-testid=player-filters] input")
      .as("playerFilters")
      .type(`${players[0].firstName} ${players[0].lastName}`);

    return cy
      .get("section ul a li:first")
      .click()
      .then(() => ({
        selected: players[0],
        players,
        teams: parseData(teamsData),
      }));
  });
});

Cypress.Commands.add("getTeams", () => {
  cy.intercept(
    "GET",
    `${Cypress.env("REACT_APP_API_ENDPOINT")}/v2/2021/teams.json`
  )
    .as("fetchTeams")
    .then((data) => {
      if (!data) return;
      const {
        response: {
          body: {
            league: { standard: teams },
          },
        },
      } = data;
      return teams;
    });
});
