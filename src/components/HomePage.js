import { React, useEffect, useState, Suspense } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import { TailSpin } from "react-loader-spinner";
import "./HomePage.css";

const HomePage = () => {
  const [profileInfo, setProfileInfo] = useState("");
  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);

  const LoadingSpinner = () => (
    <div className="loader-container">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );

  const renderArtists = () => {
    return (
      <Container>
        {topArtists.map((artist, index) => (
          <a
            href={artist.external_urls.spotify}
            className="artist-link"
            target="_blank"
            rel="noreferrer"
          >
            <Container key={index + "artist"} className="artist-box">
              {/* Render artist information here */}

              <img
                src={artist.images[2].url}
                className="artist-image"
                alt="artists"
              />

              <Container
                className="artist-right"
                style={{
                  maxWidth: "100%",
                  minWidth: "75%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Container className="artist-top-row">
                  <p>{artist.name}</p>
                </Container>
              </Container>
              {/* Add more artist details as needed */}
            </Container>
          </a>
        ))}
      </Container>
    );
  };

  const renderSongs = () => {
    return (
      <Container>
        {topSongs.map((song, index) => (
          <Container key={index + "song"} className="artist-box">
            {/* Render artist information here */}
            <img
              src={song.album.images[2].url}
              className="artist-image"
              alt="artists"
            />
            <Container
              className="artist-right"
              style={{
                maxWidth: "100%",
                minWidth: "75%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Container className="songs-top-row">
                <p>
                  {song.name.length > 20
                    ? `${song.name.substring(0, 20)}...`
                    : song.name}
                </p>
              </Container>
              {/* <Container className="artist-bottom-row">
                <p>View More</p>
              </Container> */}
            </Container>
            {/* Add more artist details as needed */}
          </Container>
        ))}
      </Container>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
    console.log("use effect token", token);
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("user info", response.data);

        setProfileInfo(response.data);
        const artists = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 5,
              time_range: "medium_term",
            },
          }
        );

        console.log("Top Artists:", artists.data.items);
        setTopArtists(artists.data.items);

        const songs = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 5,
              time_range: "medium_term",
            },
          }
        );
        console.log("songs:", songs.data.items);
        setTopSongs(songs.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the async function
  }, []);

  return (
    <Suspense
      className="d-flex flex-column"
      style={{ height: "1000px", border: "2px solid orange", display: "flex" }}
      fallback={LoadingSpinner}
    >
      <NavBar
        userName={profileInfo.display_name}
        profileUrl={profileInfo.external_urls}
        profilePicture={profileInfo.images}
      />
      <Container className="body">
        <Container className="left">
          <Container className="left-top-box box-style">
            <Container className="info-container">
              <p> ICON </p>
              <p>My info</p>
            </Container>

            <Container className="search-container">
              <p> ICON </p>
              <p>Search</p>
            </Container>
          </Container>
        </Container>
        <Container className="right">
          <Container className="artist-container">
            <p className="box-style" style={{ margin: "2%" }}>
              Top Artists
            </p>
            {renderArtists()}
          </Container>

          <Container className="song-container">
            <p className="box-style" style={{ margin: "2%" }}>
              Top Songs
            </p>
            {renderSongs()}
          </Container>
        </Container>
      </Container>
    </Suspense>
  );
};

export default HomePage;
