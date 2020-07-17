import React from 'react';
import classes from './Button.module.scss';

const Button = ({ children, clicked, name }) => {
  return (
    <button
      onClick={e => {
        clicked(children, e);
      }}
      className={classes.Button}
      name={name}
    >
      {children}
    </button>
  );
};

export default Button;
