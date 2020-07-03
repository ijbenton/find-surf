import React from 'react';
import { Link } from 'react-router-dom';

import SpotItem from '../SpotItem/SpotItem';
import DestinationItem from '../DestinationItem/DestinationItem';

import './CollectionPreview.scss';

function CollectionPreview({ items, title, destinations, spots, routeName }) {
  return (
    <div className="collection-preview">
      <h2 className="collection-title"><Link to={`/${routeName}`}>{title}</Link></h2>
      <div className="preview-container">
        {items
          ? items.map((item, index) =>
            destinations ? (
              <DestinationItem item={item} key={item._id} />
            ) : (
                <SpotItem item={item} key={item._id} />
              )
          )
          : null}
      </div>
    </div>
  );
}

export default CollectionPreview;
