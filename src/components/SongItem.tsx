import React from "react";
import { ISong } from "../interfaces";
import TrashIcon from "@rsuite/icons/Trash";
import PlusIcon from "@rsuite/icons/Plus";

// type of action on button click
export enum SongActionType {
  delete,
  add,
}

type Props = {
  song: ISong;
  actionType: SongActionType;
  actionHandler: Function;
};

// Song item in list, shown on artist and playlist pages

const SongItem = ({ song, actionType: action, actionHandler }: Props) => {
  // get formatted minutes:seconds, takes song duration in milliseconds
  const getSongDuration = (songDuration: number) => {
    const minutes: number = Math.floor(song.duration / 60000), // calculate minutes
      seconds = Math.floor((songDuration - minutes * 60000) / 1000); // calculate remaining seconds
    const secondsFormatted: string = `0${seconds.toString()}`.slice(-2); // format seconds to two digits
    return `${minutes.toString()}:${secondsFormatted}`; // return readable duration
  };

  console.log(song.duration);

  return (
    <li
      id={song.id}
      key={song.id}
      className="playlist__item"
      data-testid="song-item"
    >
      <div className="song">
        <div className="song__info">
          <h6 className="song__name" data-testid="song-name">
            {song.name}
          </h6>
          <p className="song__details">
            <span className="song__details__artist" data-testid="song-artist">
              {song.artist}
            </span>
            <span className="song__details__separator"> | </span>
            <span
              className="song__details__duration"
              data-testid="song-duration"
            >
              {getSongDuration(song.duration)}
            </span>
          </p>
        </div>
        <div className="song__actions">
          {action === SongActionType.delete ? (
            <button role={`delete-${song.id}`} onClick={() => actionHandler()}>
              <TrashIcon />
            </button>
          ) : (
            <button role={`add-${song.id}`} onClick={() => actionHandler()}>
              <PlusIcon />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default SongItem;
