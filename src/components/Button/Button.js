import React from 'react';

const Button = ({children, clicked}) => {
    return (
        <button onClick={clicked}>{children}</button>
    );
};

export default Button;