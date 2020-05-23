import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    pokemons: [],
    loading: false,
    error: false
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

const pokemonReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCHING_DATA_START: return fetchPokemonStart(state, action);
        case actionTypes.FETCHING_DATA_SUCCESS: return fetchPokemonSuccess(state, action);
        case actionTypes.FETCHING_DATA_FAIL: return fetchPokemonFail(state, action);
        default: return state;
    }
}
export default pokemonReducer;