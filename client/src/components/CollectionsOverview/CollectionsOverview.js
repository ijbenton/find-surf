import React from 'react';

import './CollectionOverview.scss';

function CollectionOverview({ items }) {
  return (
    <div className="collection-overview">
      {items.map(item => (
        <CollectionItem item={item} />
      ))}
    </div>
  );
}

export default CollectionOverview;
