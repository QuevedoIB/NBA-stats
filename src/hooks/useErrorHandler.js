import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setError, clearError } from 'redux/reducers/error';

export default function useErrorHandler(incomingError) {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error.error);
    useEffect(() => {
        if (incomingError && !error) {
            dispatch(setError(incomingError));
        }
    }, [dispatch, error, incomingError]);

    const clearAppError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        clearAppError,
        error,
    };
}
