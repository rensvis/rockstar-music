// import React from 'react';
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SiteHeader from "./components/SiteHeader";
import Artists from "./pages/Artists";
import NotFound from "./pages/NotFound";
import Playlists from "./pages/Playlists";

const App: FC = () => {
  return (
    <div className="App">
      <SiteHeader></SiteHeader>
      <Router>
        <Routes>
          <Route path="/" element={<Artists />}></Route>
          <Route path="/playlists" element={<Playlists />}></Route>
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
