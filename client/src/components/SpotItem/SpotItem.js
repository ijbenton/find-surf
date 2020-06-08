import React from 'react';
import { withRouter, useRouteMatch, Link } from 'react-router-dom';

import './SpotItem.scss';

const SpotItem = ({ item, history }) => {
  let match = useRouteMatch();

  return (
    <div className="spot-item">
      <Link to={`/spots/${item._id}`}>
        {item ? (
          <div className="item-container">
            <div className="img-container">
              <img
                src={require(`../../../src/assets/uploads/${item.photos[0]}`)}
                alt=""
                className="item-img"
              />
            </div>
            <div className="item-caption">
              <span className="item-area">{item.spotName}</span>
              <span className="item-region">
                {item.region}, {item.country}
              </span>
            </div>
          </div>
        ) : null}
      </Link>
    </div>
  );
};

export default withRouter(SpotItem);
