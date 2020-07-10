import React from 'react';
import classes from './Button.module.scss';

const Button = ({ children, clicked }) => {
  return (
    <button
      onClick={e => {
        clicked(children, e);
      }}
      className={classes.Button}
    >
      {children}
    </button>
  );
};

export default Button;
