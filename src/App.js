import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Layout from 'components/common/Layout';

import { generalRoutes } from 'routes';

import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Layout>
                <Switch>
                    {Object.values(generalRoutes).map(({ path, component }) => (
                        <Route
                            key={path}
                            exact
                            path={path}
                            component={component}
                        />
                    ))}
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
