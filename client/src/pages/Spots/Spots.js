import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Collection from '../Collection/Collection';
import SpotDescription from '../SpotDescription/SpotDescription';
import Spinner from '../../components/Spinner/Spinner';

const SpotsPage = () => {
  let match = useRouteMatch();
  return (
    <div className="spots-page">
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path={`${match.path}`}
            render={() => <Collection spots={true} />}
          />
          <Route
            exact
            path={`${match.path}/:spotSlug`}
            component={SpotDescription}
          />
        </Suspense>
      </Switch>
    </div>
  );
};

export default SpotsPage;
