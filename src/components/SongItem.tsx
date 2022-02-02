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

  return (
    <li id={song.id} key={song.id} className="playlist__item">
      <div className="song">
        <div className="song__info">
          <h6 className="song__name">{song.name}</h6>
          <p className="song__details">
            {song.artist} | {getSongDuration(song.duration)}
          </p>
        </div>
        <div className="song__actions">
          {action === SongActionType.delete ? (
            <button onClick={() => actionHandler()}>
              <TrashIcon />
            </button>
          ) : (
            <button onClick={() => actionHandler()}>
              <PlusIcon />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default SongItem;
