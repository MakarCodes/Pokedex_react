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
    displayDetailInfo: false,
    pokemon: null,
    colors: [],
  };

  componentDidMount() {
    this.props.fetchPokemonsInitial();
  }

  componentDidUpdate(prevProps, prevState) {
    const { type } = this.state;
    const { pokemons } = this.props;
    if (type !== prevState.type) {
      // console.log('[UPDATED]', type);
      this.filterPokemons(type);
    }
    if (pokemons !== prevProps.pokemons) {
      this.handlePageCount();
    }
  }
  detailInfoHandler = (pokemon, colors) => {
    this.setState({
      displayDetailInfo: true,
      pokemon: pokemon,
      colors: colors,
    });
  };

  closeDetailInfoHandler = () => {
    this.setState({
      displayDetailInfo: false,
    });
  };

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
    const { perPage } = this.state.pagination;
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
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
    const { pokemons } = this.props;
    // console.log('[FILTER POKEMONS FUNCTION]');
    let pokemonsToDisplay = null;
    let filterResult = true;
    if (type.length === 0) {
      // console.log('[GET Pokemons from initial state!]', type);
      pokemonsToDisplay = pokemons;
    } else if (type.length === 1) {
      // console.log('[FILTER Pokemons from initial state!]', type);
      pokemonsToDisplay = pokemons.filter(pokemon => {
        if (pokemon.types.length > 1) {
          return pokemon.types.some(pokeType =>
            pokeType.type.name.includes(type[0])
          );
        }
        return pokemon.types[0].type.name === type[0];
      });
    } else {
      // console.log('[DOUBLE FILTERING Pokemons from initial state!]', type);
      pokemonsToDisplay = pokemons.filter(pokemon => {
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
      <div
        className={classes.App}
        style={{ height: this.props.loading ? '100vh' : '100%' }}
      >
        <Layout>
          <Filter
            showFilteringButtons={this.showFilteringButtons}
            showButtons={this.state.showTypeButtons}
            filterType={this.handleFilterChange}
            filterBy={this.state.type}
          />
          <PokemonContainer
            data={this.state.pagination.data}
            loading={this.props.loading}
            detailInfoHandler={this.detailInfoHandler}
            closeDetailInfoHandler={this.closeDetailInfoHandler}
            colors={this.state.colors}
            displayDetailInfo={this.state.displayDetailInfo}
            pokemon={this.state.pokemon}
          />
          {!this.props.loading ? (
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
