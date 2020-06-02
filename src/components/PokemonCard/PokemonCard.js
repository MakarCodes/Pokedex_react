import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import classes from './PokemonCard.module.scss';

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
  }

const PokemonCard = ({pokemon, clicked}) => {

    const backgroundsDependingOnTypeOfPokemon = [];
    let pokemonBakground = {};
    pokemon.types.forEach((pokemonType, index) => {
        if(index === 0) {
            backgroundsDependingOnTypeOfPokemon.push(TYPE_COLORS[pokemonType.type.name]);
            backgroundsDependingOnTypeOfPokemon.push(TYPE_COLORS[pokemonType.type.name]);
        } else {
            backgroundsDependingOnTypeOfPokemon.splice(1, 1, TYPE_COLORS[pokemonType.type.name]);
        };
        pokemonBakground = {background: `linear-gradient(45deg, ${backgroundsDependingOnTypeOfPokemon[0]} 50%, ${backgroundsDependingOnTypeOfPokemon[1]} 50%`};
    })

    let pokemonId = null;
    if(pokemon.id < 10) {
        pokemonId = '#00' + pokemon.id;
    } else if (pokemon.id >= 10 && pokemon.id < 100) {
        pokemonId = '#0' + pokemon.id;
    } else {
        pokemonId = '#' + pokemon.id;
    }

    return (
        <div
            onClick={() => {clicked(pokemon, backgroundsDependingOnTypeOfPokemon)}}
            className={classes.PokemonCard}
            style={pokemonBakground}>
            <img
                onMouseOver={(e) => e.target.src = pokemon.sprites.back_default || "https://img.icons8.com/bubbles/100/000000/no-image.png"}
                onMouseOut={(e) => e.target.src = pokemon.sprites.front_default || "https://img.icons8.com/bubbles/100/000000/no-image.png"}
                src={pokemon.sprites.front_default || "https://img.icons8.com/bubbles/100/000000/no-image.png"} 
                alt=""/>
            <h1 className={classes.PokemonName}>{pokemon.name}</h1>
            <p className={classes.PokemonId}>{pokemonId}</p>
            <div className={classes.Info}>
                <div className={classes.DetailInfo}>
                    <i><FontAwesomeIcon icon={faWeightHanging} size="2x"/></i>
                    <span className={classes.WeightHeight}>{pokemon.weight}</span>
                </div>
                <div className={classes.DetailInfo}>
                    <i><FontAwesomeIcon icon={faSortAmountUp} size="2x"/></i>
                    <span className={classes.WeightHeight}>{pokemon.height}</span>
                </div>
            </div>
            <div className={classes.Details}>DETAILS</div>
            <p className={classes.Type}>Type: {pokemon.types.map(pokemonType => 
                pokemonType.type.name.charAt(0).toUpperCase() + pokemonType.type.name.slice(1)).join('/')}
            </p>
        </div>
    );
};

export default PokemonCard;