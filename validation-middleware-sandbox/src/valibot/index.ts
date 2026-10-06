import { Hono, type Env } from "hono";
import { sValidator, type Hook } from "@hono/standard-validator";
import * as v from "valibot";

const PREFIX01 = "/sandbox01";
const PREFIX02 = "/sandbox02";
const valibotApp = new Hono();

const schema = v.object({
  value01: v.pipe(v.string(), v.nonEmpty()),
  value02: v.pipe(v.string(), v.digits(), v.maxLength(10)),
});

const queryValidationSchema = schema;
const jsonValidationSchema = schema;

// ---------------------------------------------------------
// sandbox01
valibotApp.get(
  `${PREFIX01}/queryValidation`,
  sValidator("query", queryValidationSchema),
  async (c) => {
    const query = await c.req.valid("query");
    return c.json({
      message: `Hello, world! value01=${query.value01}, value02=${query.value02}`,
    });
  },
);

valibotApp.post(
  `${PREFIX01}/postJsonValidation`,
  sValidator("json", jsonValidationSchema),
  async (c) => {
    const json = await c.req.valid("json");
    return c.json({
      message: `Hello, world! value01=${json.value01}, value02=${json.value02}`,
    });
  },
);

// ---------------------------------------------------------
// sandbox02

const hookResponse: Hook<any, Env, string> = async (hookParam, c) => {
  if (hookParam.success) {
    // 成功時は特に何も変更せず、後続処理に任せる。
    return undefined;
  }

  // ----------
  // エラー情報の加工
  const errors: any[] = [];
  for (const e of hookParam.error) {
    errors.push({
      path: e.path?.map((x: any) => x.key).join("."),
      message: e.message,
    });
  }

  return c.json(
    {
      errors: errors,
      rawErrors: hookParam.error,
    },
    400,
  );
};

valibotApp.get(
  `${PREFIX02}/queryValidation`,
  sValidator("query", queryValidationSchema, hookResponse),
  async (c) => {
    const query = await c.req.valid("query");
    return c.json({
      message: `Hello, world! value01=${query.value01}, value02=${query.value02}`,
    });
  },
);

valibotApp.post(
  `${PREFIX02}/postJsonValidation`,
  sValidator("json", jsonValidationSchema, hookResponse),
  async (c) => {
    const json = await c.req.valid("json");
    return c.json({
      message: `Hello, world! value01=${json.value01}, value02=${json.value02}`,
    });
  },
);

export { valibotApp };
