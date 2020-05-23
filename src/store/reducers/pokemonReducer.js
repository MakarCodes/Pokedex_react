import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    pokemons: [],
    loading: false,
    error: false,
    loadingDescription: false,
    pokemonDescription: '',
    errorWhileDescription: false
}

const fetchPokemonStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};
const fetchPokemonSuccess = (state, action) => {
    return updateObject(state, {
        pokemons: action.pokemons,
        loading: false
    });
};
const fetchPokemonFail = (state, action) => {
    return updateObject(state, {
        error: true,
        loading: false
    });
};

const fetchPokemonDescriptionStart = (state, action) => {
    return updateObject(state, {
        loadingDescription: true
    });
};
const fetchPokemonDescriptionSuccess = (state, action) => {
    return updateObject(state, {
        pokemonDescription: action.text,
        loadingDescription: false
    });
};
const fetchPokemonDescriptionFail = (state, action) => {
    return updateObject(state, {
        errorWhileDescription: state.error,
        loadingDescription: false
    });
};

const pokemonReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCHING_DATA_START: return fetchPokemonStart(state, action);
        case actionTypes.FETCHING_DATA_SUCCESS: return fetchPokemonSuccess(state, action);
        case actionTypes.FETCHING_DATA_FAIL: return fetchPokemonFail(state, action);
        case actionTypes.FETCHING_DESCRIPTION_START: return fetchPokemonDescriptionStart(state, action);
        case actionTypes.FETCHING_DESCRIPTION_SUCCESS: return fetchPokemonDescriptionSuccess(state, action);
        case actionTypes.FETCHING_DESCRIPTION_FAIL: return fetchPokemonDescriptionFail(state, action);
        default: return state;
    }
}
export default pokemonReducer;