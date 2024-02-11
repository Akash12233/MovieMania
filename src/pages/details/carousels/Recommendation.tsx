/* eslint-disable @typescript-eslint/no-explicit-any */


import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel";

const Recommendation = ({ mediaType, id }:any) => {
    const { data, loading } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
        // console.log(data)
    return (
        <Carousel
            title="Recommendations"
            data={data}
            loading={loading}
            media={mediaType}
        />
    );
};

export default Recommendation;