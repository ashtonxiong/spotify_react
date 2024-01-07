import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

function App() {
  const CLIENT_ID = "e6b84f273b7b44e082fb7fd319d4a217";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

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
  }, [token]);

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

  const handleChildData = (data) => {
    setToken(data);
  };

  return (
    <div className="App">
      {token ? <HomePage /> : <LoginPage getToken={handleChildData} />}
    </div>
  );
}

export default App;
