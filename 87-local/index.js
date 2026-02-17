import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import express from "express";
import db from "./config/db.js";
import path from "node:path"; // Import this
import session from "express-session";
import rootRouter from "./routes/index.js";

loadEnvFile();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
