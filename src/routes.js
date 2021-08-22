import Home from 'pages/Home';
import Teams from 'pages/Teams';
import Players from 'pages/Players';

import i18n from 'i18n';

export const generalRoutes = {
    home: { component: Home, path: '/' },
    teams: { component: Teams, path: '/teams', label: 'teams' },
    players: {
        component: Players,
        path: '/players',
        label: 'players',
    },
};
