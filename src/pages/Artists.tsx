import React, {
  ChangeEvent,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";
import SiteHeader from "../components/SiteHeader";
import { IArtist } from "../interfaces";
import useArtistSearch from "../useArtistSearch";
import { Loader } from "rsuite";
import { Link } from "react-router-dom";

type Props = {};

// Page used to let user infinitely scroll and search through all artists

const Artists = ({}: Props) => {
  const [query, setQuery] = useState<string>(""); // user search query
  const [pageNumber, setPageNumber] = useState<number>(1); // current page (infinite scroll)

  // get data
  const { artists, loading, hasMore, error } = useArtistSearch(
    query,
    pageNumber
  );

  const observer: MutableRefObject<IntersectionObserver | undefined> = useRef(); // observer to see if last artist element is in view, thus we need to load more
  const lastArtistElementRef = useCallback(
    (node) => {
      if (loading) return; // return if already loading
      if (observer.current) observer.current.disconnect(); // resetting
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // increase page number
          setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node); // keep an eye on the node to see if it's in view
    },
    [loading, hasMore] // dependencies
  );

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value); // update user search query
    setPageNumber(1); // always reset pagenumber to 1
  }

  return (
    <>
      <SiteHeader title="Artists"></SiteHeader>
      <main>
        <div className="container container--narrow">
          <div className="artist-search">
            <label htmlFor="artist-search">Search</label>
            <input
              id="artist-search"
              type="text"
              value={query}
              onChange={handleSearch}
            />
          </div>
          <div className="artist-results">
            <ul className="artist-results__list rockstar-list">
              {artists.map((artist: IArtist, index: number) => {
                const link = `/artist/${encodeURIComponent(artist.name)}`;
                if (artists.length === index + 1) {
                  return (
                    <li
                      className="artist-results__item"
                      ref={lastArtistElementRef}
                      key={artist.id}
                    >
                      <Link to={link}>{artist.name}</Link>
                    </li>
                  );
                }
                return (
                  <li key={artist.id}>
                    <Link to={link}>{artist.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            {loading && (
              <div className="loader">
                <Loader size="lg" />
              </div>
            )}
          </div>
          <div>{error && "Error..."}</div>
        </div>
      </main>
    </>
  );
};

export default Artists;
