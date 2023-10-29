import express from "express";
import { AppDataSource } from "./data-source";
import { app, httpSocket } from "./config/express";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("database connection created");
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error ${error}`);
  });
