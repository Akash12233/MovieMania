
import HeroBanner from './heroBanner'
import Popular from './popular'
import "./style.scss"
import TopRated from './topRated'
import Trending from './Trending'
const Home = () => {
  return (
    <div className='homepage'>
       
      <HeroBanner />
      <Trending/>
      <Popular />
      <TopRated/>
     

    </div>
  )
}

export default Home