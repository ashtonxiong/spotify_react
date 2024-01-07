import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import spotifyLogo from "../images/Spotify_Icon_RGB_White.png"; // Adjust the path
import "./NavBar.css";

const NavBar = (props) => {
  const [profileUrl, setProfileUrl] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (props.profileUrl) {
      //   console.log(props.profileUrl.spotify);
      setProfileUrl(props.profileUrl.spotify);
    }
    if (props.profilePicture) {
      //   console.log(props.profilePicture);
      setProfilePicture(props.profilePicture[1].url);
    }
  }, [props.profileUrl, props.profilePicturel]);

  return (
    <Navbar expand="lg" className="nav-bar">
      <Container className="items">
        <Navbar.Brand className="image-container">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-image"
          >
            <img src={spotifyLogo} height="80%" alt="" />
          </a>
        </Navbar.Brand>
      </Container>
      <Container className="profile-container">
        {/* <h1> {props.userName}</h1> */}
        {profilePicture ? (
          <img src={profilePicture} alt="" className="profile-picture" />
        ) : (
          <h1></h1>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
