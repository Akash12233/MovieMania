/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
const useFetch = (url:any) => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setData([]);
        setError("");

        fetchData(url,"")
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err:any) => {
                setLoading(false);
                setError("Something went wrong!");
                console.log(err)
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;