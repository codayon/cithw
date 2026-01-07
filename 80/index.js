import { loadEnvFile } from "node:process";
import express from "express";
import dbConfig from "./dbConfig.js";
import router from "./route/index.js";

loadEnvFile("../.env");

const app = express();
const port = 3000;

app.use("/", router);

dbConfig().then(() => {
  app.listen(port, () => {
    console.log(`App listening at ${port}`);
  });
});
