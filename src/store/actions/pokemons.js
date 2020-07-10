import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchPokemonStart = () => {
  return {
    type: actionTypes.FETCHING_DATA_START,
  };
};

export const fetchPokemonSuccess = pokemons => {
  return {
    type: actionTypes.FETCHING_DATA_SUCCESS,
    pokemons: pokemons,
  };
};

export const fetchPokemonFail = error => {
  return {
    type: actionTypes.FETCHING_DATA_FAIL,
    erorr: error,
  };
};

export const fetchPokemonInit = () => {
  return dispatch => {
    dispatch(fetchPokemonStart());
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
      .then(response => {
        return Promise.all(
          response.data.results.map(result => axios.get(result.url))
        );
      })
      .then(responses => {
        return responses.map(singleResponse => singleResponse.data);
      })
      .then(pokemons => {
        console.log(pokemons);
        dispatch(fetchPokemonSuccess(pokemons));
      })
      .catch(error => {
        dispatch(fetchPokemonFail(error));
      });
  };
};

export const fetchPokemonTypes = type => {
  return dispatch => {
    dispatch(fetchPokemonStart());
    axios
      .get(`https://pokeapi.co/api/v2/type/${type}`)
      .then(response => {
        console.log(response.data.pokemon.slice(1, 6));
        return Promise.all(
          response.data.pokemon
            .slice(1, 6)
            .map(result => axios.get(result.pokemon.url))
        );
      })
      .then(responses => {
        console.log(responses, '[responses]');
        return responses.map(singleResponse => singleResponse.data);
      })
      .then(pokemons => {
        console.log(pokemons, '[pokemons]');
        dispatch(fetchPokemonSuccess(pokemons));
      })
      .catch(error => {
        dispatch(fetchPokemonFail(error));
      });
  };
};

export const fetchPokemonDescriptionStart = () => {
  return {
    type: actionTypes.FETCHING_DESCRIPTION_START,
  };
};

export const fetchPokemonDescriptionSuccess = descriptionText => {
  return {
    type: actionTypes.FETCHING_DESCRIPTION_SUCCESS,
    text: descriptionText,
  };
};

export const fetchPokemonDescriptionFail = error => {
  return {
    type: actionTypes.FETCHING_DESCRIPTION_FAIL,
    erorr: error,
  };
};

export const fetchDescriptionInit = id => {
  return dispatch => {
    dispatch(fetchPokemonDescriptionStart());
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then(response => {
        let descriptionText = response.data.flavor_text_entries.find(text => {
          return text.language.name === 'en';
        });
        dispatch(fetchPokemonDescriptionSuccess(descriptionText.flavor_text));
      })
      .catch(error => {
        dispatch(fetchPokemonDescriptionFail(error));
      });
  };
};
