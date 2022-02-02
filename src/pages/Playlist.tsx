import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SubmitButton from "../components/SubmitButton";
import { IPlaylist, ISong } from "../interfaces";
import useFetch from "../useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SongItem, { SongActionType } from "../components/SongItem";
import { Loader } from "rsuite";

type Props = {};

// Page used to let user scroll through and delete songs in a playlist

const Playlist: FC = ({}: Props) => {
  const url: string = "http://localhost:3000/playlists/"; // api url
  const [isDeletingSong, setIsDeletingSong] = useState<boolean>(false); // whether user is deleting a song
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // whether user is deleting the playlist
  const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined); // the current playlist

  const navigate = useNavigate(); // used to navigate back when deleting the playlist

  // get playlist id from url params for fetching playlist data
  let { id } = useParams();
  id = decodeURIComponent(id ?? "");

  // get playlist data
  const {
    data,
    loading,
    error,
  }: { data: IPlaylist[]; loading: boolean; error: boolean } = useFetch(url, {
    id: id,
  });

  useEffect(() => {
    setPlaylist(data[0]);
  }, [data]);

  // delete playlist
  function deleteHandler() {
    if (window.confirm("Are you sure?") === false) return;
    axios
      .delete(url + `/${id}`)
      .then((res) => {
        setIsDeleting(false); // update ui
        navigate("/playlists"); // navigate back
      })
      .catch((e) => {
        console.log(e);
        setIsDeleting(false); // update ui
        alert("An error occurred, please try again..."); // notify user of error
      });
  }

  // remove song from playlist
  const deleteSongHandler = (song: ISong) => {
    if (!playlist) return; // if we don't have a playlist do nothing
    const oldSongs: ISong[] = playlist?.songs ?? []; // the songs in playlist before deleting
    const newSongs: ISong[] = oldSongs.filter((s: ISong) => s.id !== song.id); // the songs in playlist after deleting
    setIsDeletingSong(true); // update ui
    // make patch request
    axios
      .patch(url + `/${playlist?.id}`, {
        // filter new songs for duplicates and save to db
        songs: newSongs,
      })
      .then((res) => {
        setIsDeletingSong(false); // update ui
        const newPlaylist: IPlaylist = { ...playlist, songs: newSongs }; // create new playlist
        setPlaylist(newPlaylist); // update current playlist
        alert("Song removed from playlist!"); // notify user
      })
      .catch((e) => {
        console.log(e);
        setIsDeletingSong(false); // update ui
        alert("An error occurred, please try again..."); // notify user of error
      });
  };

  return (
    <>
      <SiteHeader title={playlist?.name ?? ""}></SiteHeader>
      <main>
        <div className="container container--narrow">
          <div className="playlist">
            <div className="playlist__header">
              <div>{isDeletingSong && <Loader />}</div>
              <SubmitButton
                classArray={["playlist__delete"]}
                text="Delete Playlist"
                loading={isDeleting}
                onClick={deleteHandler}
              />
            </div>
            <ul className="playlist__list">
              {playlist?.songs?.map((song: ISong) => {
                return (
                  <SongItem
                    song={song}
                    key={song.id}
                    actionType={SongActionType.delete}
                    actionHandler={() => deleteSongHandler(song)}
                  />
                );
              })}
            </ul>
            {playlist?.songs?.length === 0 ||
              (!playlist?.songs && (
                <p>No songs yet. Browse your favorite artists to add some!</p>
              ))}
            <div>
              {loading && (
                <div className="loader">
                  <Loader size="lg" />
                </div>
              )}
            </div>
            <div>{error && "Error..."}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Playlist;
