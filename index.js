const express = require("express");
const app = express();
const port = 3000;

var session = require("express-session");
var Keycloak = require("keycloak-connect");

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(
  keycloak.middleware({
    logout: "/logout",
    admin: "/",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/protected", keycloak.protect(), (req, res) => {
  res.send("Protected!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
