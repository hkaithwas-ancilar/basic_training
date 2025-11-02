import express from "express";
import userRoutes from "../src/routes/userRoutes.ts";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
