import { useState, useEffect } from 'react';

export const useFetchData = (URL = '', error_msg = 'An error has ocurred getting the data') => {
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
			try {
                const response = await window.fetch(URL);
                if (!response.ok) {
                    throw new Error(`Http status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setFetchData(data);
            } catch (error) {
                console.error(error.message);
                setError(error_msg)
            }
            setLoading(false);
        }
        fetchData();
    }, [URL]); 

    return { data: fetchData, loading, error };
}