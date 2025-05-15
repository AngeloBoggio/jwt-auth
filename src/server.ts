import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const app: Express = express();

app.use(express.json());

// Middleware
app.use("/api", routes);

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong" });
  }
);

const PORT = parseInt(process.env.PORT || "8000", 10);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
