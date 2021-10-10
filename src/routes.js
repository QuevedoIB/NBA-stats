import Home from "pages/Home";
import Teams from "pages/Teams";
import Players from "pages/Players";
import TeamDetail from "pages/TeamDetail";
import PlayerDetail from "pages/PlayerDetail";

export const generalRoutes = {
  home: { component: Home, path: "/" },
  teams: { component: Teams, path: "/teams", label: "teams" },
  players: {
    component: Players,
    path: "/players",
    label: "players",
  },
  teamDetail: {
    component: TeamDetail,
    path: "/team-detail/:teamId",
  },
  playerDetail: {
    component: PlayerDetail,
    path: "/player-detail/:playerId",
  },
};
