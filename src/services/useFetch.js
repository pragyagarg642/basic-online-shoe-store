import { useEffect, useState, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
    const isMounted = useRef(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isMounted.current = true;
        async function init() {
            try {
                const res = await fetch(baseUrl + url);
                if (res.ok) {
                    const json = await res.json();
                    if (isMounted) setData(json);
                } else {
                    throw res;
                }
            } catch (e) {
                if (isMounted) setError(e);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        init();

        return () => isMounted.current = false;
    }, [url]);

    return {data, error, loading}
}

export function Fetch({ url, children }) {
    const { loading, data, error } = useFetch(url);
    return children(data, loading, error);
}