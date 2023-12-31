import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/images/movix-logo.svg";

export const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            } else {
                setShow("show")
            }
        } else {
            setShow("top")
        }
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar)
        return () => {
            window.removeEventListener("scroll", controlNavbar)
        }
    }, [lastScrollY])

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000)
        }
    }

    const navigationHandler = (type) => {
        switch (type) {
            case "movie":
                navigate("/explore/movie")
                break;
            case "tv":
                navigate("/explore/tv")
                break;
            case "logo":
                navigate("/")
                break;
            default:
                break;
        }
        setMobileMenu(false);
    }
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigationHandler("logo")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
                    <li className="menuItem" onClick={() => navigationHandler("tv")}>Tv Shows</li>
                    <li className="menuItem" ><HiOutlineSearch onClick={openSearch} /></li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
                </div>
            </ContentWrapper>
            {showSearch && (<div className="searchBar">
                <contentWrapper>
                    <div className="searchInput">
                        <input type="text" placeholder="Search for a movie or a tv show" onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
                        <VscChromeClose onClick={() => setShowSearch(false)} />
                    </div>
                </contentWrapper>
            </div>)}
        </header>
    );
};
