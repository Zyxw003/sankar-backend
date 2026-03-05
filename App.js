import express from "express";
import product from "./Controller/Routes/ProductRoute.js";
import user from "./Controller/Routes/userRoute.js";
import errorMiddleware from "./Middleware/Error.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1/", product);
app.use("/api/v1/", user); // ✅ fixed

// Error Middleware (should always be last)
app.use(errorMiddleware);

export default app;
