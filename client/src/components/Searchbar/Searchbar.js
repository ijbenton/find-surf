import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faLocationArrow,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';

import { getSpots } from '../../redux/spots/spots.actions';
import { getDestinations } from '../../redux/destinations/destinations.actions';
import { getSearchResults } from '../../redux/search/search.actions';

import './Searchbar.scss';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      searchResult: null,
      dropdownOpen: false
    };
  }

  search = e => {
    e.preventDefault();
    if (e.target.value !== '') {
      this.props.getSearchResults(e.target.value);
      this.setState({
        term: e.target.value,
        results: this.props.results,
        dropdownOpen: true
      });
    } else {
      this.setState({
        term: e.target.value,
        results: null,
        dropdownOpen: false
      });
    }
  };
  render() {
    return (
      <div className="search-bar">
        <form>
          <input placeholder="Search" onChange={this.search} />
          {this.state.dropdownOpen &&
          this.props.results &&
          this.props.results.length >= 1 ? (
            <ul className="search-results">
              {this.props.results.map((item, index) => (
                <li key={index}>
                  {item.spotName ? (
                    <div className="result">
                      <FontAwesomeIcon icon={faLocationArrow} size="xs" />
                      <span className="result-title">{item.spotName} </span>
                      <span className="result-location">
                        - {item.area1}, {item.region}, {item.country}
                      </span>
                    </div>
                  ) : (
                    <div className="result">
                      <FontAwesomeIcon icon={faMapMarkedAlt} />
                      <span className="result-title">{item.area} </span>
                      <span className="result-location">
                        - {item.region}, {item.country}
                      </span>
                    </div>
                  )}
                </li>
              ))}
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
  results: state.search.results ? state.search.results.data : null
});

const mapDispatchToProps = dispatch => ({
  getSpots: () => dispatch(getSpots()),
  getDestinations: () => dispatch(getDestinations()),
  getSearchResults: term => dispatch(getSearchResults(term))
});
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
