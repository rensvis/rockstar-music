import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Message } from "rsuite";
import SiteHeader from "../components/SiteHeader";
import SubmitButton from "../components/SubmitButton";
import { IPlaylist } from "../interfaces";
import useFetch from "../useFetch";
// import { Notification } from "rsuite";

type Props = {};

// Page used to let user scroll through and add playlists

export default function Playlists({}: Props) {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]); // playlists
  const [newPlaylistName, setNewPlaylistName] = useState<string>(""); // new playlist name
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // is creating new playlist

  // get data
  const {
    data,
    loading,
    error,
  }: { data: IPlaylist[]; loading: boolean; error: boolean } = useFetch(
    "http://localhost:4000/playlists"
  );

  // update playlists when data changes
  useEffect(() => {
    setPlaylists(data);
    console.log(data);
  }, [data]);

  // update newPlaylistName
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPlaylistName(e.target.value);
  };

  // create new playlist
  const handleSubmit = () => {
    if (newPlaylistName === "") return; // return if input field is empty
    setIsSubmitting(true); // update ui
    // make post request
    axios({
      method: "POST",
      url: "http://localhost:4000/playlists",
      data: {
        name: newPlaylistName,
      },
    })
      .then((res) => {
        // create new playlist object
        const newPlaylist: IPlaylist = {
          id: res.data.id,
          name: newPlaylistName,
          songs: [],
        };
        // add object to playlist
        setPlaylists((oldPlaylists: IPlaylist[]) => [
          ...oldPlaylists,
          newPlaylist,
        ]);
        setNewPlaylistName(""); // reset user input
      })
      .catch((e) => {
        console.log(e);
        alert("An error occurred, please try again..."); // notify user of error
      })
      .finally(() => {
        setIsSubmitting(false); // update ui
      });
  };

  return (
    <>
      <SiteHeader title="Playlists"></SiteHeader>
      <main>
        <div className="container container--narrow">
          <div className="new-playlist">
            <label htmlFor="new-playlist-input">New Playlist</label>
            <input
              id="new-playlist-input"
              type="text"
              value={newPlaylistName}
              onChange={handleChange}
            />
            <br />
            <SubmitButton
              text="Add"
              loading={isSubmitting}
              onClick={handleSubmit}
              disabled={newPlaylistName.length === 0}
            ></SubmitButton>
          </div>
          <div className="playlist-results">
            <ul className="playlist-results__list rockstar-list">
              {playlists.map((playlist: IPlaylist, index: number) => {
                const link = `/playlist/${encodeURIComponent(playlist.id)}`;
                return (
                  <li key={playlist.id}>
                    {
                      <Link to={link}>{`${playlist.name} (${
                        playlist.songs?.length ?? 0
                      } songs)`}</Link>
                    }
                  </li>
                );
              })}
            </ul>
          </div>
          {playlists.length === 0 && <p>You don't have any playlists yet.</p>}
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
}
