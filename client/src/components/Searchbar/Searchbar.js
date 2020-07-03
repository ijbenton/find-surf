import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { getSpots } from '../../redux/spots/spots.actions';
import { getDestinations } from '../../redux/destinations/destinations.actions';
import { getSearchResults } from '../../redux/search/search.actions';

import './Searchbar.scss';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      searchResult: null
    };
  }

  updateTerm = e => {
    this.setState({
      term: e.target.value
    });
  };

  search = e => {
    e.preventDefault();
    this.props.getSearchResults(this.state.term);
    // const { destinations, spots } = this.props;
    // const spotResults = [];
    // const destinationResults = [];
    // for (let i = 0; i < spots.length; i++) {
    //   if (
    //     spots[i].spotName.toLowerCase().includes(this.state.term.toLowerCase())
    //   ) {
    //     spotResults.push(spots[i]);
    //   }
    // }
    // for (let i = 0; i < destinations.length; i++) {
    //   if (
    //     destinations[i].area
    //       .toLowerCase()
    //       .includes(this.state.term.toLowerCase()) ||
    //     destinations[i].region
    //       .toLowerCase()
    //       .includes(this.state.term.toLowerCase()) ||
    //     destinations[i].country
    //       .toLowerCase()
    //       .includes(this.state.term.toLowerCase())
    //   ) {
    //     destinationResults.push(spots[i]);
    //   }
    // }
    // const searchResults = [...spotResults, ...destinationResults];
    this.setState({
      results: this.props.results
    });
    console.log(this.props.results);
  };
  render() {
    return (
      <div className="searchBar">
        <form onSubmit={this.search}>
          <input placeholder="Search" onChange={this.updateTerm} />
          <FontAwesomeIcon icon={faSearch} onClick={this.search} />
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
})
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
