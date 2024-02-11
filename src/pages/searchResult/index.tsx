/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss"
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from 'react-router-dom'
import { fetchData } from "../../utils/api";
import { ContentWrapper, MovieCard, Spinner } from "../../components";
import { noResults } from "../../assets/movix-img";

type dataState = {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

const SearchResult = () => {
  const [data, setData] = useState<dataState>({page: 1, results: [], total_pages: 0, total_results: 0});
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const {query} = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`,{}).then((res) =>{
      setData(res);
      setPageNum((prev) =>prev+1)
      setLoading(false);

    })

  };
  const fetchNextData = () => {
    
    fetchData(`/search/multi?query=${query}&page=${pageNum}`,{}).then((res) =>{
      if(data?.results){
        setData({
          ...data,
          results:[...data.results, ...res.results]
        });
        
      }
      else{
        setData(res);
      }
      setPageNum((prev) =>prev+1)
   

    })

  };


  useEffect(() =>{
    setPageNum(1);
    fetchInitialData();

  },[query]);
 
  // console.log(query)
  return (
    <div
      className="searchResultsPage"
    >
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper >
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${data?.total_results>1? "results": "result"} of '${query}'`}</div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || 0}
                next={fetchNextData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner/>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {data?.results.map((item: any) => {
                  if(item.media_type === "person") return;
                   return <MovieCard
                    key={item.id} 
                    data={item}
                    mediaType={item.media_type}
                  />}
                )}
              </InfiniteScroll>
            </>
          ):(
            <div className="resultNotFound flex flex-col justify-center items-center" >
              <img src={noResults} alt="No Result" className="h-96 " />
              Sorry, Result not found
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult