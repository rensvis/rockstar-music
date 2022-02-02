import { render } from "@testing-library/react";
import { ISong } from "../interfaces";
import SongItem, { SongActionType } from "./SongItem";

describe("SongItem component test", () => {
  const song: ISong = {
    id: "",
    album: "",
    artist: "",
    bpm: 0,
    duration: 0,
    genre: "",
    name: "This is a song",
    shortname: "",
    spotifyId: "",
    year: 0,
  };

  it("SongItem component renders", () => {
    const { getByTestId } = render(
      <SongItem
        song={song}
        actionType={SongActionType.add}
        actionHandler={() => {}}
      />
    );
    const li = getByTestId("song-item");
    expect(li).toBeTruthy();
  });

  it("SongItem component shows correct song name", () => {
    const { getByTestId } = render(
      <SongItem
        song={song}
        actionType={SongActionType.add}
        actionHandler={() => {}}
      />
    );
    const songNameElement = getByTestId("song-name");
    expect(songNameElement.innerHTML).toBe(song.name);
  });

  it("SongItem component formats song duration correctly", () => {
    const { getByTestId } = render(
      <SongItem
        song={{ ...song, duration: 209995 }}
        actionType={SongActionType.add}
        actionHandler={() => {}}
      />
    );
    const songNameElement = getByTestId("song-duration");
    expect(songNameElement.innerHTML).toBe("3:29");
  });
});
