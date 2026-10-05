import { Hono } from "hono";
import { validator } from "hono/validator";

const PREFIX01 = "/sandbox01";
const plainApp = new Hono();

// ---------------------------------------------------------

plainApp.get(
  `${PREFIX01}/queryValidation`,
  validator("query", (value, c) => {
    const errors: string[] = [];

    // ------
    // value01
    if (value.value01 == null || value.value01 === "") {
      errors.push("value01 は必須です。");
    } else if (value.value01.length > 10) {
      errors.push("value01 は10文字以下にしてください。");
    }

    // ------
    // value02
    if (value.value02 == null || value.value02 === "") {
      errors.push("value02 は必須です。");
    } else if (Array.isArray(value.value02)) {
      errors.push("value02 は配列にできません。");
    } else if (/^[0-9]+$/.test(value.value02) === false) {
      errors.push("value02 は数字で入力してください。");
    }

    // エラーあれば
    if (errors.length > 0) {
      return c.json({ errors }, 400);
    }

    return value;
  }),

  async (c) => {
    // バリデーション済のものが c.req.validから取り出せる。
    // query は一つ前の関数の戻り値の内容が入ってる
    // この辺の挙動はソースみたらわかる。
    const query = await c.req.valid("query");
    return c.json({
      message: `Hello, world! value01=${query.value01}, value02=${query.value02}`,
    });
  },
);

plainApp.post(
  `${PREFIX01}/postJsonValidation`,
  validator("json", (value, c) => {
    const errors: string[] = [];

    // ------
    // value01
    if (value.value01 == null || value.value01 === "") {
      errors.push("value01 は必須です。");
    } else if (value.value01.length > 10) {
      errors.push("value01 は10文字以下にしてください。");
    }

    // ------
    // value02
    if (value.value02 == null || value.value02 === "") {
      errors.push("value02 は必須です。");
    } else if (Array.isArray(value.value02)) {
      errors.push("value02 は配列にできません。");
    } else if (/^[0-9]+$/.test(value.value02) === false) {
      errors.push("value02 は数字で入力してください。");
    }

    // エラーあれば
    if (errors.length > 0) {
      return c.json({ errors }, 400);
    }

    return value;
  }),

  async (c) => {
    const json = await c.req.valid("json");
    return c.json({
      message: `Hello, world! value01=${json.value01}, value02=${json.value02}`,
    });
  },
);

export { plainApp };
