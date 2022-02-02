import React from "react";
import { Link, Router } from "react-router-dom";

type Props = {
  title: string;
};

// Header shown on every page

const SiteHeader = ({ title }: Props) => {
  return (
    <div className="site-header">
      <div className="">
        <header className="site-header__top container">
          <Link to="/">
            <img
              className="site-header__logo"
              src={require("../assets/images/RST-073-logo-Team-Rockstars-IT.png")}
              alt="Logo"
            />
          </Link>
          <nav className="site-header__nav">
            <ul>
              <li>
                <Link to="/">Artists</Link>
              </li>
              <li>
                <Link to="/playlists">Playlists</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="site-header__main">
          <h1 className="site-header__title">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
