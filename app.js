import createError from "http-errors";
import express from "express";
import http from "http";
import parser from "body-parser";
import path from "path";
import { Server } from "socket.io";
import indexRouter from "./routes/index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

//https://gitlab.lnu.se/api/v4/projects/23236/issues?private_token= ---GITLAB_TOKEN---

const app = express();

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server);

const __dirname = path.dirname(__filename);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(parser.json());
//app.use(parser.urlencoded({ extended: false }));
//export const router = express.Router();
app.use("/", indexRouter);
// app.use("/", indexRouter, async (req, res) => {
//   console.log("IN THE APP.JS");
//   console.log(req.locals.issueTitle);

//   io.emit("issue-event", res.locals.issueTitle);
//   res.sendStatus(200);
// });

io.on("connection", (socket) => {
  console.log("Connected to: " + socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected from : " + socket.id);
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

server.listen(port, function () {
  console.log(
    "Listening on port: " + port + " NODE_ENV is set to " + process.env.NODE_ENV
  );
});
export default app;
