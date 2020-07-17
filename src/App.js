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
    filterButtons: {
      poison: false,
      grass: false,
      fire: false,
      flying: false,
      water: false,
      bug: false,
      normal: false,
      electric: false,
      ground: false,
      fairy: false,
      fighting: false,
      psychic: false,
      rock: false,
      ghost: false,
      ice: false,
      steel: false,
      dragon: false,
      dark: false,
    },
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
    console.log(pokemonsToDisplay, '[Pokemons after double filtering]');

    this.setState({
      pokemonsToDisplay: pokemonsToDisplay,
    });
  };

  handleFilterTypes = (type, button) => {
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
    console.log('[CHANGE TYPES IN STATE FUNCTION]');
    let typeArray = [...this.state.type];
    if (!typeArray.includes(type) && typeArray.length < 2) {
      typeArray.push(type);
      button.style.backgroundColor = TYPE_COLORS[type];
    } else if (typeArray.includes(type)) {
      typeArray.splice(
        typeArray.findIndex(x => x === type),
        1
      );
      button.style.backgroundColor = '';
    } else if (typeArray.length >= 2 && !typeArray.includes(type)) {
      typeArray.splice(1, 1, type);
      button.style.backgroundColor = TYPE_COLORS[type];
    }
    this.setState({
      type: typeArray,
    });
  };

  handleFilterChange = (type, e) => {
    console.log('[HANDLE TYPE CLICK!]');
    const pokemonType = type.toLowerCase();
    const button = e.target;
    // let counter = 0;
    // const filterButtons = this.state.filterButtons;
    // for (const prop in filterButtons) {
    //   if (button.name === prop) {
    //     let key = button.name;
    //     const newobj = { ...filterButtons, [key]: true };
    //     this.setState({
    //       filterButtons: newobj,
    //     });
    //   }
    // }
    // for (const prop in filterButtons) {
    //   if (filterButtons[prop]) {
    //     counter += 1;
    //   }
    //   console.log(counter);
    // }

    // check if obj has x2 true
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
          <Filter
            showFilteringButtons={this.showFilteringButtons}
            showButtons={this.state.showTypeButtons}
            filterType={this.handleFilterChange}
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
