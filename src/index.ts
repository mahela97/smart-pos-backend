import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import apiRouter from "./routes/api-routers/api-router";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/api", apiRouter);

export default app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

