import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";
import { promises as fs } from "fs";
import path from "path";

const PACK_SRC = "packs/_source";
const PACK_OUT = "packs";
const CLEAN = process.argv.includes("--clean");

const packs = await fs.readdir(PACK_SRC);

for (const pack of packs) {
  const src = path.join(PACK_SRC, pack);
  const out = path.join(PACK_OUT, pack);

  if (CLEAN) {
    await fs.rm(out, { recursive: true, force: true });
    console.log(`Cleaned: ${pack}`);
  } else {
    await compilePack(src, out, { recursive: true, log: true });
    console.log(`Built: ${pack}`);
  }
}
