import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const activeHttpRequests = useRef([]); 

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            })

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            )
            
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false)
            return responseData;

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err.message;
        }
    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])

    return { isLoading, error, sendRequest, clearError }
}

/*
activeHttpRequests
This is the cleanup function of the effect - so that we cancel the ongoing request in case we're leaving the component before the request completed
*/