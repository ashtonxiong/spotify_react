import { React, useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const getProfile = async () => {
    let token = localStorage.getItem("accessToken");
    console.log(token);

    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("TEST PROFILE", response);
  };

  return (
    <div>
      TEST
      <button onClick={getProfile}></button>
    </div>
  );
};

export default HomePage;
