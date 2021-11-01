describe("Home flow", () => {
  beforeEach(() => {
    cy.visit("/");
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

  it.only("Navbar flow works", () => {
    cy.get("nav a").as("navigationLinks");

    cy.get("@navigationLinks")
      .contains("Teams")
      .click()
      .then(() => {
        cy.url().should("eq", "http://localhost:3000/teams");
        cy.go("back").then(() => {
          cy.get("@navigationLinks")
            .contains("Players")
            .click()
            .then(() => {
              cy.url().should("eq", "http://localhost:3000/players");
            });
        });
      });
  });
});
