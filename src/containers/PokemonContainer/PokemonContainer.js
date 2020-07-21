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
    const { data, loading } = this.props;
    let pokemonList = null;
    if (!data.length) {
      pokemonList = (
        <p className={classes.Message}>No results for selected filters!</p>
      );
    } else {
      pokemonList = data.map(pokemon => {
        return (
          <PokemonCard
            clicked={this.detailInfoHandler}
            pokemon={pokemon}
            key={pokemon.id}
          />
        );
      });
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
        {loading ? <Spinner /> : pokemonList}
        {modalWithDetails}
      </div>
    );
  }
}

export default PokemonContainer;
