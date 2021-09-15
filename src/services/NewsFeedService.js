import axios from 'axios';

class NewsFeedService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_NEWSFEED_API,
        });
    }

    fetchNews(language) {
        return this.service.get(
            `/apis/site/v2/sports/basketball/nba/news?lang=${language}`
        );
    }
}

const service = new NewsFeedService();

export default service;
