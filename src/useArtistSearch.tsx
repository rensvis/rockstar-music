import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";
import { IArtist } from "./interfaces";

// this is a custom hook that is used to fetch artists via axios

const useArtistSearch = (query: string, pageNumber: number) => {
  const [loading, setLoading] = useState<boolean>(true); //
  const [error, setError] = useState<boolean>(false); // is error
  const [artists, setArtists] = useState<IArtist[]>([]); // the artist data
  const [hasMore, setHasMore] = useState<boolean>(false); // wether we have more results

  // sorting and ordering
  const limit: number = 40; // results per fetch
  const sort: string = "name"; // sort by name
  const order: string = "asc"; // ascending order

  // reset artists when user search query changes
  useEffect(() => setArtists([]), [query]);

  useEffect(() => {
    // reset vars
    setLoading(true);
    setError(false);
    let cancel; // cancel request if new request comes in
    // make request
    axios({
      method: "GET",
      url: "http://localhost:4000/artists",
      params: {
        q: query,
        _page: pageNumber,
        _limit: limit,
        _sort: sort,
        _order: order,
      },
      cancelToken: new axios.CancelToken((c: Canceler) => (cancel = c)),
    })
      .then((res) => {
        // update data and remove duplicates
        setArtists((prevArtists) => {
          return [...prevArtists, ...res.data.map((a: IArtist) => a)].filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.place === value.place && t.name === value.name
              )
          );
        });
        setHasMore(res.data.length === limit); // update hasMore, if we got as many results as we wanted then it's likely there are more results. if not then there definitely are no more results
      })
      .catch((e) => {
        if (axios.isCancel(e)) return; // ignore if request was canceled by axios
        console.log(e);
        alert("Something went wrong. Please try again."); // notify user of error
      })
      .finally(() => {
        setLoading(false); // update loading
      });
  }, [query, pageNumber]);

  return { loading, hasMore, error, artists }; // return values
};

export default useArtistSearch;
