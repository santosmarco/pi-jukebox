import { SpotifyApiConfig } from "../types";

export default class SpotifyApi {
  private readonly getAccessToken: () => string;

  constructor(config: SpotifyApiConfig) {
    this.getAccessToken = config.getAccessTokenHandler;
  }

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
