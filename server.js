import express from "express";
import mongoose from "mongoose";
import { foodsRoutes } from "./routes/foodsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

const app = express();
app.use(express.json({ limit: "200mb" }));
app.use("/api/foods", foodsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect("mongodb+srv://admin:123@foodappapi.v74oqco.mongodb.net/", {
    dbName: "foodapp",
  })
  .then(() => {
    console.log("Successfully connect to DB");
    app.listen(4000, () => console.log("Listening at 4000"));
  })
  .catch((err) => console.log(err));
