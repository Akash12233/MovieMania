/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";


import {ContentWrapper} from "../index";
import {movixLogo} from "../../assets/movix-img";
import "./style.scss";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
        setLastScrollY(window.scrollY);
    },[location])

    const controlNavbar = () => {
      // console.log(window.scrollY)
      if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide");
        }else{
          setShow("show");
        }
        setLastScrollY(window.scrollY);
      }
      else{
        setShow("top");
      }
    }
    useEffect(() => {
      window.addEventListener("scroll", controlNavbar)
      return ()=>window.removeEventListener("scroll", controlNavbar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[lastScrollY])

    const handleChange = (event:any) => {
      if(event.key === 'Enter' && query.length > 0) {
        navigate(`/search/${query}`)
      }
      setQuery(event.target.value);
    }

    const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
    }

    const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
    }

    const navigationHandler = (type:string) =>{
      if (type === "movie"){
        navigate("/explore/movie");
      }
      else if(type === "tv"){
        navigate("/explore/tv");
      }
      setMobileMenu(false);
    }

    return (
       <header className={`header ${mobileMenu ? "mobileView": ""} ${show}`}>
        <ContentWrapper>
          <div className="logo" onClick={() => navigate("/") }>
            <img src={movixLogo} alt="{logo}" />
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
            <li className="menuItem" onClick={() => navigationHandler("tv")}>Tv Shows</li>
            <li className="menuItem" >
              <HiOutlineSearch onClick={openSearch}/>
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose onClick={()=>setMobileMenu(false)} />

            ):(
              <SlMenu onClick={openMobileMenu} />

            )}


          </div>
        </ContentWrapper>
        { showSearch && (<div className="searchBar">
          <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              value={query}
              onKeyUp={handleChange}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie or tv show...."
            />
           <VscChromeClose onClick={()=>setShowSearch(false)}/>

          </div>
          </ContentWrapper>
        </div>)}
       </header>
    );
};

export default Header;