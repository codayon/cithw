import "dotenv/config";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(process.env.MONGO_URL);
});

app.listen(port, () => {
  console.log(`you can see my secret mongodb url at http://localhost:${port}/`);
});
