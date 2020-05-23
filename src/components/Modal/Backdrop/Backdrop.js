import React from 'react';

import classes from './Backdrop.module.scss'

const Backdrop = ({close}) => {
    return (
        <div 
            onClick={close}
            className={classes.Backdrop}></div>
    );
};

export default Backdrop;