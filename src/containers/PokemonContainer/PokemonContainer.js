import React, { Component } from 'react';

import classes from './PokemonContainer.module.scss';
import Modal from '../../components/Modal/Modal';
import CardWithDetails from '../../components/Modal/CardWithDetails/CardWithDetails';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Spinner from '../../components/Spinner/Spinner';

class PokemonContainer extends Component {
  state = {
    displayDetailInfo: false,
    pokemon: null,
    colors: [],
  };

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

  render() {
    let pokemonList = this.props.pokemons.slice(0, 20).map(pokemon => {
      return (
        <PokemonCard
          clicked={this.detailInfoHandler}
          pokemon={pokemon}
          key={pokemon.id}
        />
      );
    });
    if (this.props.pokemonsToDisplay.length !== 0) {
      pokemonList = this.props.pokemonsToDisplay.slice(0, 20).map(pokemon => {
        return (
          <PokemonCard
            clicked={this.detailInfoHandler}
            pokemon={pokemon}
            key={pokemon.id}
          />
        );
      });
    }
    if (this.props.pokemonsToDisplay.length === 0 && !this.props.filterResult) {
      pokemonList = (
        <p className={classes.Message}>No results for selected filters!</p>
      );
    }

    let modalWithDetails = this.state.displayDetailInfo ? (
      <Modal close={this.closeDetailInfoHandler}>
        <CardWithDetails
          closeModal={this.closeDetailInfoHandler}
          pokemon={this.state.pokemon}
          colors={this.state.colors}
        />
      </Modal>
    ) : null;

    return (
      <div className={classes.Container}>
        {this.props.loading ? <Spinner /> : pokemonList}
        {modalWithDetails}
      </div>
    );
  }
}

export default PokemonContainer;
