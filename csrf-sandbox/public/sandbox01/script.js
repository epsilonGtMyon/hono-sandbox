import { toDebugInfo } from "../common/script/response.js";

const get1Button = document.getElementById("get1Button");
const post1Button = document.getElementById("post1Button");
const post2Button = document.getElementById("post2Button");
const post3Button = document.getElementById("post3Button");
const PREFIX = "/api/sandbox01";

get1Button.addEventListener("click", async () => {
  const response = await fetch(`${PREFIX}/get1`, {
    method: "GET",
  });

  const debugInfo = await toDebugInfo(response);
  window.alert(debugInfo);
});

post1Button.addEventListener("click", async () => {
  const param = new URLSearchParams();
  param.append("key1", "value1");

  // URLSearchParamsの時はContent-Typeは自動的に設定されるので明示的に設定する必要はない
  const response = await fetch(`${PREFIX}/post1`, {
    method: "POST",
    body: param,
  });

  const debugInfo = await toDebugInfo(response);
  window.alert(debugInfo);
});

post2Button.addEventListener("click", async () => {
  const form = new FormData();
  form.append("key1", "value1");

  // FormDataの時はContent-Typeは自動的に設定されるので明示的に設定する必要はない
  const response = await fetch(`${PREFIX}/post2`, {
    method: "POST",
    body: form,
  });

  const debugInfo = await toDebugInfo(response);
  window.alert(debugInfo);
});

post3Button.addEventListener("click", async () => {
  const json = {
    key1: "value1",
  };

  const response = await fetch(`${PREFIX}/post3`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  const debugInfo = await toDebugInfo(response);
  window.alert(debugInfo);
});
