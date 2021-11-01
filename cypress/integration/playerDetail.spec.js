import { getTranslation } from "./spec";

describe("Player detail flow", () => {
  const getPlayerName = (player) => `${player.firstName} ${player.lastName}`;
  beforeEach(() => {
    cy.navigateDetail("players").then(({ players, teams }) => {
      const selected = players[0];

      cy.get("section [data-testid=player-filters] input").type(
        `${selected.firstName} ${selected.lastName}`
      );

      cy.get("section ul a li:first").click();

      return cy
        .contains("NBA STATS")
        .then(() => ({ selected, players, teams }))
        .as("screenData");
    });
  });
  it("Player detail renders", () => {
    cy.get("@screenData");
  });

  it("Player card flow", () => {
    const validatePlayerData = ({ player, containerAllias, teams }) => {
      cy.get(containerAllias).within(($card) => {
        cy.get(`img[alt="${getPlayerName(player)}"]`);

        cy.contains(
          `${getTranslation("common.position")}: ${getTranslation(
            `basketballPositions.${player?.pos}`
          )}`
        );

        cy.contains(
          `${getTranslation("common.debut")}: ${player?.nbaDebutYear || ""}`
        );

        const playerTeam = teams.find(
          (team) => team.teamId === player.teamId
        ).fullName;

        cy.contains(`${getTranslation("common.team")}: ${playerTeam}`);
      });
    };

    cy.get("@screenData").then(({ selected, players, teams }) => {
      cy.get("section article h3")
        .contains(`${selected.firstName} ${selected.lastName}`)
        .parent()
        .as("selectedPlayerCard");

      validatePlayerData({
        player: selected,
        containerAllias: "@selectedPlayerCard",
        teams,
      });

      const secondPlayer = players.find(
        (e) => e.personId !== selected.personId
      );

      cy.get("section article input")
        .as("searchPlayerInput")
        .type(getPlayerName(secondPlayer));

      cy.get("@searchPlayerInput")
        .parent()
        .find("li")
        .contains(getPlayerName(secondPlayer))
        .click();

      cy.get("@searchPlayerInput").closest("article").as("secondPlayerCard");

      validatePlayerData({
        player: secondPlayer,
        containerAllias: "@secondPlayerCard",
        teams,
      });
    });
  });
  it("Charts flow", () => {
    const validateChartLegend = ({ player, secondPlayer, containerAllias }) => {
      cy.get(containerAllias).within(() => {
        cy.get("span.recharts-legend-item-text")
          .as("legendItem")
          .contains(getPlayerName(player));
        cy.get("@legendItem").contains(getPlayerName(secondPlayer));
      });
    };

    cy.get("@screenData").then(({ selected, players }) => {
      const secondPlayer = players.find(
        (e) => e.personId !== selected.personId
      );

      cy.get("section article input")
        .as("searchPlayerInput")
        .type(getPlayerName(secondPlayer));

      cy.get("@searchPlayerInput")
        .parent()
        .find("li")
        .contains(getPlayerName(secondPlayer))
        .click();

      //Polygon chart
      cy.get("section article")
        .contains(`${getTranslation("stats.titles.percentChart")}`)
        .closest("article")
        .as("shotChart");

      const shotLabels = [
        getTranslation("stats.3pts"),
        getTranslation("stats.2pts"),
        getTranslation("stats.1pts"),
      ];

      shotLabels.forEach((label) =>
        cy.get("@shotChart").find("tspan").contains(label)
      );

      validateChartLegend({
        player: selected,
        secondPlayer,
        containerAllias: "@shotChart",
      });

      //Polygon chart
      cy.get("section article")
        .contains(`${getTranslation("stats.titles.overallPerMinute")}`)
        .closest("article")
        .as("minuteChart");

      const minutesLabels = [
        getTranslation("stats.points"),
        getTranslation("stats.rebounds", { ending: "" }),
        getTranslation("stats.assists"),
        getTranslation("stats.blocks"),
        getTranslation("stats.steals"),
      ];

      minutesLabels.forEach((label) =>
        cy.get("@minuteChart").find("tspan").contains(label)
      );

      validateChartLegend({
        player: selected,
        secondPlayer,
        containerAllias: "@minuteChart",
      });

      //Bar chart
      cy.get("section article")
        .contains(`${getTranslation("stats.titles.overall")}`)
        .closest("article")
        .as("overallChart");

      const overallLabels = [
        getTranslation("stats.assists"),
        getTranslation("stats.blocks"),
        getTranslation("stats.steals"),
        getTranslation("stats.turnovers"),
        getTranslation("stats.rebounds", {
          ending: getTranslation("stats.types.offensive"),
        }),
        getTranslation("stats.rebounds", {
          ending: getTranslation("stats.types.defensive"),
        }),
        getTranslation("stats.rebounds", {
          ending: getTranslation("stats.types.total"),
        }),
        getTranslation("stats.fouls"),
        getTranslation("stats.points"),
        getTranslation("stats.games", {
          ending: getTranslation("stats.types.total"),
        }),
        getTranslation("stats.games", {
          ending: getTranslation("stats.types.titular"),
        }),
        getTranslation("stats.plusMinus"),
        getTranslation("stats.minutes"),
        getTranslation("stats.doubles"),
        getTranslation("stats.triples"),
      ];

      overallLabels.forEach((label) =>
        cy.get("@overallChart").find("tspan").contains(label)
      );

      validateChartLegend({
        player: selected,
        secondPlayer,
        containerAllias: "@overallChart",
      });
    });
  });
});
