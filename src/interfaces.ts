// interface used for artists
export interface IArtist {
  id: string;
  name: string;
}

// interface used for songs
export interface ISong {
  id: string;
  album: string;
  artist: string;
  bpm: number;
  duration: number;
  genre: string;
  name: string;
  shortname: string;
  spotifyId: string;
  year: number;
}

// interface used for playlists
export interface IPlaylist {
  id: string;
  name: string;
  songs: ISong[];
}
