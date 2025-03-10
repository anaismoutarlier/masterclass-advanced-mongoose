const express = require("express");
const http = require("http");
require("dotenv").config();
require("./db/connection");
const routes = require("./routes");

const app = express();
const server = http.createServer(app);
app.use(express.json());

app.use("/users", routes.users);
app.use("/posts", routes.posts);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
