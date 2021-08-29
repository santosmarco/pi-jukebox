import { SpotifyApiConfig } from "../types";

export default class SpotifyApi {
  private readonly getAccessToken: () => string;

  constructor(config: SpotifyApiConfig) {
    this.getAccessToken = config.getAccessTokenHandler;
  }

  getDevices = async () => {
    const res = await fetch("https://api.spotify.com/v1/me/player/devices", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
    const data = res.json();

    return data;
  };

  transferPlayback = async (
    deviceIds: string | string[],
    options?: { autoPlay?: boolean }
  ) => {
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      body: JSON.stringify({
        device_ids: typeof deviceIds === "string" ? [deviceIds] : deviceIds,
        play: options?.autoPlay,
      }),
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  };
}
