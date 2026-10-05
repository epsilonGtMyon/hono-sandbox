import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";

const PREFIX01 = "/sandbox01";
const valibotApp = new Hono();

const schema = v.object({
  value01: v.pipe(v.string(), v.nonEmpty()),
  value02: v.pipe(v.string(), v.digits(), v.maxLength(10)),
});

const queryValidationSchema = schema
const jsonValidationSchema = schema

// ---------------------------------------------------------
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

export { valibotApp };
