/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux"
import "./style.scss"

const Genres = ({data}:any) => {
    const {genres} = useSelector((state:any) => state.home)
    // console.log(data)
  return (
    <div className="genres"> 
        {data?.map((g: any) =>{
            if(!genres[g]?.name) return;
            return (
                <div key={`${g}`} className="genre">
                    {genres[g]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres