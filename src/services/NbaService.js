import axios from 'axios';

axios.interceptors.response.use(
    response => {
        //parse response
        return response;
    },
    error => {
        //generic error handling
        return Promise.reject(error.message);
    }
);

class NbaService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_ENDPOINT_V1,
        });
    }

    //api v2 "teams": "2021/teams.json", "scoreboard": "{{gameDate}}/scoreboard.json",

    fetchPlayers() {
        return this.service.get(`2021/players.json`);
    }

    fetchTeams() {
        return axios.get(
            `${process.env.REACT_APP_API_ENDPOINT_V2}2021/teams.json`
        );
    }

    fetchTeamRoster(code) {
        return axios.get(
            `${process.env.REACT_APP_API_ENDPOINT_V1}2021/teams/${code}/roster.json`
        );
    }
}

const service = new NbaService();

export default service;
