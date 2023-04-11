const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

// first adding the folder from which express will get the static files.

// second, we need 'complex' PRE-FLIGHT HTTP requests to get served by CORS too,
// so we add --- app.options('* - all routes', cors(with the options))

// third adding the cors middleware

// fourth is the middleware for parsing the decoded URL. Mostly used for form data,
// with option extended: true, which allows complex objects like nested arrays to get encoded into the query string

// fifth is for adding into req.body JSON payloads from the request. (type: application/json)

// sixth for parsing cookies into req.cookie

const corsOptions = {
  origin: ["http://localhost:3000", "https://nameri-bg.vercel.app"],
  credentials: true,
};

const expressConfig = app => {
  app.use(express.static("static"));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.options("*", cors(corsOptions));
  app.use(cors(corsOptions));
};

module.exports = expressConfig;
