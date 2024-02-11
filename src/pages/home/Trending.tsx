import { ContentWrapper } from '../../components'
import SwitchTabs from '../../components/switchTabs'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../components/carousel'

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const {data, loading} = useFetch(`/trending/all/${endPoint}`);
  // console.log(data);
  const onTabChange = (tab:string) => {
      setEndPoint(tab === "Day" ? "day" : "week");
  }

  return (
    
        <div className='carouselSection'>
          <ContentWrapper>
            <span className='carouselTitle' > Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}  />
          </ContentWrapper>
          <Carousel data={data} media={data?.media_type} loading={loading}  />

        </div>
    
  )
}

export default Trending