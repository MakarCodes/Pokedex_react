import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import classes from './CardWithDetails.module.scss';
import * as actions from '../../../store/actions/index';
import Spinner from '../../Spinner/Spinner';

class CardWithDetails extends Component {
    componentDidMount() {
        let id = this.props.pokemon.id;
        this.props.fetchPokemonDescription(id);
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

        let description = this.props.loading ? <Spinner /> 
        : 
        (
            <React.Fragment>
                <img src={pokemon.sprites.front_default} alt=""/>
                <h1 className={classes.PokemonName}>{pokemon.name}</h1>
                <p className={classes.PokemonId}>{pokemonId}</p>
                <p>{this.props.pokemonDescription}</p>
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