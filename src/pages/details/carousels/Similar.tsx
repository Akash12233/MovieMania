/* eslint-disable @typescript-eslint/no-explicit-any */

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel";

const Similar = ({ mediaType, id }: any) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
    

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data}
            loading={loading}
            media={mediaType}
        />
    );
};

export default Similar;