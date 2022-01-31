import React from "react";

type Props = {};

export default function SiteHeader({}: Props) {
  return (
    <div className="site-header">
      <img
        className="site-header__img"
        src="assets\images\RST-073-logo-Team-Rockstars-IT.png"
        alt=""
      />
      <h1>Header</h1>
    </div>
  );
}
