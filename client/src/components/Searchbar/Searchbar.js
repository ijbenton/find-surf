import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Searchbar.scss';

class Searchbar extends Component {
  render() {
    return (
      <div className="searchBar">
        <form>
          <input placeholder="Search" />
          <FontAwesomeIcon icon={faSearch} />
        </form>
      </div>
    );
  }
}

export default Searchbar;
