import React from 'react';

import classes from './PokemonContainer.module.scss';
import Modal from '../../components/Modal/Modal';
import CardWithDetails from '../../components/Modal/CardWithDetails/CardWithDetails';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Spinner from '../../components/Spinner/Spinner';

const PokemonContainer = ({
  displayDetailInfo,
  pokemon,
  colors,
  closeDetailInfoHandler,
  detailInfoHandler,
  data,
  loading,
}) => {
  let pokemonList = null;
  if (!data.length) {
    pokemonList = (
      <p className={classes.Message}>No results for selected filters!</p>
    );
  } else {
    pokemonList = data.map(pokemon => {
      return (
        <PokemonCard
          clicked={detailInfoHandler}
          pokemon={pokemon}
          key={pokemon.id}
        />
      );
    });
  }
  let modalWithDetails = (
    <Modal close={closeDetailInfoHandler}>
      <CardWithDetails
        closeModal={closeDetailInfoHandler}
        pokemon={pokemon}
        colors={colors}
      />
    </Modal>
  );

  return (
    <div className={classes.Container}>
      {loading ? <Spinner /> : pokemonList}
      {displayDetailInfo ? modalWithDetails : null}
    </div>
  );
};

export default PokemonContainer;
