import express from "express";
import { ENV } from "./lib/env.js";

const app = express(); 

console.log(ENV.PORT);
console.log(ENV.DB_URL);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(ENV.PORT, () => {
  console.log(`HireConnect Backend listening on port ${ENV.PORT}`);
});