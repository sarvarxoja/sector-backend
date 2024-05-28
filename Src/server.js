import express from "express";
import { product_router } from "./Routes/product.routes.js";
import { auth_router } from "./Routes/auth.routes.js";
import path from "path";
import cors from "cors";
import { user_router } from "./Routes/user.routes.js";

async function serverStarter() {
  try {
    const PORT = process.env.PORT || 4540;
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(path.resolve(), "uploads")));
    app.use("/api/", product_router);
    app.use("/auth/", auth_router);
    app.use("/users/", user_router);

    app.listen(PORT, console.log(`server is running ${PORT} on port`));
  } catch (error) {
    console.log(error.message);
  }
}

serverStarter();
