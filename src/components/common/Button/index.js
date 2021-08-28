import React from 'react';

import './Button.css';

const Button = ({
    role = 'primary',
    onClick,
    type = 'button',
    text,
    classes = '',
    children,
}) => {
    return (
        <button
            className={`button-container button-${role} ${classes}`}
            type={type}
            onClick={onClick}
        >
            {children || text}
        </button>
    );
};

export default Button;
