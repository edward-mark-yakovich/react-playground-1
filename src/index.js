import '@globals/page.scss';
import _ from 'lodash';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import store, { history } from '@redux/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/****** Pages *****/
import HomePage from '@connected/pages/home/HomePage.jsx';
import PostsPage from '@connected/pages/posts/PostsPage.jsx';
import SinglePostPage from '@connected/pages/single-post/SinglePostPage.jsx';

/****** Components *****/
import ApplicationErrorBoundary from '@components/base/error-boundaries/ApplicationErrorBoundary.jsx';
import NoRouteMatch from '@components/pageTemplates/no-route-match/NoRouteMatch.jsx';

const isLocal = window.location.host === 'localhost:8080';
const subPath = isLocal ? '' : window.config.subDir;

if (!isLocal) {
  document.write("<base href='" + window.config.subDir + "/' />");
}

const RouteWithBoundary = ({ component: Component, ...rest }) => {
  const componentFunc = props => (
    <ApplicationErrorBoundary>
      <Component {...props} />
    </ApplicationErrorBoundary>
  );

  return <Route {...rest} component={componentFunc} />;
};

// need .htaccess to another solution to solve client side routing on server or use # url approach

render(
  <Provider store={store}>
    <ConnectedRouter history={history} basename={`${subPath}`}>
      <Fragment>
        <div className="app _emy_myAppName--v-1.0.6">
          <Switch>
            <RouteWithBoundary exact={true} path={`${subPath}/`} component={HomePage} />
            <RouteWithBoundary exact={true} path={`${subPath}/posts/:slug`} component={SinglePostPage} />
            <RouteWithBoundary exact={true} path={`${subPath}/posts`} component={PostsPage} />
            <Route component={NoRouteMatch} />
          </Switch>
        </div>
      </Fragment>
    </ConnectedRouter>
  </Provider>, document.getElementById('app')
);
