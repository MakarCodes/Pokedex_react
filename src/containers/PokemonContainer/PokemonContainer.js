import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './PokemonContainer.module.scss';
import Modal from '../../components/Modal/Modal';
import CardWithDetails from '../../components/Modal/CardWithDetails/CardWithDetails';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

class PokemonContainer extends Component {
    state = {
        displayDetailInfo: false,
        pokemon: null
    }

    componentDidMount() {
        this.props.fetchPokemons();
    }

    detailInfoHandler = (pokemon) => {
        this.setState({
            displayDetailInfo: true,
            pokemon: pokemon
        });
    };

    closeDetailInfoHandler = () => {
        this.setState({
            displayDetailInfo: false
        })
    }


    render() {
        let pokemonList = this.props.pokemons.map(pokemon => {
            return <PokemonCard 
                        clicked={this.detailInfoHandler}
                        pokemon={pokemon} 
                        key={pokemon.id}/>
        })

        let modalWithDetails = this.state.displayDetailInfo ? 
        (
        <Modal close={this.closeDetailInfoHandler}>
            <CardWithDetails pokemon={this.state.pokemon}/>
        </Modal>
        ) 
        : 
        null

        return (
            <div className={classes.Container}>
                {pokemonList}
                {modalWithDetails}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pokemons: state.pokemons,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemons: () => dispatch(actions.fetchPokemonInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);
