import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './CardWithDetails.module.scss';
import * as actions from '../../../store/actions/index';
import Spinner from '../../Spinner/Spinner';

class CardWithDetails extends Component {
    componentDidMount() {
        let id = this.props.pokemon.id;
        this.props.fetchPokemonDescription(id);
        console.log(this.props.pokemon)
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

        const pokemonTypes = pokemon.types.map((pokemonTypes, index) => {
            let spanStyle = {
                color: `${this.props.colors[index]}`,
                border: `2px solid ${this.props.colors[index]}`,
                margin: "0px 5px",
                borderRadius: "14px",
                padding: "5px",
                fontWeight: "900"
            }
            return <span 
                key={index} 
                style={spanStyle}>
                {pokemonTypes.type.name.charAt(0).toUpperCase() + pokemonTypes.type.name.slice(1)}</span>
        })
        

        let description = this.props.loading ? <Spinner /> 
        : 
        (
            <React.Fragment>
                <img src={pokemon.sprites.front_default} alt=""/>
                <h1 className={classes.PokemonName}>{pokemon.name}</h1>
                <p className={classes.PokemonId}>{pokemonId}</p>
                <p className={classes.PokemonDescription}>{this.props.pokemonDescription}</p>
                <div className={classes.PokemonInfoContainer}>
                    <p className={classes.PokemonWeight}>Weight: {pokemon.weight}</p>
                    <p>Height: {pokemon.height}</p>
                </div>
                <div className={classes.PokemonInfoContainer}>
                    {pokemonTypes.map(pokemonType => pokemonType)}
                </div>
            </React.Fragment>
        )
    
        return (
            <div className={classes.DetailsCard}>
                {description}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        pokemonDescription: state.pokemonDescription,
        error: state.errorWhileDescription,
        loading: state.loadingDescription
    }
}

const dispatchStateToProps = dispatch => {
    return {
        fetchPokemonDescription: (id) => dispatch(actions.fetchDescriptionInit(id))
    }
}

export default connect(mapStateToProps,dispatchStateToProps)(CardWithDetails);