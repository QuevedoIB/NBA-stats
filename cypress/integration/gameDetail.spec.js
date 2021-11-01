import { parseData } from "./spec";
import { formatDate } from "../../src/helpers/formatDate";

describe("Game detail flow", () => {
  beforeEach(() => {
    const date = "2021-10-28";
    cy.getPlayers();
    cy.visit("/");
    cy.getTeams();
    cy.getGames(date);

    cy.get("h3 input[type=date]").as("gamesDate").type(date);
    cy.get("@gamesDate").closest("details").as("gamesResults");

    cy.wait(["@fetchTeams", "@fetchGames"]).then(([teamsData, gamesData]) => {
      const {
        response: {
          body: { games },
        },
      } = gamesData;

      const game = games[0];
      const teams = parseData(teamsData);

      const hTeam = teams.find((e) => e.teamId === game.hTeam.teamId).fullName;
      const vTeam = teams.find((e) => e.teamId === game.vTeam.teamId).fullName;

      cy.intercept(
        "GET",
        `${Cypress.env("REACT_APP_API_ENDPOINT")}/v1/${date
          .split("-")
          .join("")}/${game.gameId}_boxscore.json`
      ).as("fetchGameDetails");

      cy.get("@gamesResults")
        .closest("details")
        .within(() => {
          if (game.hTeam.score || game.vTeam.score) {
            cy.contains(`${game.hTeam.score}-${game.vTeam.score}`)
              .closest("li")
              .as("gameCard");
          } else {
            cy.contains(formatDate(game.startTimeUTC, "en"))
              .closest("li")
              .as("gameCard");
          }

          cy.get("@gameCard").contains(`${hTeam}vs${vTeam}`).click();
        });

      return cy
        .wait("@fetchGameDetails")
        .then(({ response: { body: game } }) => {
          return { hTeam, vTeam, game };
        })
        .as("gameData");
    });
  });

  it("Game detail renders", () => {
    cy.get("@gameData").then(() => {
      cy.contains("NBA STATS");
    });
  });

  it("Game chart flow", () => {
    cy.get("@gameData").then(({ hTeam, vTeam, game }) => {
      cy.contains(hTeam);
      cy.contains(vTeam);

      cy.get(".recharts-cartesian-axis-ticks").within(() => {
        for (let i = 1; i <= game.basicGameData.period.current; i++) {
          cy.get("tspan").as("chartTicks").contains(`Q${i}`);
        }

        game.stats.activePlayers.forEach((player) => {
          cy.get("@chartTicks").contains(
            `${player.firstName} ${player.lastName}`
          );
        });

        const maxScoreDiffAxis =
          Math.ceil(
            Math.max(
              game.stats.hTeam.biggestLead,
              game.stats.vTeam.biggestLead
            ) / 10
          ) * 10;

        cy.get("@chartTicks").contains(0);
        cy.get("@chartTicks").contains(maxScoreDiffAxis / 2);
        cy.get("@chartTicks").contains(maxScoreDiffAxis);
      });
    });
  });
});
