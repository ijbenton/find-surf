import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Collection from '../Collection/Collection';
import DestinationDescription from '../DestinationDescription/DestinationDescription';
import Spinner from '../../components/Spinner/Spinner';

const DestinationsPage = () => {
  let match = useRouteMatch();
  return (
    <div className="destinations-page">
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path={`${match.path}`}
            render={() => <Collection destinations={true} />}
          />
          <Route
            exact
            path={`${match.path}/:destinationId`}
            component={DestinationDescription}
          />
        </Suspense>
      </Switch>
    </div>
  );
};

export default DestinationsPage;
