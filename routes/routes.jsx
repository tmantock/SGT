const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const browserHistory = ReactRouter.browserHistory;
//Components
import App from '../app/index.jsx';
import TableSection from '../app/components/Table/TableSection.jsx';

module.exports = (
    <Router history={browserHistory}>
        <Route path='/' component = {App}>
        <IndexRoute component={TableSection} />

        </Route>
    </Router>
);