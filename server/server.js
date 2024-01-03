// server.js (Express)
const express = require("express");
const querystring = require("querystring");
const { generateRandomString } = require("./your-utils-file");

const app = express();

const CLIENT_ID = "e6b84f273b7b44e082fb7fd319d4a217";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const redirectUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

app.get(redirectUrl, (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  let data = res.redirect(redirectUrl);
  console.log(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
