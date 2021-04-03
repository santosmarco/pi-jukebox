export interface PlayerDevice {
  id?: string;
  name: string;
}

export interface PlayerAlbum {
  name: string;
  uri: string;
}

export interface PlayerArtist {
  name: string;
  uri: string;
}

export interface PlayerTrack {
  id: string;
  name: string;
  uri: string;
  cover: {
    url: string;
    height: number;
    width: number;
  };
  album: PlayerAlbum;
  artist: PlayerArtist;
}

export interface PlayerConfig {
  name: string;
  getAccessTokenHandler: () => string;
  volume?: number;
}

export interface PlayerConnectOptions {
  autoPlay?: boolean;
}

export interface PlayerEventsMap {
  state_changed: SpotifyPlayerState;
}

export interface SpotifyPlayerState {
  device: PlayerDevice;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  trackWindow: {
    currentTrack: PlayerTrack;
    previousTracks: PlayerTrack[];
    nextTracks: PlayerTrack[];
  };
}

export interface Player {
  readonly connect: (options?: PlayerConnectOptions) => Promise<void>;

  readonly on: <T extends keyof PlayerEventsMap>(
    ev: T,
    cb: (payload: PlayerEventsMap[T]) => void
  ) => void;

  readonly getState: () => Promise<SpotifyPlayerState>;

  readonly setVolume: (volume: number) => Promise<void>;
  readonly increaseVolume: (amount?: number) => Promise<void>;
  readonly decreaseVolume: (amount?: number) => Promise<void>;
  readonly mute: () => Promise<void>;
  readonly unmute: (volume?: number) => Promise<void>;

  readonly play: () => Promise<void>;
  readonly pause: () => Promise<void>;
  readonly resume: () => Promise<void>;
  readonly togglePlay: () => Promise<void>;

  readonly previousTrack: () => Promise<void>;
  readonly nextTrack: () => Promise<void>;
}
