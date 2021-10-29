describe("Home flow", () => {
  function getTestElement(selector) {
    return cy.get(`[data-testid="${selector}"]`);
  }

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // it("Home renders", () => {
  //   cy.contains("NBA STATS");
  // });

  // it("Language translations works", () => {
  //   cy.contains("Players");

  //   const languageSelect = getTestElement("language-select-container");
  //   languageSelect.click();

  //   cy.contains("Spanish").click();

  //   cy.contains("Jugadores");
  // });

  // it("Dark mode works", () => {
  //   cy.get("body").as("body").should("not.have.class", "theme-dark");
  //   cy.get("input[type=checkbox]").click();
  //   cy.get("@body").should("have.class", "theme-dark");
  // });

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

  // it("Games results flow works", () => {
  //   const dateInput = cy.get("h3 input[type=date]").as("gamesDate");

  //   dateInput.type("2021-10-28");

  //   const summary = cy
  //     .get("@gamesDate")
  //     .closest("summary")
  //     .as("gamesResultsTitle");

  //   const gamesList = cy
  //     .get("@gamesResultsTitle")
  //     .siblings()
  //     .as("gamesResultsBody");

  //   gamesList.find("li").should("have.length", 6).should("be.visible");

  //   cy.get("@gamesResultsTitle").click("left");

  //   cy.get("@gamesResultsBody").should("not.be.visible");

  //   cy.get("@gamesResultsTitle").click("left");

  //   cy.get("@gamesResultsBody").should("be.visible");
  // });

  // it("Newsfeed flow works", () => {
  //   const title = cy.contains("NBA News");

  //   const summary = title.closest("summary");

  //   const newsList = summary.siblings();

  //   newsList.find("a").each(($link) => {
  //     console.log($link);
  //     expect($link).to.have.attr("href");
  //   });
  // });
});
