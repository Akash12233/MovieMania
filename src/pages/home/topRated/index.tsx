import { ContentWrapper } from '../../../components'
import SwitchTabs from '../../../components/switchTabs'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel'
const TopRated = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const {data, loading} = useFetch(`/${endPoint}/top_rated`);
  // console.log(data);
  const onTabChange = (tab:string) => {
      setEndPoint(tab === "Movies" ? "movie" : "tv");
  }

  return (
    
        <div className='carouselSection'>
          <ContentWrapper>
            <span className='carouselTitle' > Top Rated</span>
            <SwitchTabs data={["Movies","Tv Shows"]} onTabChange={onTabChange}  />
          </ContentWrapper>
          <Carousel data={data} media={endPoint} loading={loading}  />
 
        </div>
    
  )
}

export default TopRated