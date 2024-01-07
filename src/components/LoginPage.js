import { React, useEffect, useState } from "react";
import "./LoginPage.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import spotifyLogo from "../images/Spotify_Icon_RGB_Black.png"; // Adjust the path
import NavBar from "./NavBar";

const LoginPage = (props) => {
  const CLIENT_ID = "e6b84f273b7b44e082fb7fd319d4a217";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let tok = window.localStorage.getItem("token");

    if (!token && hash) {
      tok = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.localStorage.setItem("accessToken", tok);
      window.location.hash = "";
      setToken(tok);
    }

    // callback to send to parent
    props.getToken(token);
  }, [props, token]);

  return (
    <div>
      <NavBar />
      <h1>Spotify TEST</h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true&scope=user-read-private user-read-email user-modify-playback-state user-library-read user-library-modify playlist-read-private playlist-modify-public user-top-read playlist-modify-private`}
      >
        <button className="spotifyButton">Login </button>
      </a>
    </div>
  );
};

export default LoginPage;
