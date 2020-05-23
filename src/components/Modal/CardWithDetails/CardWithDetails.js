import React, { Component } from 'react';
import axios from 'axios';

import classes from './CardWithDetails.module.scss';

class CardWithDetails extends Component {
    state = {
        pokemonDescription: 'a',
        error: null
    }

    componentDidMount() {
        let id = this.props.pokemon.id
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(response => {
                let descriptionText = response.data.flavor_text_entries.find(text => {
                    return text.language.name === "en"
                });
                this.setState({
                    pokemonDescription: descriptionText.flavor_text
                })
            })
            .catch(error => this.setState({error: error}))
    }

    render() {
        const { pokemon } = this.props
        let pokemonId = null;
        if(pokemon.id < 10) {
            pokemonId = '#00' + pokemon.id;
        } else if (pokemon.id >= 10 && pokemon.id < 100) {
            pokemonId = '#0' + pokemon.id;
        } else {
            pokemonId = '#' + pokemon.id;
        }
    
        return (
            <div className={classes.DetailsCard}>
                <img src={pokemon.sprites.front_default} alt=""/>
                <h1 className={classes.PokemonName}>{pokemon.name}</h1>
                <p className={classes.PokemonId}>{pokemonId}</p>
                <p>{this.state.pokemonDescription}</p>
            </div>
        );
    }
};

export default CardWithDetails;