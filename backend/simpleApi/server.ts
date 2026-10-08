import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    const html = await readFile("./index.html", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    res.end(html);
    return;
  }

  if (req.url === "/index.js" && req.method === "GET") {
    const js = await readFile("./index.js", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/javascript");

    res.end(js);
    return;
  }

  if (req.url === "/api/users" && req.method === "GET") {
    const json = await readFile("./users.json", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(json);
    return;
  }

  if (req.url === "/style.css" && req.method === "GET") {
    const css = await readFile("./style.css", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");

    res.end(css);
    return;
}

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
