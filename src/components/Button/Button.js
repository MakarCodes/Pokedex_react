import React from 'react';
import classes from './Button.module.scss';

const Button = ({children, clicked}) => {
    return (
        <button onClick={clicked} className={classes.Button}>{children}</button>
    );
};

export default Button;