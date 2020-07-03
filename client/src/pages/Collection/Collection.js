import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import SpotItem from '../../components/SpotItem/SpotItem';
import DestinationItem from '../../components/DestinationItem/DestinationItem';

import { getDestinations } from '../../redux/destinations/destinations.actions';
import { getSpots } from '../../redux/spots/spots.actions';

import './Collection.scss';

const CollectionPage = ({ collection, spots, destinations, getDestinations, getSpots }) => {
  let items, title, nextPage, prevPage, limit, currentPage;
  useEffect(() => {
    if (destinations) {
      getDestinations(1);
    } else {
      getSpots(1);
    }
  }, [])
  console.log(collection)
  console.log(currentPage)

  if (spots && collection.spots) {
    items = collection.spots.data;
    title = 'Spots';
    nextPage = collection.spots.pagination.next ? collection.spots.pagination.next.page : null;
    prevPage = collection.spots.pagination.prev ? collection.spots.pagination.prev.page : null;
    currentPage = nextPage ? nextPage - 1 : prevPage + 1;
    limit = collection.spots.pagination.next.limit;
  } else if (destinations && collection.destinations) {
    items = collection.destinations.data;
    title = 'Destinations';
    nextPage = collection.destinations.pagination.next ? collection.destinations.pagination.next.page : null;
    prevPage = collection.destinations.pagination.prev ? collection.destinations.pagination.prev.page : null;
    currentPage = nextPage ? nextPage - 1 : prevPage + 1;
    limit = collection.destinations.pagination.next.limit;
  }

  const changeSpotPage = pageNum => {
    currentPage++;
    getSpots(pageNum);
    window.scrollTo(0, 0);
  }
  const changeDestinationPage = pageNum => {
    currentPage++;
    getDestinations(pageNum);
    window.scrollTo(0, 0);
  }
  return (
    <div className="collection">
      <h2 className="collection-title">{title}</h2>
      <div className="collection-container">
        {spots && collection.spots
          ? items.map(item => <SpotItem key={item._id} item={item} />)
          : destinations && collection.destinations ? items.map(item => <DestinationItem key={item._id} item={item} />) : null}
      </div>
      <div className="page-number">
        {
          prevPage ? <FontAwesomeIcon icon={faChevronCircleLeft} size={'2x'} onClick={spots ? () => changeSpotPage(prevPage) : () => changeDestinationPage(prevPage)} /> : null
        }
        <span className="current-page">{currentPage}</span>
        {
          nextPage ? <FontAwesomeIcon icon={faChevronCircleRight} size={'2x'} onClick={spots ? () => changeSpotPage(nextPage) : () => changeDestinationPage(nextPage)} /> : null
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: ownProps.destinations ? state.destinations : state.spots
});

const mapDispatchToProps = dispatch => ({
  getDestinations: pageNum => dispatch(getDestinations(pageNum)),
  getSpots: pageNum => dispatch(getSpots(pageNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
