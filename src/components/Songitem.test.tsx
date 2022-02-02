import { render, screen } from "@testing-library/react";
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

  it("SongItem component shows correct song name", () => {
    render(
      <SongItem
        song={song}
        actionType={SongActionType.add}
        actionHandler={() => {}}
      />
    );

    const songNameElement = screen.getByText(song.name);
    expect(songNameElement).toBeInTheDocument();
    screen.debug();
  });

  it("SongItem component formats song duration correctly", () => {});
});
