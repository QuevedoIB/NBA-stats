import React from 'react';

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
            className={`button-${role} ${classes}`}
            type={type}
            onClick={onClick}
        >
            {children || text}
        </button>
    );
};

export default Button;
