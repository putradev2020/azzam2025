import { createServer } from "http";
import { createReadStream } from "fs";
import { stat, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "dist");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

const mimeTypes = {
  html: "text/html; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  ico: "image/x-icon",
  webp: "image/webp",
  txt: "text/plain; charset=utf-8",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  map: "application/json; charset=utf-8"
};

const resolveFilePath = async (relativePath) => {
  const candidatePath = path.join(distDir, relativePath);

  if (!candidatePath.startsWith(distDir)) {
    return null;
  }

  try {
    const fileStat = await stat(candidatePath);
    if (fileStat.isDirectory()) {
      return resolveFilePath(path.join(relativePath, "index.html"));
    }
    return candidatePath;
  } catch (error) {
    return null;
  }
};

const server = createServer(async (req, res) => {
  const requestUrl = req.url ? decodeURIComponent(req.url.split("?")[0]) : "/";
  const relativePath = requestUrl === "/" ? "index.html" : requestUrl.replace(/^\/+/, "");

  let filePath = await resolveFilePath(relativePath);

  if (!filePath && !relativePath.includes(".")) {
    filePath = await resolveFilePath("index.html");
  }

  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }

  const extension = path.extname(filePath).slice(1).toLowerCase();
  const contentType = mimeTypes[extension] ?? "application/octet-stream";

  res.setHeader("Content-Type", contentType);

  const stream = createReadStream(filePath);
  stream.on("error", async () => {
    if (filePath.endsWith("index.html")) {
      try {
        const fallbackHtml = await readFile(path.join(distDir, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(fallbackHtml);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Internal Server Error");
      }
      return;
    }

    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  });
  stream.pipe(res);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
