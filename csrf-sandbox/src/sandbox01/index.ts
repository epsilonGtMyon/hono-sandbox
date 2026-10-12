import { Hono } from "hono";

const sandbox01App = new Hono();

sandbox01App.get("/get1", (c) => {
  return c.text("Hello from get1");
});

sandbox01App.post("/post1", (c) => {
  return c.text("Hello from post1");
});

sandbox01App.post("/post2", (c) => {
  return c.text("Hello from post2");
});

sandbox01App.post("/post3", (c) => {
  return c.text("Hello from post3");
});

export { sandbox01App };
