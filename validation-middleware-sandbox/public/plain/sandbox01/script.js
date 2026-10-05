const queryValidationButtonElem = document.getElementById(
  "queryValidationButton",
);
const postJsonValidationButtonElem = document.getElementById(
  "postJsonValidationButton",
);
const value01Elem = document.getElementById("value01");
const value02Elem = document.getElementById("value02");

const PREFIX = "/api/plain/sandbox01";

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

  if (!response.ok) {
    console.error("Failed to fetch data");
    window.alert(`リクエスト失敗しました。
status: ${response.status}
responseText: ${await response.text()}
      `);
    return;
  }

  const data = await response.text();
  window.alert(`リクエスト成功: ${data}`);
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

  if (!response.ok) {
    console.error("Failed to fetch data");
    window.alert(`リクエスト失敗しました。
status: ${response.status}
responseText: ${await response.text()}
      `);
    return;
  }

  const data = await response.text();
  window.alert(`リクエスト成功: ${data}`);
});

export {};
