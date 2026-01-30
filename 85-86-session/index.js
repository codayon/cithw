import { loadEnvFile } from "node:process";
import express from "express";
import db from "./config/db.js";
import session from "express-session";
import rootRouter from "./routes/index.js";

loadEnvFile();

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use("/", rootRouter);

db().then(() => {
  app.listen(port, () => {
    console.log(`App listening at ${port}`);
  });
});
