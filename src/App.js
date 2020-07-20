import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';
import PokemonContainer from './containers/PokemonContainer/PokemonContainer';
import Filter from './components/Filter/Filter';

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
    },
  };

  componentDidMount() {
    this.props.fetchPokemonsInitial();
    this.handlePageCount();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type) {
      // this.props.fetchPokemons(this.state.type);
      console.log('[UPDATED]', this.state.type);
      this.filterPokemons(this.state.type);
    }
  }

  handlePageCount = () => {
    // calculate page
    let slice = this.props.pokemons.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    let pageCount = Math.ceil(this.props.pokemons.length / this.state.perPage);
    if (this.state.pokemonsToDisplay.length !== 0) {
      slice = this.state.pokemonsToDisplay.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      pageCount = Math.ceil(
        this.state.pokemonsToDisplay.length / this.state.perPage
      );
    }

    this.setState({
      pageCount: pageCount,
      slice,
    });
  };

  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.pagination.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.handlePageCount();
      }
    );
  };

  filterPokemons = type => {
    console.log('[FILTER POKEMONS FUNCTION]');
    let pokemonsToDisplay = null;
    let filterResult = true;
    if (type.length === 0) {
      console.log('[GET Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons;
    } else if (type.length === 1) {
      console.log('[FILTER Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons.filter(pokemon => {
        if (pokemon.types.length > 1) {
          return pokemon.types.some(pokeType =>
            pokeType.type.name.includes(type[0])
          );
        }
        return pokemon.types[0].type.name === type[0];
      });
    } else {
      console.log('[DOUBLE FILTERING Pokemons from initial state!]', type);
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
      console.log('No results for those types!');
      filterResult = false;
    }
    console.log(pokemonsToDisplay, '[Pokemons after filtering]', filterResult);

    this.setState({
      pokemonsToDisplay: pokemonsToDisplay,
      filterResult: filterResult,
    });
  };

  handleFilterTypes = (type, button) => {
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

  handleFilterChange = (type, e) => {
    console.log('[HANDLE TYPE CLICK!]');
    const pokemonType = type.toLowerCase();
    const button = e.target;
    this.handleFilterTypes(pokemonType, button);
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
            slicedPokemons={this.state.slice}
          />
          Paging Section
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
