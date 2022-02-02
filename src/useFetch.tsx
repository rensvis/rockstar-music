import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";

// this is a custom hook that is used to fetch data via axios

const useFetch = (url: string, params?: {}) => {
  const [loading, setLoading] = useState<boolean>(true); // are we loading
  const [error, setError] = useState<boolean>(false); // is error
  const [data, setData] = useState<any[]>([]); // the response data

  // sorting and ordering
  const sort: string = "name"; // sort by name
  const order: string = "asc"; // ascending order

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel; // cancel request if new request comes in
    // make request
    axios({
      method: "GET",
      url: url,
      params: {
        _sort: sort,
        _order: order,
        ...params,
      },
      cancelToken: new axios.CancelToken((c: Canceler) => (cancel = c)),
    })
      .then((res) => {
        // update data and remove duplicates
        setData((prevData) => {
          return [...prevData, ...res.data.map((a: any) => a)].filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.place === value.place && t.name === value.name
              )
          );
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return; // ignore if request was canceled by axios
        console.log(e);
        alert("Something went wrong. Please try again."); // notify user of error
      })
      .finally(() => {
        setLoading(false); // update loading
      });
  }, []);

  return { loading, error, data }; // return values
};

export default useFetch;
