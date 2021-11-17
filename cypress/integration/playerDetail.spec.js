import i18n from "../../src/i18n";

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
          `${i18n.t("common.position")}: ${i18n.t(
            `basketballPositions.${player?.pos}`
          )}`
        );

        cy.contains(`${i18n.t("common.debut")}: ${player?.nbaDebutYear || ""}`);

        const playerTeam = teams.find(
          (team) => team.teamId === player.teamId
        ).fullName;

        cy.contains(`${i18n.t("common.team")}: ${playerTeam}`);
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
        .contains(`${i18n.t("stats.titles.percentChart")}`)
        .closest("article")
        .as("shotChart");

      const shotLabels = [
        i18n.t("stats.3pts"),
        i18n.t("stats.2pts"),
        i18n.t("stats.1pts"),
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
        .contains(`${i18n.t("stats.titles.overallPerMinute")}`)
        .closest("article")
        .as("minuteChart");

      const minutesLabels = [
        i18n.t("stats.points"),
        i18n.t("stats.rebounds", { ending: "" }),
        i18n.t("stats.assists"),
        i18n.t("stats.blocks"),
        i18n.t("stats.steals"),
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
        .contains(`${i18n.t("stats.titles.overall")}`)
        .closest("article")
        .as("overallChart");

      const overallLabels = [
        i18n.t("stats.assists"),
        i18n.t("stats.blocks"),
        i18n.t("stats.steals"),
        i18n.t("stats.turnovers"),
        i18n.t("stats.rebounds", {
          ending: i18n.t("stats.types.offensive"),
        }),
        i18n.t("stats.rebounds", {
          ending: i18n.t("stats.types.defensive"),
        }),
        i18n.t("stats.rebounds", {
          ending: i18n.t("stats.types.total"),
        }),
        i18n.t("stats.fouls"),
        i18n.t("stats.points"),
        i18n.t("stats.games", {
          ending: i18n.t("stats.types.total"),
        }),
        i18n.t("stats.games", {
          ending: i18n.t("stats.types.titular"),
        }),
        i18n.t("stats.plusMinus"),
        i18n.t("stats.minutes"),
        i18n.t("stats.doubles"),
        i18n.t("stats.triples"),
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
