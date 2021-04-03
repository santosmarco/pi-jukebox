import dotenv from "dotenv";
import moment from "moment";
import { NextApiHandler } from "next";
import { TokenResponse } from "../../types";

dotenv.config();

const tokenHandler: NextApiHandler<TokenResponse> = async (req, res) => {
  if (req.method === "GET") {
    const {
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET,
      SPOTIFY_USER_REFRESH_TOKEN,
    } = process.env;

    if (
      !(
        SPOTIFY_CLIENT_ID &&
        SPOTIFY_CLIENT_SECRET &&
        SPOTIFY_USER_REFRESH_TOKEN
      )
    ) {
      res.json({
        error: {
          code: 500,
          message:
            "Spotify server-side credentials (Client ID and Secret) or user's Refresh Token not found.",
          endpoint: "/token",
        },
      });
      return;
    }

    const tokenRes = await fetch(
      `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${SPOTIFY_USER_REFRESH_TOKEN}&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    const tokenData = await tokenRes.json();

    if (
      !(
        Object.keys(tokenData).filter((key) =>
          ["access_token", "expires_in"].includes(key)
        ).length === 2
      )
    ) {
      res.json({
        error: {
          code: 500,
          message: "Spotify has not returned an access token for the user.",
          endpoint: "/token",
        },
      });
      return;
    }

    res.json({
      data: {
        accessToken: tokenData.access_token,
        expiresAt: moment().add(tokenData.expires_in, "seconds").toDate(),
      },
    });
  } else {
    res.json({
      error: {
        code: 405,
        message: `HTTP req method not allowed: "${req.method}".`,
        endpoint: "/token",
      },
    });
    return;
  }
};

export default tokenHandler;
