describe("Home flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Home renders", () => {
    cy.contains("NBA STATS");
    cy.get("[data-testid=shimmer]");
  });

  it("Language translations works", () => {
    cy.contains("Players");

    cy.get("[data-testid=language-select]").click();

    cy.contains("Spanish").click();

    cy.contains("Jugadores");
  });

  it("Dark mode works", () => {
    cy.get("body").as("body").should("not.have.class", "theme-dark");
    cy.get("input[type=checkbox]").click();
    cy.get("@body").should("have.class", "theme-dark");
  });

  it("Standings table flow works", () => {
    cy.get("table tbody")
      .as("standingsTable")
      .children()
      .then(($standingRows) => {
        expect($standingRows.length).to.equal(32); //30 teams + conference labels
      });

    cy.get("@standingsTable").contains("East");
    cy.get("@standingsTable").contains("West");

    const today = new Date();
    cy.contains(`Standings ${today.getFullYear()}`)
      .as("standingsTitle")
      .click();

    cy.get("@standingsTable").should("not.be.visible");

    cy.get("@standingsTitle").click();

    cy.get("@standingsTable").should("be.visible");
  });

  it("Games results flow works", () => {
    cy.get("h3 input[type=date]").as("gamesDate").type("2021-10-28");

    cy.get("@gamesDate").closest("summary").as("gamesResultsTitle");

    cy.get("@gamesResultsTitle")
      .siblings()
      .as("gamesResultsBody")
      .find("li")
      .should("have.length", 6)
      .should("be.visible");

    cy.get("@gamesResultsTitle").click("left");

    cy.get("@gamesResultsBody").should("not.be.visible");

    cy.get("@gamesResultsTitle").click("left");

    cy.get("@gamesResultsBody").should("be.visible");
  });

  it("Newsfeed flow works", () => {
    cy.contains("NBA News")
      .closest("summary")
      .siblings()
      .find("a")
      .each(($link) => {
        expect($link).to.have.attr("href");
      });
  });

  it("Navbar flow works", () => {
    cy.get("nav a").as("navigationLinks");

    cy.get("@navigationLinks").contains("Teams").click();

    cy.url().should("eq", "http://localhost:3000/teams");

    cy.go("back");

    cy.get("@navigationLinks").contains("Players").click();

    cy.url().should("eq", "http://localhost:3000/players");
  });
});

describe("Players flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/players");
  });

  it("List works", () => {
    cy.get("section ul li").then(($players) => {
      const initialPlayersAmount = $players.toArray().length;
      cy.scrollTo("bottom");
      cy.wait(2000);

      cy.get("section ul li").then(($scrolledPlayers) => {
        const afterScrollPlayers = $scrolledPlayers.toArray().length;
        expect(afterScrollPlayers).to.be.greaterThan(initialPlayersAmount);

        cy.scrollTo("bottom");
        cy.wait(2000);

        cy.get("section ul li").then(($lastPlayers) => {
          const lastScrollPlayers = $lastPlayers.toArray().length;
          expect(lastScrollPlayers).to.be.greaterThan(initialPlayersAmount);
        });
      });

      cy.get("button span").contains("↑").click();

      cy.wait(1000);

      cy.window().then(($window) => {
        expect($window.scrollY).to.eql(0);
      });
    });
  });

  it("Filters work", () => {
    const team = "Los Angeles Lakers";
    const playerPosition = "Forward";

    cy.get("section ul")
      .as("playerList")
      .find("li:first p:first")
      .then(([$playerTitle]) => {
        const playerName = $playerTitle.innerText;
        cy.get("section [data-testid=player-filters]").as("playerFilters");

        cy.get("@playerFilters").find("input").type(playerName.slice(0, -1));

        cy.get("@playerFilters")
          .find("ul li")
          .contains(playerName)
          .click()
          .should("not.exist");

        cy.get("@playerList")
          .find("li")
          .each(($player, i, $list) => {
            if (i === $list.length - 1) return; //observer
            cy.wrap($player).contains(playerName);
          });

        cy.get("@playerFilters").find("input").clear();

        cy.get("@playerFilters").find("button").contains("Filters").click();

        cy.get("option[name=Team]").parent().select(team);
        cy.get("option[name=Position]").parent().select(playerPosition);
        cy.get("button").contains("Accept").click();

        cy.get("@playerList")
          .find("li")
          .each(($player, i, $list) => {
            if (i === $list.length - 1) return; //observer
            cy.wrap($player).get(`img[title="${team}"]`);
            cy.wrap($player).contains(playerPosition);
          });

        cy.get("button").contains("Clear filters").click();

        cy.get("@playerFilters").find("button").contains("Filters").click();
        cy.get("option[name=Team]").parent().should("have.value", "");
        cy.get("option[name=Position]").parent().should("have.value", "");

        cy.get("button").contains("Close").click();

        cy.get("@playerList")
          .find("li")
          .then(($players) => {
            const players = $players.toArray();
            const isDiffTeam = players.some((e) => !e.innerHTML.includes(team));
            const isDiffPosition = players.some(
              (e) => !e.innerHTML.includes(playerPosition)
            );
            expect(isDiffTeam).to.be.true;
            expect(isDiffPosition).to.be.true;
          });
      });
  });
});
