import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';

import { generalRoutes } from 'routes';

import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <p>TEST TEXT</p>
            <Switch>
                {Object.values(generalRoutes).map(({ path, component }) => (
                    <Route key={path} exact path={path} component={component} />
                ))}
            </Switch>
        </Router>
    );
}

export default App;
