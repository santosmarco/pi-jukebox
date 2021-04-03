interface ApiPlayerData {
  device_id: string;
}

export interface ApiPlayerTrack {
  uri: string; // Spotify URI
  id?: string; // Spotify ID from URI (can be null)
  type: "track" | "episode" | "ad"; // Content type: can be "track", "episode" or "ad"
  media_type: "audio" | "video"; // Type of file: can be "audio" or "video"
  name: string; // Name of content
  is_playable: boolean; // Flag indicating whether it can be played
  album: {
    uri: string; // Spotify Album URI
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  artists: [{ uri: string; name: string }];
}

interface ApiPlayerState {
  context: {
    uri?: string; // The URI of the context (can be null)
    metadata?: { [key: string]: any }; // Additional metadata for the context (can be null)
  };
  disallows: {
    // A simplified set of restriction controls for
    pausing?: boolean; // The current track. By default, these fields
    peeking_next?: boolean; // will either be set to false or undefined, which
    peeking_prev?: boolean; // indicates that the particular operation is
    resuming?: boolean; // allowed. When the field is set to `true`, this
    seeking?: boolean; // means that the operation is not permitted. For
    skipping_next?: boolean; // example, `skipping_next`, `skipping_prev` and
    skipping_prev?: boolean; // `seeking` will be set to `true` when playing an
    // ad track.
  };
  paused: boolean; // Whether the current track is paused.
  position: number; // The position_ms of the current track.
  repeat_mode: 0 | 1 | 2; // The repeat mode. No repeat mode is 0,
  // once-repeat is 1 and full repeat is 2.
  shuffle: boolean; // True if shuffled, false otherwise.
  track_window: {
    current_track: ApiPlayerTrack; // The track currently on local playback
    previous_tracks: ApiPlayerTrack[]; // Previously played tracks. Number can vary.
    next_tracks: ApiPlayerTrack[]; // Tracks queued next. Number can vary.
  };
}

interface ApiPlayerError {
  message: string;
}

type ApiEventListenerCallback<T> = (ev: T) => void;

type ApiPlayerEventListenersMap = {
  ready: ApiEventListenerCallback<ApiPlayerData>;
  not_ready: ApiEventListenerCallback<ApiPlayerData>;
  player_state_changed: ApiEventListenerCallback<ApiPlayerState>;
  initialization_error: ApiEventListenerCallback<ApiPlayerError>;
  authentication_error: ApiEventListenerCallback<ApiPlayerError>;
  account_error: ApiEventListenerCallback<ApiPlayerError>;
  playback_error: ApiEventListenerCallback<ApiPlayerError>;
};

export interface ApiSpotifyPlayer {
  _options: {
    name: string;
    volume: number;
  };
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: <T extends keyof ApiPlayerEventListenersMap>(
    eventName: T,
    cb: ApiPlayerEventListenersMap[T]
  ) => boolean;
  removeListener: (
    eventName: keyof ApiPlayerEventListenersMap,
    cb?: () => void
  ) => boolean;
  getCurrentState: () => Promise<ApiPlayerState | null>;
  setName: (name: string) => Promise<void>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (positionMs: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
}
