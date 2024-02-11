/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

import "./style.scss";

import Img from "../../../components/lazyLoadImage/Img";

import { ContentWrapper } from "../../../components";
import { avatar } from "../../../assets/movix-img";

const Cast = ({ data, loading }:any) => {
    const { url } = useSelector((state:any) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item: any) => {
                            
                            return (
                                <div className="listItem" key={item.id}>
                                    <div className="profileImg">
                                        <Img
                                            src={url.profile + item.profile_path || avatar}
                                            className="img"
                                            
                                        />
                                    </div>
                                    <div className=" name">{item.name}</div>
                                    <div className=" character">{item.character}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;