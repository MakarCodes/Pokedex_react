import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchPokemonStart = () => {
    return {
        type: actionTypes.FETCHING_DATA_START
    };
};

export const fetchPokemonSuccess = (pokemons) => {
    return {
        type: actionTypes.FETCHING_DATA_SUCCESS,
        pokemons: pokemons
    };
};

export const fetchPokemonFail = (error) => {
    return {
        type: actionTypes.FETCHING_DATA_FAIL,
        erorr: error
    };
};


export const fetchPokemonInit = () => {
    return dispatch => {
        dispatch(fetchPokemonStart());
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
            .then(response => {
                return Promise.all(response.data.results.map(result => axios.get(result.url)));
            })
            .then(responses => {
                return responses.map(singleResponse => singleResponse.data)
            })
            .then(pokemons => {
                console.log(pokemons)
                dispatch(fetchPokemonSuccess(pokemons));
            })
            .catch(error => {
                dispatch(fetchPokemonFail(error));
            });
    };
};
    

