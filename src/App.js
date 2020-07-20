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
  };

  componentDidMount() {
    this.props.fetchPokemonsInitial();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type) {
      // this.props.fetchPokemons(this.state.type);
      console.log('[UPDATED]', this.state.type);
      this.filterPokemons(this.state.type);
    }
  }

  filterPokemons = type => {
    console.log('[FILTER POKEMONS FUNCTION]');
    let pokemonsToDisplay = null;
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
        } else {
          pokemonsToDisplay = [];
          console.log('No results for those types!');
          return false;
        }
      });
    }
    console.log(pokemonsToDisplay, '[Pokemons after filtering]');

    this.setState({
      pokemonsToDisplay: pokemonsToDisplay,
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
          <PokemonContainer pokemonsToDisplay={this.state.pokemonsToDisplay} />
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
