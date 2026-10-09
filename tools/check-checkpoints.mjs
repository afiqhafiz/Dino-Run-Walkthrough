import { access, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = new URL("../checkpoints/", import.meta.url);
const folders = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (folders.length !== 6) {
  throw new Error(`Expected 6 checkpoint folders, found ${folders.length}.`);
}

for (const folder of folders) {
  const directory = new URL(`${folder}/`, root);
  await Promise.all(
    ["index.html", "styles.css", "app.js"].map((file) => access(new URL(file, directory))),
  );

  const appPath = fileURLToPath(new URL("app.js", directory));
  const result = spawnSync(process.execPath, ["--check", appPath], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${folder}/app.js failed syntax validation:\n${result.stderr}`);
  }
}

console.log(`Validated ${folders.length} checkpoints.`);
