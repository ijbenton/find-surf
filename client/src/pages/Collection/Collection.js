import React from 'react';
import { connect } from 'react-redux';

import SpotItem from '../../components/SpotItem/SpotItem';
import DestinationItem from '../../components/DestinationItem/DestinationItem';

import './Collection.scss';

const CollectionPage = ({ collection, spots, destinations }) => {
  console.log(collection);
  const { title, items } = collection;
  return (
    <div className="collection">
      <h2 className="collection-title">{title}</h2>
      <div className="collection-container">
        {spots
          ? items.map(item => <SpotItem key={item._id} item={item} />)
          : items.map(item => <DestinationItem key={item._id} item={item} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: ownProps.destinations ? state.destinations : state.spots
});

export default connect(mapStateToProps)(CollectionPage);
