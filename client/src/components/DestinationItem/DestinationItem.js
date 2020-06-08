import React from 'react';
import { withRouter, useRouteMatch, Link } from 'react-router-dom';

import './DestinationItem.scss';

const DestinationItem = ({ item, destinations, spots, routeName, history }) => {
  let match = useRouteMatch();
  return (
    <div className="destination-item">
      <Link to={`destinations/${item._id}`}>
        {item ? (
          <div className="item-container">
            <div className="img-container">
              <img
                src={require(`../../../src/assets/uploads/${item.spots[0].photos[0]}`)}
                alt=""
                className="item-img"
              />
              <span className="item-spots">
                {item.spots.length} {item.spots.length > 1 ? 'Spots' : 'Spot'}
              </span>
            </div>
            <div className="item-caption">
              <span className="item-area">{item.area}</span>
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

export default withRouter(DestinationItem);
