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
    if (this.state.type !== prevState.type && this.state.type.length !== 0) {
      // this.props.fetchPokemons(this.state.type);
      console.log('[UPDATED]');
      this.filterPokemons(this.state.type);
    }
  }

  filterPokemons = type => {
    let pokemonsToDisplay = null;
    if (type.length === 0) {
      console.log('[GET Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons;
    } else if (type.length === 1) {
      console.log('[FILTER Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons.filter(pokemon => {
        if (pokemon.types.length > 1) {
          return pokemon.types.some(pokeType => pokeType.type.name.includes(type[0]));
        }
        return pokemon.types[0].type.name === type[0];
      });
    } else {
      console.log('[DOUBLE FILTERING Pokemons from initial state!]', type);
      pokemonsToDisplay = this.props.pokemons.filter(pokemon => {
        return pokemon.types.every(pokeType => type.includes(pokeType.type.name));
      });
    }
    this.setState({
      pokemonsToDisplay: pokemonsToDisplay,
    });
  };

  handleFilterTypes = (type, button) => {
    let typeArray = [...this.state.type];
    if (!typeArray.includes(type) && typeArray.length < 2) {
      typeArray.push(type);
    } else if (typeArray.includes(type)) {
      typeArray.splice(
        typeArray.findIndex(x => x === type),
        1
      );
      button.style.backgroundColor = 'transparent';
    } else if (typeArray.length >= 2 && !typeArray.includes(type)) {
      typeArray.splice(1, 1, type);
      // console.log(button.previousElementSibling);
      button.previousElementSibling.style.backgroundColor = 'transparent';
    }
    this.setState({
      type: typeArray,
    });
  };

  handleFilterChange = (type, e) => {
    const TYPE_COLORS = {
      poison: '#C68CC6',
      grass: '#AEDE96',
      fire: '#F6B282',
      flying: '#CABCF6',
      water: '#A4BCF6',
      bug: '#CAD479',
      normal: '#CACAAE',
      electric: '#FAE282',
      ground: '#ECD9A4',
      fairy: '#F4C1CD',
      fighting: '#D9827E',
      psychic: '#FA9AB7',
      rock: '#D4C687',
      ghost: '#A99AC1',
      ice: '#C1E7E7',
      steel: '#D4D4E2',
      dragon: '#A886F9',
      dark: '#A89990',
    };
    const pokemonType = type.toLowerCase();
    const button = e.target;
    button.style.backgroundColor = TYPE_COLORS[pokemonType];
    //check if button was clicked already - if was remmove type, if not add type
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
          <Filter showFilteringButtons={this.showFilteringButtons} showButtons={this.state.showTypeButtons} filterType={this.handleFilterChange} />
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
