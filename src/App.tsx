// import React from 'react';
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import Artists from "./pages/Artists";
import NotFound from "./pages/NotFound";
import Playlists from "./pages/Playlists";

import "rsuite/dist/rsuite.min.css";
import "./App.scss";
import Artist from "./pages/Artist";
import Playlist from "./pages/Playlist";

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Artists />}></Route>
          <Route path="/artist/:name" element={<Artist />}></Route>
          <Route path="/playlists" element={<Playlists />}></Route>
          <Route path="/playlist/:id" element={<Playlist />}></Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
