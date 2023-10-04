import styles from './Searchbar.module.css';
import React, { Component } from 'react';

import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    inputData: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({ inputData: '' });
  };

  onChangeInput = event => {
    const { value } = event.target;
    this.setState({ inputData: value });
  };

  render() {
    const { inputData } = this.state;
    return (
      <div>
        <header className={styles.Searchbar}>
          <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
            <button type="submit" className={styles.SearchFormButton}>
              <ImSearch size={25} />
              {/* <span class="button-label">Search</span> */}
            </button>

            <input
              name="inputData"
              value={inputData}
              onChange={this.onChangeInput}
              className={styles.SearchFormInput}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}
