import { toDebugInfo } from "../../common/script/response.js";
const queryValidationButtonElem = document.getElementById(
  "queryValidationButton",
);
const postJsonValidationButtonElem = document.getElementById(
  "postJsonValidationButton",
);
const value01Elem = document.getElementById("value01");
const value02Elem = document.getElementById("value02");
const resultElem = document.getElementById("result");

const PREFIX = "/api/valibot/sandbox02";

function applyResult(text) {
  resultElem.value = text;
}

queryValidationButtonElem.addEventListener("click", async () => {
  const param = new URLSearchParams({
    value01: value01Elem.value,
    value02: value02Elem.value,
  });

  // リクエストログ
  // console.log(Object.fromEntries(param.entries()));

  const response = await fetch(
    `${PREFIX}/queryValidation?${param.toString()}`,
    {
      method: "GET",
      credentials: "same-origin",
    },
  );

  const debugInfo = await toDebugInfo(response);
  if (!response.ok) {
    console.error("Failed to fetch data");
    applyResult(`リクエスト失敗しました。\r\n${debugInfo}`);
    return;
  }

  applyResult(`リクエスト成功: \r\n${debugInfo}`);
});

postJsonValidationButtonElem.addEventListener("click", async () => {
  const body = {
    value01: value01Elem.value,
    value02: value02Elem.value,
  };

  const response = await fetch(`${PREFIX}/postJsonValidation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });

  const debugInfo = await toDebugInfo(response);
  if (!response.ok) {
    console.error("Failed to fetch data");
    applyResult(`リクエスト失敗しました。\r\n${debugInfo}`);
    return;
  }

  applyResult(`リクエスト成功: \r\n${debugInfo}`);
});

export {};
