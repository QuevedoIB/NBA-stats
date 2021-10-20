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

  fetchTeamRoster(code) {
    return this.service.get(`/v1/2021/teams/${code}/roster.json`);
  }

  fetchTeamCalendar(code) {
    return this.service.get(`/v1/2021/teams/${code}/schedule.json`);
  }

  fetchTeamLeaders(code) {
    return this.service.get(`/v1/2020/teams/${code}/leaders.json`);
  }

  fetchStandings() {
    return this.service.get("/v1/current/standings_conference.json");
  }

  fetchDayGames(date) {
    return this.service.get(`/v1/${date}/scoreboard.json`);
  }
}

const service = new NbaService();

export default service;
