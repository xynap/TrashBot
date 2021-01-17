import https from "https";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const REST_URL = "https://discord.com/api/v8";

export function fetch(path: string, method?: "PATCH" | "POST", body?: object) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      `${REST_URL}/${path}`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_TOKEN}`,
          "Content-Type": "application/json"
        },
        method: method ?? "GET"
      },
      response => {
        if (response.statusCode != 200) {
          reject(`Request failed with ${response.statusCode} status code.`);
          return;
        }

        let data = "";
        response.on("data", chunk => (data += chunk));
        response.on("end", () => resolve(JSON.parse(data)));
      }
    );

    request.on("error", error => reject(error));
    body && request.write(JSON.stringify(body));
    request.end();
  });
}

export function timerFactory() {
  const timers = new Map();

  const schedule = (name: string, fn: (...args: any[]) => void, ms: number) => {
    timers.has(name) && clearTimeout(timers.get(name));
    timers.set(name, setTimeout(fn, ms));
  };

  const clear = (name: string) => {
    clearTimeout(timers.get(name));
    timers.delete(name);
  };

  const clearAll = () => {
    timers.forEach(timer => clearTimeout(timer));
    timers.clear();
  };

  return { schedule, clear, clearAll };
}
