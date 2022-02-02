import React from "react";
import SiteHeader from "../components/SiteHeader";

type Props = {};

// Page used when no route was found

export default function NotFound({}: Props) {
  return (
    <>
      <SiteHeader title="404"></SiteHeader>
      <main>
        <div className="container">
          <h3>Zocht je iets?</h3>
          <p>Die pagina bestaat niet.</p>
        </div>
      </main>
    </>
  );
}
