import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from 'components/common/Modal';

import useErrorHandler from 'hooks/useErrorHandler';

const ErrorBoundary = () => {
    const [t] = useTranslation();

    const { error, clearAppError } = useErrorHandler();

    const errorMessage = useMemo(
        () =>
            error && {
                title: t('errors.modalTitle'),
                message: t('errors.modalGenericMessage', { error }),
            },
        [error, t]
    );

    return (
        <Modal
            content={errorMessage}
            visible={error}
            onActionClick={clearAppError}
            onCancelClick={clearAppError}
        />
    );
};

export default ErrorBoundary;
