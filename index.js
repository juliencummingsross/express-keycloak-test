const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");

const session = require("express-session");
const Keycloak = require("keycloak-connect");

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(keycloak.middleware());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get(
  "/protected",
  // enforcer uses resource name.
  keycloak.enforcer("adminresource"),
  (req, res) => {
    res.json("Protected!");
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
