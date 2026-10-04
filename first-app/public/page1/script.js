const helloButton = document.getElementById("helloButton");
const helloArea = document.getElementById("helloArea");

helloButton.addEventListener("click", async () => {
  const qs = new URLSearchParams({});
  const resp = await fetch(`/api/page1/hello?${qs.toString()}`, {
    method: "GET",
    credentials: "same-origin",
  });

  if (!resp.ok) {
    console.error(resp.status);
    console.error(resp.headers);
    console.error(await resp.text());
    window.alert("Failed to fetch");
    return;
  }

  const body = await resp.json();
  helloArea.value = body.message;
});
