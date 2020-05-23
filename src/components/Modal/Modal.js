import React from 'react';

import classes from './Modal.module.scss'
import Backdrop from './Backdrop/Backdrop';

const Modal = ({children, close}) => {
    return (
        <React.Fragment>
            <Backdrop close={close}/>
            <div className={classes.Modal}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default Modal;