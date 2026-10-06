/**
 *
 * @param {Response} response
 */
async function toDebugInfo(response) {
  let text = `status: ${response.status}\r\n`;

  // -----------------------
  // header
  text += `------------------------------------
headers: \r\n`;
  for (const [key, value] of response.headers.entries()) {
    text += `${key}: ${value}\r\n`;
  }

  // -----------------------
  // body
  text += `------------------------------------
body: \r\n`;
  if (response.headers.get("content-type") === "application/json") {
    const obj = await response.json();
    text += JSON.stringify(obj, null, 2);
  } else {
    text += await response.text();
  }
  text += "\r\n";
  return text;
}

export { toDebugInfo };
