import { Hono } from "hono";
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'

import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";


// --------------------------------------------------
// API routes

const apiApp = new Hono();

apiApp.get("/page1/hello", (c) => {
  return c.json({ message: "Hello, world!" });
});

// --------------------------------------------------

const app = new Hono();
app.use(secureHeaders())
app.use('*', requestId())
app.use(logger());
app.route("/api", apiApp);

// cloudflare workers みたいにする。
app.use("/*", serveStatic({ root: "./public" }));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
