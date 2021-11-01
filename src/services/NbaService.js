import axios from "axios";

class NbaService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
    });

    this.service.interceptors.response.use(
      (response) => {
        // parse response
        if (response?.data?.league?.standard) {
          return response.data.league.standard;
        }

        return response;
      },
      (error) => {
        // generic error handling
        return Promise.reject(error.message);
      }
    );
  }

  fetchPlayers() {
    return this.service.get("/v1/2021/players.json");
  }

  fetchPlayerStats(playerId) {
    return this.service.get(`/v1/2020/players/${playerId}_profile.json`);
  }

  fetchTeams() {
    return this.service.get("/v2/2021/teams.json");
  }

  fetchTeamCalendar(code) {
    return this.service.get(`/v1/2021/teams/${code}/schedule.json`);
  }

  fetchStandings() {
    return this.service.get("/v1/current/standings_conference.json");
  }

  fetchDayGames(date) {
    return this.service.get(`/v1/${date}/scoreboard.json`);
  }

  fetchGame({ date, gameId }) {
    return this.service.get(`/v1/${date}/${gameId}_boxscore.json`);
  }

  fetchPeriodPlays({ date, gameId, period }) {
    return this.service.get(`/v1/${date}/${gameId}_pbp_${period}.json`);
  }
}

const service = new NbaService();

export default service;
