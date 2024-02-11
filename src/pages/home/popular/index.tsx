import { ContentWrapper } from '../../../components'
import SwitchTabs from '../../../components/switchTabs'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel'
const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const {data, loading} = useFetch(`/${endPoint}/popular`);
  // console.log(data);
  const onTabChange = (tab:string) => {
      setEndPoint(tab === "Movies" ? "movie" : "tv");
  }

  return (
    
        <div className='carouselSection'>
          <ContentWrapper>
            <span className='carouselTitle' > What's Popular</span>
            <SwitchTabs data={["Movies","Tv"]} onTabChange={onTabChange}  />
          </ContentWrapper>
          <Carousel data={data} media={endPoint} loading={loading}  />

        </div>
    
  )
}

export default Popular