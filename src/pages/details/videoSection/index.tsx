/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import "./style.scss";


import Img from "../../../components/lazyLoadImage/Img";
import { ContentWrapper, VideoPopup } from "../../../components";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }:any) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video: any) => {
                            return (
                                <div
                                    className="videoItem"
                                    key={video.id}
                                    onClick={() => {
                                        setShow(true);
                                        setVideoId(video.key);
                                    }}
                                >
                                    <div className="videoThumbnail">
                                        <Img
                                            src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                        />
                                        <PlayIcon />
                                    </div>
                                    <div className="videoTitle">{video.name}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}

            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;