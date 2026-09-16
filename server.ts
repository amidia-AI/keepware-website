import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requestLogger, jsonErrorHandler } from "./server/http";
import featureRequestsRouter from "./server/routes/featureRequests";
import projectRequestsRouter from "./server/routes/projectRequests";
import appSubmissionsRouter from "./server/routes/appSubmissions";
import subscribersRouter from "./server/routes/subscribers";
import downloadsRouter from "./server/routes/downloads";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(requestLogger);

  app.use(express.json());

  app.use("/api", featureRequestsRouter);
  app.use("/api", projectRequestsRouter);
  app.use("/api", appSubmissionsRouter);
  app.use("/api", subscribersRouter);
  app.use("/api", downloadsRouter);

  // Any unmatched /api/* request must return JSON, never the SPA shell.
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: { message: "API endpoint not found" } });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.use(jsonErrorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
