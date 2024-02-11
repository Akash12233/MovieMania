/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";


import ContentWrapper from "../contentWrapper";
import Img from "../lazyLoadImage/Img";
import {PosterFallback} from "../../assets/movix-img";
import CircleRating from "../ratings";

import "./style.scss";
import Genres from "../genres";

type props ={
    title?: string;
    data: any;
    loading: boolean;
    media: string;
} 

const Carousel = (props:props ) => {

    const carouselContainer = useRef<any>();
    const {url} = useSelector((state:any) => state.home);
    const navigate = useNavigate();
    // console.log(props.data);
    const navigation = (dir: string) => {
        const container = carouselContainer.current;

        const scrollAmount = 
                        dir === "left" ?
                        container.scrollLeft -= (container.offsetWidth + 20)
                        :container.scrollLeft += (container.offsetWidth + 20);
        
        container.scrollTo({left: scrollAmount, behavior: "smooth"});
    }

    const skItem = () =>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">

                </div>
                <div className="textBlock">
                    <div className="title skeleton">

                    </div>
                    <div className="date skeleton">

                    </div>
                </div>
            </div>
        )
    }

  return (
    <>
    <div className="carousel" >
        <ContentWrapper>
            {props.title && <div className="carouselTitle">{props.title}</div>}
        <BsFillArrowRightCircleFill 
                className=" carouselRighttNav arrow"
                onClick={() => navigation("right")}
            
            />
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={() => navigation("left")}
            />
            
            {!props.loading? (
                <div className="carouselItems" ref={carouselContainer}>
                    {props.data?.results?.map((item:any) => {
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                        const nav = (item.media_type ? item.media_type : props.media)
                        
                        return(
                        <div key={item.id} className="carouselItem" onClick={() => navigate(`/${nav}/${item.id}`)}>
                            <div className="posterBlock">
                                <Img src={posterUrl} />
                                <CircleRating rating={item.vote_average.toFixed(1)} />
                                <Genres data={item.genre_ids.splice(0,2)} />
                            </div>
                            <div className="textBlock">
                                <span className="title">{item.title || item.name}</span>
                                <span className="date">{dayjs(item.release_date).format("MMM D, YYYY")}</span>
                            </div>
                        </div>
                    )})}
                </div>
            ):(
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            )}
            
        </ContentWrapper>
    </div>
    </>
  )
}

export default Carousel