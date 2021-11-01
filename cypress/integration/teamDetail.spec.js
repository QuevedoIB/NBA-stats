import { parseData, getTranslation } from "./spec";
import { formatDate } from "../../src/helpers/formatDate";

describe("Team detail flow", () => {
  beforeEach(() => {
    cy.navigateTeams()
      .then((teams) => {
        const team = teams[0];
        cy.getPlayers();
        cy.getCalendar(team.urlName);

        cy.get("a").contains(team.fullName).click();

        cy.wait(["@fetchCalendar", "@fetchPlayers"], { timeout: 10000 }).then(
          ([calendarData, playersData]) => ({
            team,
            teams,
            games: parseData(calendarData),
            players: parseData(playersData),
          })
        );
      })
      .as("teamData");
  });

  it("Team detail renders", () => {
    cy.get("@teamData").then(({ team }) => {
      cy.get("h2").contains(team.fullName);
    });
  });

  it("Roster works", () => {
    cy.get("@teamData").then(({ team, players }) => {
      const teamPlayers = players.filter(
        (player) => player.teamId === team.teamId
      );

      cy.contains(getTranslation("roster.title"), { timeout: 10000 }).as(
        "title"
      );

      cy.get("@title").closest("details").find("table").as("rosterTable");

      cy.get("@rosterTable")
        .find("tr")
        .as("rosterRows")
        .should("have.length", teamPlayers.length);

      teamPlayers.forEach((player) => {
        cy.get("@rosterRows")
          .contains(
            `${player.jersey ? `${player.jersey} - ` : ""}${player.firstName} ${
              player.lastName
            }`
          )
          .closest("tr")
          .as("playerRow");

        cy.get("@playerRow").within(() => {
          player.heightMeters && cy.contains(`${player.heightMeters}m`);
          player.weightKilograms && cy.contains(`${player.weightKilograms}kg`);
          cy.contains(getTranslation(`basketballPositions.${player.pos}`));
        });
      });

      cy.get("@title").click();
      cy.get("@rosterTable").should("not.be.visible");
      cy.get("@title").click();
      cy.get("@rosterTable").should("be.visible");
    });
  });

  it("Calendar works", () => {
    cy.get("@teamData").then(({ team, teams, games }) => {
      cy.contains(getTranslation("calendar.title"), { timeout: 10000 }).as(
        "title"
      );

      cy.get("@title").closest("details").find("ul").as("gamesList");

      games.forEach((game) => {
        cy.get("@gamesList").within(() => {
          const hTeam = teams.find((e) => e.teamId === game.hTeam.teamId);
          const vTeam = teams.find((e) => e.teamId === game.vTeam.teamId);

          if (game.hTeam.score || game.vTeam.score) {
            cy.contains(`${game.hTeam.score}-${game.vTeam.score}`)
              .closest("li")
              .as("gameCard");
          } else {
            cy.contains(formatDate(game.startTimeUTC, "en"))
              .closest("li")
              .as("gameCard");
          }

          cy.get("@gameCard").contains(`${hTeam.fullName}vs${vTeam.fullName}`);
        });
      });

      cy.get("@title").click();
      cy.get("@gamesList").should("not.be.visible", { timeout: 20000 });

      cy.get("@title").click({ timeout: 20000 });
      cy.get("@gamesList").should("be.visible", { timeout: 20000 });
    });
  });
});
