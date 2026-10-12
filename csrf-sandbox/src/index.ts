import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { csrf } from "hono/csrf";

import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import { sandbox01App } from "./sandbox01/index.js";

const app = new Hono();
app.use(secureHeaders());
app.use("*", requestId());
app.use(logger());

// 普通に使うならこれでいいとおもう
// ソース見た感じだとorigin省略時は同一オリジンのチェックがされてそう(origin === new URL(c.req.url).origin;)
app.use(
  csrf({
    secFetchSite: ["same-origin"],
  }),
);

// わざと失敗させるための設定
app.use(
  // content-typeがapplication/jsonの場合はここのチェックは通らない
  csrf({
    secFetchSite: [
      // わざと失敗させるために'same-origin'を外している
      //"same-origin"
    ],
    origin: ["http://localhost2:3000"], // このリクエストからのみ許可 -> 失敗
  }),
);

// cloudflare workers みたいにする。
app.use("/*", serveStatic({ root: "./public" }));

app.route("/api/sandbox01", sandbox01App);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
