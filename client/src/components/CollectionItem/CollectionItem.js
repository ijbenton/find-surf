import React from 'react';

import './CollectionItem.scss';

function CollectionItem({ item }) {
  return (
    <div className="collection-item">
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
    </div>
  );
}

export default CollectionItem;
