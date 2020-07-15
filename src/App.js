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
  };

  componentDidMount() {
    this.props.fetchPokemonsInitial();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type && this.state.type.length !== 0) {
      // this.props.fetchPokemons(this.state.type);
      this.filterPokemons(this.state.type);
    }
  }

  filterPokemons = type => {
    if (type.length === 0) {
      //get initially fetched pokemons from local storage
      console.log('Get from Local Storage');
    } else if (type.length === 1) {
      //fetch pokemons depeneding on type
      this.props.fetchPokemons(this.state.type[0]);
    } else {
      // double filtering 1. fetch data for one type than filter all and find only those which match second type
      console.log('Dobule trouble my friend - double filtering required');
    }
  };

  handleFilterTypes = type => {
    let typeArray = this.state.type;
    if (!typeArray.includes(type) && typeArray.length < 2) {
      typeArray.push(type);
      console.log(typeArray);
    } else if (typeArray.includes(type)) {
      typeArray.splice(
        typeArray.findIndex(x => x === type),
        1
      );
      console.log(typeArray);
    }
  };

  handleFilterChange = (type, e) => {
    const pokemonType = type.toLowerCase();
    this.handleFilterTypes(pokemonType);
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
    e.target.parentNode.childNodes.forEach(element => (element.style.backgroundColor = 'transparent'));
    e.target.style.backgroundColor = TYPE_COLORS[pokemonType];
    this.setState({
      type: [pokemonType],
    });
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
          <PokemonContainer />
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
