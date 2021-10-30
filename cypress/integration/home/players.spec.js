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
