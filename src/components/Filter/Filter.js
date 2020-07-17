import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import classes from './Filter.module.scss';

import Button from '../Button/Button';

const Filter = ({
  showFilteringButtons,
  showButtons,
  filterType,
  filterBy,
}) => {
  const filterTypes = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'fairy',
    'dark',
  ];
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
  };

  const getStylesForButtons = type => {
    if (filterBy.includes(type)) {
      return {
        backgroundColor: TYPE_COLORS[type],
      };
    } else {
      return {
        backgroundColor: '',
      };
    }
  };

  let typeButtonList = null;
  if (showButtons) {
    typeButtonList = filterTypes.map((type, index) => {
      return (
        <Button
          key={type + index}
          clicked={filterType}
          name={type}
          bgStyle={getStylesForButtons(type)}
        >
          {type.toUpperCase()}
        </Button>
      );
    });
  }

  return (
    <div className={classes.FilterContainer}>
      <button onClick={showFilteringButtons} className={classes.filterBtn}>
        <i>
          <FontAwesomeIcon icon={faFilter} size='2x' />
        </i>
      </button>
      {typeButtonList}
    </div>
  );
};

export default Filter;
