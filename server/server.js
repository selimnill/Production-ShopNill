import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import CategoryRoutes from "./routes/CategoryRoute.js";
import ProductRoutes from "./routes/ProductRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url";
//configure env
dotenv.config();

//databse config
connectDB();

// es module fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(express.static(path.join(__dirname, "./client/build"))); // one type of connect frontend using express static path
// Serve static files from the client build directory
// app.use(express.static(path.join(__dirname, "client", "build", "index.html")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", ProductRoutes);

//rest api
// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

//
// Fallback route to serve the index.html file
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.use("/", (req, res) => {
  res.send("Server is Running on port 9000");
});

app.get("/", (req, res) => {
  res.send("Server running.!");
});
//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
