import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const CLIENT_ID = "e6b84f273b7b44e082fb7fd319d4a217";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   let tok = window.localStorage.getItem("token");

  //   if (!token && hash) {
  //     tok = hash
  //       .substring(1)
  //       .split("&")
  //       .find((elem) => elem.startsWith("access_token"))
  //       .split("=")[1];
  //     window.localStorage.setItem("accessToken", tok);
  //     window.location.hash = "";
  //     setToken(tok);
  //   }
  // }, [token]);

  useEffect(() => {
    axios
      .get("/login")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // useEffect(() => {
  //   const clientId = CLIENT_ID; // Replace with your actual client ID
  //   const clientSecret = "bd26eeecbfee40aeb7321cea57af0ec6"; // Replace with your actual client secret

  //   const authString = `${clientId}:${clientSecret}`;
  //   const base64AuthString = btoa(authString);
  //   const authOptions = {
  //     method: "post",
  //     url: "https://accounts.spotify.com/api/token",
  //     headers: {
  //       Authorization: `Basic ${base64AuthString}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: "grant_type=client_credentials",
  //   };

  //   axios(authOptions)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const token = response.data.access_token;
  //         window.localStorage.setItem("accessToken", token);
  //         console.log("Access Token:", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching access token:", error);
  //     });
  // });

  const getProfile = async () => {
    // let token = sessionStorage.getItem("accessToken");
    let token = localStorage.getItem("accessToken");

    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("TEST PROFILE", response);
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    console.log(token);
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    console.log("TEST DATA", data);
  };

  return (
    <div className="App">
      <h1>Spotify React</h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login
      </a>

      {token ? (
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">search</button>
        </form>
      ) : (
        <h2>please login</h2>
      )}

      <button onClick={getProfile}></button>
    </div>
  );
}

export default App;
