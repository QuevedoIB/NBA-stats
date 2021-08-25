import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/common/Button';

import './Modal.css';

const Modal = ({
    content,
    visible,
    children,
    onActionClick,
    actionLabel,
    cancelLabel,
    onCancelClick,
}) => {
    const [t] = useTranslation();
    if (!content || !visible) return null;

    return (
        <div className="modal-overlay centered-container">
            <section className="modal-section">
                <header className="modal-header">
                    <button
                        onClick={onCancelClick}
                        className="modal-close-button"
                    >
                        x
                    </button>
                </header>
                <h1 className="modal-title">{content.title}</h1>
                <p className="modal-message">{content.message}</p>
                {children}
                <footer className="modal-footer">
                    {onCancelClick && (
                        <Button
                            text={cancelLabel || t('actions.close')}
                            onClick={onCancelClick}
                            role="secondary"
                        />
                    )}
                    {onActionClick && (
                        <Button
                            text={actionLabel || t('actions.accept')}
                            onActionClick={onActionClick}
                        />
                    )}
                </footer>
            </section>
        </div>
    );
};

export default Modal;
