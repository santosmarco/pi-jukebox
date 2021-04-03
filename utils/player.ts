import { ApiPlayerTrack, PlayerTrack } from "../types";

export const getLowestVolume = () => {
  return 0.000001;
};

export const formatApiTrack = (track: ApiPlayerTrack): PlayerTrack => {
  return {
    id: track.id,
    name: track.name,
    uri: track.uri,
    cover: track.album.images.sort(
      (imgA, imgB) => imgB.height - imgA.height
    )[0],
    album: {
      name: track.album.name,
      uri: track.album.uri,
    },
    artist: {
      name: track.artists[0].name,
      uri: track.artists[0].uri,
    },
  };
};
