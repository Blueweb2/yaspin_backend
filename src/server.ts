import mongoose from "mongoose";

import app from "./app";

import { env } from "./config/env";

const PORT = env.port;

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected Successfully"
    );

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(
      "MongoDB Connection Failed"
    );

    console.log(err);
  });