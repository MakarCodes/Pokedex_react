import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import classes from './Filter.module.scss';

import Button from '../Button/Button';

const Filter = ({ showFilteringButtons, showButtons }) => {
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

  let typeButtonList = null;
  if (showButtons) {
    typeButtonList = filterTypes.map((type, index) => {
      return <Button key={type + index}>{type.toUpperCase()}</Button>;
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
