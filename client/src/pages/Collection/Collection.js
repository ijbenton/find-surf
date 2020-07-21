import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons';

import SpotItem from '../../components/SpotItem/SpotItem';
import DestinationItem from '../../components/DestinationItem/DestinationItem';
import Spinner from '../../components/Spinner/Spinner';

import { getDestinations } from '../../redux/destinations/destinations.actions';
import { getSpots } from '../../redux/spots/spots.actions';
import { selectAllDestinations } from '../../redux/destinations/destinations.selectors';
import { selectAllSpots } from '../../redux/spots/spots.selectors';

import './Collection.scss';

const CollectionPage = ({
  collection,
  spots,
  destinations,
  getDestinations,
  getSpots
}) => {
  let title, nextPage, prevPage, limit, currentPage;
  let history = useHistory();
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    console.log('rerender');
    if (destinations && queryParams.get('page')) {
      getDestinations(queryParams.get('page'));
    } else if (spots && queryParams.get('page')) {
      getSpots(queryParams.get('page'));
    } else if (destinations) {
      getDestinations(1);
    } else if (spots) {
      getSpots(1);
    }
  }, [queryParams.get('page')]);

  if (collection && collection.data) {
    nextPage = collection.pagination.next
      ? collection.pagination.next.page
      : null;
    prevPage = collection.pagination.prev
      ? collection.pagination.prev.page
      : null;
    currentPage = nextPage ? nextPage - 1 : prevPage + 1;
    limit = collection.pagination.next.limit;
  }

  const changeSpotPage = pageNum => {
    if (pageNum > 1) {
      history.push(`?page=${pageNum}`);
    } else {
      history.push('/spots');
    }
    currentPage++;
    getSpots(pageNum);
    window.scrollTo(0, 0);
  };
  const changeDestinationPage = pageNum => {
    if (pageNum > 1) {
      history.push(`?page=${pageNum}`);
    } else {
      history.push('/destinations');
    }
    currentPage++;
    //getDestinations(pageNum);
    window.scrollTo(0, 0);
  };
  return (
    <div className="collection">
      <h2 className="collection-title">{spots ? 'Spots' : 'Destinations'}</h2>
      <div className="collection-container">
        {spots && collection && collection.data
          ? collection.data.map(item => <SpotItem key={item._id} item={item} />)
          : destinations && collection && collection.data
          ? collection.data.map(item => (
              <DestinationItem key={item._id} item={item} />
            ))
          : null}
      </div>
      <div className="page-number">
        {prevPage ? (
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            size={'2x'}
            onClick={
              spots
                ? () => changeSpotPage(prevPage)
                : () => changeDestinationPage(prevPage)
            }
          />
        ) : null}
        <span className="current-page">{currentPage}</span>
        {nextPage ? (
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            size={'2x'}
            onClick={
              spots
                ? () => changeSpotPage(nextPage)
                : () => changeDestinationPage(nextPage)
            }
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    collection: ownProps.destinations ? selectAllDestinations : selectAllSpots
  });

const mapDispatchToProps = dispatch => ({
  getDestinations: pageNum => dispatch(getDestinations(pageNum)),
  getSpots: pageNum => dispatch(getSpots(pageNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
