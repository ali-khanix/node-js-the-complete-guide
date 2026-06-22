import { dirname } from "path";
import { fileURLToPath } from "url";

export function getDirname(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}
