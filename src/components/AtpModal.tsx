import React, { FC, useEffect, useState } from "react";
import { Modal, Loader } from "rsuite";
import { IPlaylist, ISong } from "../interfaces";
import useFetch from "../useFetch";
import PlusIcon from "@rsuite/icons/Plus";
import axios from "axios";

type Props = {
  closeFunction: Function;
  open: boolean;
  song: ISong | undefined;
};

// Modal shown on artist page and used to let user add songs to playlists

const AtpModal = ({ closeFunction, open, song }: Props) => {
  const url: string = "http://localhost:3000/playlists/"; // api url

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // is loading
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  // get playlist data
  const {
    data,
    loading,
    error,
  }: { data: IPlaylist[]; loading: boolean; error: boolean } = useFetch(url);

  // update playlists when data changes
  useEffect(() => {
    if (!error) setPlaylists(data ?? []);
  }, [data]);

  // save song to playlist
  const clickAtpHandler = (playlist: IPlaylist) => {
    setIsSubmitting(true);
    const oldSongs: ISong[] = playlist?.songs ?? [];
    const newSongs: ISong[] = [...oldSongs, song!].filter(
      (value, index, self) =>
        value !== undefined &&
        index ===
          self.findIndex(
            (t) => t !== undefined && t.id === value.id && t.name === value.name
          )
    );

    axios
      .patch(url + `/${playlist.id}`, {
        // filter new songs for duplicates and save to db
        songs: newSongs,
      })
      .then((res) => {
        setIsSubmitting(false); // udpate ui
        alert("Song added to playlist!"); // notify user
        // update songs in playlist
        setPlaylists((oldPlaylists: IPlaylist[]) => [
          ...oldPlaylists.filter((p: IPlaylist) => p.id !== playlist.id), // old playlists minus updated playlist
          { ...playlist, songs: newSongs }, // add updated playlist
        ]);
      })
      .catch((e) => {
        console.log(e);
        setIsSubmitting(false); // udpate ui
        alert("An error occurred, please try again..."); // notify user
      });
  };

  return (
    <Modal open={open} onClose={() => closeFunction()}>
      <Modal.Header>
        <h4>{song?.name ?? ""}</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="atp">
          <ul className="atp__playlists">
            {playlists.map((playlist: IPlaylist, index: number) => {
              const link = `/playlist/${encodeURIComponent(playlist.id)}`;
              return (
                <li className="atp__item" key={playlist.id}>
                  <h5>{playlist.name}</h5>
                  <button onClick={() => clickAtpHandler(playlist)}>
                    <PlusIcon />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal.Body>
      <div className="modal-footer">
        <div>{isSubmitting && <Loader />}</div>
        <button onClick={() => closeFunction()}>Done</button>
      </div>
      <div>
        {loading && (
          <div className="loader">
            <Loader size="lg" />
          </div>
        )}
      </div>
      <div>{error && "Error..."}</div>
    </Modal>
  );
};

export default AtpModal;
