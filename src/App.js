import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';
import PokemonContainer from './containers/PokemonContainer/PokemonContainer';
import Filter from './components/Filter/Filter';
import Pagination from './components/Pagination/Pagination';

class App extends Component {
  state = {
    showTypeButtons: false,
    type: [],
    pokemonsToDisplay: [],
    filterResult: true,
    pagination: {
      offset: 0,
      perPage: 20,
      currentPage: 0,
      data: [],
    },
  };

  componentDidMount() {
    this.props.fetchPokemonsInitial();
    // setTimeout(() => {
    //   this.handlePageCount();
    // }, 8000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { type } = this.state;
    if (type !== prevState.type) {
      // console.log('[UPDATED]', type);
      this.filterPokemons(type);
    }
  }

  handlePageCount = () => {
    const { offset, perPage } = this.state.pagination;
    const { pokemonsToDisplay, filterResult } = this.state;
    const { pokemons } = this.props;
    let slicedPokemonsPerPage = [];
    let pageCount = 1;

    if (pokemonsToDisplay.length !== 0) {
      console.log(offset);
      slicedPokemonsPerPage = pokemonsToDisplay.slice(offset, offset + perPage);
      pageCount = Math.ceil(pokemonsToDisplay.length / perPage);
    } else if (pokemonsToDisplay.length === 0 && !filterResult) {
      slicedPokemonsPerPage = [];
    } else {
      slicedPokemonsPerPage = pokemons.slice(offset, offset + perPage);
      pageCount = Math.ceil(pokemons.length / perPage);
    }
    console.log(slicedPokemonsPerPage, 'sliced to display');
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageCount: pageCount,
        data: slicedPokemonsPerPage,
      },
    });
  };

  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.pagination.perPage;
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          currentPage: selectedPage,
          offset: offset,
        },
      },
      () => {
        this.handlePageCount();
      }
    );
  };

  filterPokemons = type => {
    // console.log('[FILTER POKEMONS FUNCTION]');
    let pokemonsToDisplay = null;
    let filterResult = true;
    if (type.length === 0) {
      // console.log('[GET Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons;
    } else if (type.length === 1) {
      // console.log('[FILTER Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons.filter(pokemon => {
        if (pokemon.types.length > 1) {
          return pokemon.types.some(pokeType =>
            pokeType.type.name.includes(type[0])
          );
        }
        return pokemon.types[0].type.name === type[0];
      });
    } else {
      // console.log('[DOUBLE FILTERING Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons.filter(pokemon => {
        if (pokemon.types.length >= 2) {
          return pokemon.types.every(pokeType =>
            type.includes(pokeType.type.name)
          );
        }
        return null;
      });
    }
    if (pokemonsToDisplay.length === 0) {
      // console.log('No results for those types!');
      filterResult = false;
    }
    console.log(pokemonsToDisplay, '[Pokemons after filtering]', filterResult);

    this.setState(
      {
        pokemonsToDisplay: pokemonsToDisplay,
        filterResult: filterResult,
        pagination: {
          ...this.state.pagination,
          offset: 0,
        },
      },
      () => {
        console.log('im working');
        this.handlePageCount();
      }
    );
  };

  handleFilterTypes = type => {
    console.log('[CHANGE TYPES IN STATE FUNCTION]');
    let typeArray = [...this.state.type];
    if (!typeArray.includes(type) && typeArray.length < 2) {
      typeArray.push(type);
    } else if (typeArray.includes(type)) {
      typeArray.splice(
        typeArray.findIndex(x => x === type),
        1
      );
    } else if (typeArray.length >= 2 && !typeArray.includes(type)) {
      typeArray.splice(1, 1, type);
    }
    this.setState({
      type: typeArray,
    });
  };

  handleFilterChange = type => {
    console.log('[HANDLE TYPE CLICK!]');
    const pokemonType = type.toLowerCase();
    this.handleFilterTypes(pokemonType);
  };

  showFilteringButtons = () => {
    this.setState(prevState => ({
      showTypeButtons: !prevState.showTypeButtons,
    }));
  };

  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Filter
            showFilteringButtons={this.showFilteringButtons}
            showButtons={this.state.showTypeButtons}
            filterType={this.handleFilterChange}
            filterBy={this.state.type}
          />
          <PokemonContainer
            pokemons={this.props.pokemons}
            loading={this.props.loading}
            pokemonsToDisplay={this.state.pokemonsToDisplay}
            filterResult={this.state.filterResult}
            data={this.state.pagination.data}
          />
          {/* <Pagination
            pageCount={this.state.pagination.pageCount}
            pageClick={this.handlePageClick}
          /> */}
          {this.state.pagination.data.length !== 0 ? (
            <Pagination
              pageCount={this.state.pagination.pageCount}
              pageClick={this.handlePageClick}
            />
          ) : null}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemons: state.pokemons,
    loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPokemonsInitial: () => dispatch(actions.fetchPokemonInit()),
    fetchPokemons: type => dispatch(actions.fetchPokemonTypes(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
