import { connect } from "mongoose";
import app from "./App.js";
import dotenv from "dotenv";
import { Connectdb } from "./config/db.js";
dotenv.config({ path: "Backend/config/config.env" });
const PORT = process.env.PORT || 3000;

Connectdb();
process.on("unhandle rejection ", (err) => {
  console.log(`error :${err.message}`);
  console.log(`server is shutting down, due to unhandle rejection `);

  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

process.on("uncaught exception", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
