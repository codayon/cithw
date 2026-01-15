import { loadEnvFile } from "node:process";
import express from "express";
import db from "./config/db.js";
import rootRouter from "./routes/index.js";

loadEnvFile();

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", rootRouter);

db().then(() => {
  app.listen(port, () => {
    console.log(`App listening at ${port}`);
  });
});
