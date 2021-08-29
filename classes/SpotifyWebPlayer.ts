import EventEmitter from "events";
import { ApiSpotifyPlayer, Player, PlayerConfig } from "../types";
import { formatApiTrack, getLowestVolume } from "../utils";
import SpotifyApi from "./SpotifyApi";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: any;
    };
  }
}

class EventsController extends EventEmitter {}

export default class SpotifyWebPlayer implements Player {
  private readonly player: ApiSpotifyPlayer;
  private readonly api: SpotifyApi;
  private readonly events = new EventsController();
  private getAccessToken: () => string;

  private deviceId?: string;

  constructor(config: PlayerConfig) {
    this.getAccessToken = config.getAccessTokenHandler;

    this.player = new window.Spotify.Player({
      ...config,
      getOAuthToken: (cb: (token: string) => void) => {
        cb(this.getAccessToken());
      },
    });

    this.api = new SpotifyApi({ getAccessTokenHandler: this.getAccessToken });

    this.player.addListener("not_ready", (ev) => {
      console.log(ev);
    });

    this.player.addListener("player_state_changed", async () => {
      const state = await this.getState();
      this.events.emit("state_changed", state);
    });
  }

  on: Player["on"] = (eventName, callback) => {
    this.events.on(eventName, callback);
  };

  getState: Player["getState"] = async () => {
    const currState = await this.player.getCurrentState();
    const {
      current_track: apiCurrentTrack,
      previous_tracks: apiPreviousTracks,
      next_tracks: apiNextTracks,
    } = currState.track_window;
    const currVolume = await this.player.getVolume();

    return {
      device: {
        id: this.deviceId,
        name: this.player._options.name,
      },
      isPlaying: !currState.paused,
      volume: currVolume,
      isMuted: currVolume <= getLowestVolume(),
      trackWindow: {
        currentTrack: formatApiTrack(apiCurrentTrack),
        previousTracks: apiPreviousTracks.map((t) => formatApiTrack(t)),
        nextTracks: apiNextTracks.map((t) => formatApiTrack(t)),
      },
    };
  };

  connect: Player["connect"] = (options) => {
    return new Promise(async (resolve) => {
      this.player.addListener("ready", async ({ device_id }) => {
        this.deviceId = device_id;
        await this.api.transferPlayback(device_id, {
          autoPlay: options?.autoPlay,
        });

        // GET DEVICES
        const devices = await this.api.getDevices();

        console.log(devices);

        resolve();
      });
      await this.player.connect();
    });
  };

  setVolume: Player["setVolume"] = (volume: number) => {
    if (volume <= 0) {
      volume = getLowestVolume();
    } else if (volume > 1) {
      volume = 1;
    }
    return this.player.setVolume(volume);
  };

  increaseVolume: Player["increaseVolume"] = async (amount?: number) => {
    const { volume: currVolume } = await this.getState();
    return this.setVolume(currVolume + (amount || 0.05));
  };

  decreaseVolume: Player["decreaseVolume"] = async (amount?: number) => {
    const { volume: currVolume } = await this.getState();
    return this.setVolume(currVolume - (amount || 0.05));
  };

  mute: Player["mute"] = () => {
    return this.setVolume(0);
  };

  unmute: Player["unmute"] = (volume?: number) => {
    if (!volume) {
      volume = 0.4;
    }
    return this.setVolume(volume);
  };

  play: Player["play"] = () => {
    return this.player.resume();
  };

  pause: Player["pause"] = () => {
    return this.player.pause();
  };

  resume: Player["resume"] = this.play;

  togglePlay: Player["togglePlay"] = () => {
    return this.player.togglePlay();
  };

  previousTrack: Player["previousTrack"] = () => {
    return this.player.previousTrack();
  };

  nextTrack: Player["nextTrack"] = () => {
    return this.player.nextTrack();
  };

  static initialize = (config: PlayerConfig) => {
    return new Promise<SpotifyWebPlayer>((resolve, reject) => {
      if (!window.onSpotifyWebPlaybackSDKReady) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new SpotifyWebPlayer(config);
          resolve(player);
        };
      }

      if (!document.getElementById("spotify-player")) {
        const scriptTag = document.createElement("script");
        scriptTag.id = "spotify-player";
        scriptTag.type = "text/javascript";
        scriptTag.async = false;
        scriptTag.defer = true;
        scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
        scriptTag.onerror = (ev) => reject(ev);

        document.head.appendChild(scriptTag);
      }
    });
  };
}
