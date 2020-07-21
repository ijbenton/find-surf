import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faLocationArrow,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';

import Spinner from '../Spinner/Spinner';
import { getSpots } from '../../redux/spots/spots.actions';
import { getDestinations } from '../../redux/destinations/destinations.actions';
import { getSearchResults } from '../../redux/search/search.actions';

import './Searchbar.scss';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      select: 'spots',
      searchResult: null
    };
  }

  handleChange = e => {
    e.preventDefault();
    if (e.target.value !== '') {
      this.props.openSearch();
      this.props.getSearchResults(e.target.value, this.state.select);
      this.setState({
        term: e.target.value,
        results: this.props.results
      });
    } else {
      this.props.closeSearch();
      this.setState({
        term: e.target.value,
        results: null
      });
    }
  };

  handleSelect = e => {
    e.preventDefault();
    this.setState({
      select: e.target.value
    });
    if (this.state.term !== '') {
      this.props.openSearch();
      this.props.getSearchResults(this.state.term, e.target.value);
      this.setState({
        results: this.props.results
      });
    }
  };

  render() {
    return (
      <div className="search-bar">
        <form>
          <input placeholder="Search" onChange={this.handleChange} />
          <select
            id="search-options"
            name="search-options"
            onChange={this.handleSelect}
          >
            <option value="spots">Spots</option>
            <option value="destinations">Destinations</option>
          </select>
          {this.props.isSearchOpen ? (
            <ul className="search-results">
              {this.props.results &&
              this.props.results.length >= 1 &&
              !this.props.isLoading ? (
                this.props.results.map((item, index) => (
                  <li key={index}>
                    {item.spotName ? (
                      <div className="spot-result">
                        <Link
                          to={`/spots/${item.slug}`}
                          onClick={this.props.closeSearch}
                        >
                          <FontAwesomeIcon icon={faLocationArrow} size="xs" />
                          <span className="result-title">{item.spotName} </span>
                          <span className="result-location">
                            - {item.area1}, {item.region}, {item.country}
                          </span>
                        </Link>
                      </div>
                    ) : (
                      <div className="destination-result">
                        <Link
                          to={`/destinations/${item.slug}`}
                          onClick={this.props.closeSearch}
                        >
                          <FontAwesomeIcon icon={faMapMarkedAlt} />
                          <span className="result-title">{item.area} </span>
                          <span className="result-location">
                            - {item.region}, {item.country}
                          </span>
                        </Link>
                      </div>
                    )}
                  </li>
                ))
              ) : this.props.isLoading ? (
                <li>
                  <Spinner />
                </li>
              ) : (
                <li>
                  <span>No Results Found</span>
                </li>
              )}
            </ul>
          ) : null}
          <FontAwesomeIcon icon={faSearch} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // spots: state.spots.spots ? state.spots.spots.data : null,
  // destinations: state.destinations.destinations
  //   ? state.destinations.destinations.data
  //   : null,
  results: state.search.results ? state.search.results.data : null,
  isLoading: state.search.isLoading
});

const mapDispatchToProps = dispatch => ({
  getSpots: () => dispatch(getSpots()),
  getDestinations: () => dispatch(getDestinations()),
  getSearchResults: (term, type) => dispatch(getSearchResults(term, type))
});
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
