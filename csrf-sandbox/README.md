# csrf-sandbox


honoのcsrf ミドルウェアの検証

簡易的なものであり、トークンを用いた検証は実施せず、リクエストヘッダを見て確認のみをしているようだ。



こんな感じでいいと思う

```js
import { csrf } from "hono/csrf";

app.use(
  csrf({
    secFetchSite: ["same-origin"],
  }),
);
```