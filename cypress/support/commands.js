import { parseData } from "../integration/spec";

const currentYear = new Date().getFullYear();

Cypress.Commands.add("getPlayers", () => {
  cy.intercept(
    "GET",
    `${Cypress.env("REACT_APP_API_ENDPOINT")}/v1/2021/players.json`
  )
    .as("fetchPlayers")
    .then((data) => {
      const players = parseData(data);
      return players;
    });
});

Cypress.Commands.add("getTeams", () => {
  cy.intercept(
    "GET",
    `${Cypress.env("REACT_APP_API_ENDPOINT")}/v2/${currentYear}/teams.json`
  )
    .as("fetchTeams")
    .then((data) => {
      const teams = parseData(data);
      return teams;
    });
});

Cypress.Commands.add("getCalendar", (team) => {
  cy.intercept({
    method: "get",
    url: `${Cypress.env(
      "REACT_APP_API_ENDPOINT"
    )}/v1/2021/teams/${team}/schedule.json`,
  })
    .as("fetchCalendar")
    .then((data) => {
      const games = parseData(data);
      return games;
    });
});

Cypress.Commands.add("getGames", (date = "2021-10-28") => {
  cy.intercept(
    "GET",
    `https://data.nba.net/10s/prod/v1/${date
      .split("-")
      .join("")}/scoreboard.json`
  ).as("fetchGames");
});

Cypress.Commands.add("navigateTeams", () => {
  cy.getTeams();

  cy.visit("/teams");

  cy.wait("@fetchTeams", { timeout: 10000 }).then((data) => {
    const teams = parseData(data);
    const nbaTeams = teams.filter((e) => e.isNBAFranchise);
    return nbaTeams;
  });
});

Cypress.Commands.add("navigateDetail", (route = "") => {
  cy.getPlayers();
  cy.getTeams();

  cy.visit(`/${route}`);

  cy.wait(["@fetchTeams", "@fetchPlayers"], { timeout: 10000 }).then(
    ([teamsData, playersData]) => {
      const players = parseData(playersData);
      const teams = parseData(teamsData);

      return { players, teams };
    }
  );
});
