import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, Button } from "rsuite";
import SiteHeader from "../components/SiteHeader";
import { ISong } from "../interfaces";
import useFetch from "../useFetch";
import SongItem, { SongActionType } from "../components/SongItem";
import AtpModal from "../components/AtpModal";

type Props = {};

// Page used to let user see an artists' songs and add them to playlists

const Artist: FC = ({}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<ISong | undefined>(undefined);

  let { name } = useParams();
  name = decodeURIComponent(name ?? ""); // get artist name from url params

  const handleOpen = () => setOpen(true); // open add to playlist modal
  const handleClose = () => setOpen(false); // close add to playlist modal

  // get songs
  const {
    data: songs,
    loading,
    error,
  }: { data: ISong[]; loading: boolean; error: boolean } = useFetch(
    "http://localhost:3000/songs",
    { artist: name }
  );

  const openModalHandler = (song: ISong) => {
    setCurrentSong(song); // set currently viewed song
    handleOpen(); // open modal
  };

  return (
    <>
      <SiteHeader title={name}></SiteHeader>
      <main>
        <div className="container container--narrow">
          <h3>Songs</h3>
          <div className="song-results">
            <ul className="song-results__list">
              {songs.map((song: ISong) => {
                return (
                  <SongItem
                    key={song.id}
                    song={song}
                    actionType={SongActionType.add}
                    actionHandler={() => openModalHandler(song)}
                  />
                );
              })}
            </ul>
            {songs.length === 0 && (
              <p>This artist does not have any songs yet.</p>
            )}
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

      <AtpModal
        closeFunction={handleClose}
        open={open}
        song={currentSong}
      ></AtpModal>
    </>
  );
};

export default Artist;
