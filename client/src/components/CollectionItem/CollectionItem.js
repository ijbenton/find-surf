import React from 'react';
import { withRouter, useRouteMatch, Link } from 'react-router-dom';

import './CollectionItem.scss';

const CollectionItem = ({ item, destinations, spots, routeName, history }) => {
  let match = useRouteMatch();
  return (
    <div className="collection-item">
      <Link to={`${match.url}${routeName}/${item._id}`}>
        {item ? (
          <div className="item-container">
            <div className="img-container">
              <img
                src={
                  destinations
                    ? require(`../../../src/assets/uploads/${item.spots[0].photos[0]}`)
                    : require(`../../../src/assets/uploads/${item.photos[0]}`)
                }
                alt=""
                className="item-img"
              />
              {destinations ? (
                <span className="item-spots">
                  {item.spots.length} {item.spots.length > 1 ? 'Spots' : 'Spot'}
                </span>
              ) : null}
            </div>
            <div className="item-caption">
              <span className="item-area">
                {destinations ? item.area : item.spotName}
              </span>
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

export default withRouter(CollectionItem);
