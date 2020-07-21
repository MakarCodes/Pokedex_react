import React from 'react';
import classes from './Button.module.scss';

const Button = ({ children, clicked, name, bgStyle }) => {
  return (
    <button
      onClick={e => {
        clicked(children);
      }}
      className={classes.Button}
      name={name}
      style={bgStyle}
    >
      {children}
    </button>
  );
};

export default Button;
