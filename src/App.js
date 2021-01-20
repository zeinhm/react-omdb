import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PageBase from './components/layouts';
import AppContextProvider from './contexts';
import pages from './pages';

export default function App ({ history, store }) {
  return(
    <Provider store={store}>
      <Router history={history}>
        <AppContextProvider>
          <PageBase>
            <Switch>
              <Route component={pages.Home} exact path="/" />
              <Route component={pages.MovieDetail} exact path="/detail" />
              <Route component={pages.Error404} />
            </Switch>
          </PageBase>
        </AppContextProvider>
      </Router>
    </Provider>
  );
};

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
