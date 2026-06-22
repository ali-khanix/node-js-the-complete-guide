import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin.route.js";
import shopRoutes from "./routes/shop.route.js";

import { get404 } from "./controllers/error.controller.js";

import pool from "./utils/db.js";

const app = express();
const port = 3001;

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); // It allows you to render css files in html files as <link/>

// Here, order matters
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use(get404);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
