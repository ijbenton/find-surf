import React from 'react';

import CollectionItem from '../CollectionItem/CollectionItem';

import './CollectionPreview.scss';

function CollectionPreview({ items, title }) {
  return (
    <div className="collection-preview">
      <h2 className="collection-title">{title}</h2>
      <div className="preview-container">
        {items
          ? items
              .filter((item, index) => index < 4)
              .map((item, index) => (
                <CollectionItem item={item} key={item._id} />
              ))
          : null}
      </div>
    </div>
  );
}

export default CollectionPreview;
