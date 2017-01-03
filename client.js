import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import routes from './routes/routes.jsx';
import reduxThunk from 'redux-thunk';
import reducers from './app/reducers';

const preloadedState = window.__PRELOADED_STATE__;
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, preloadedState);

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>, document.getElementById("root")
);