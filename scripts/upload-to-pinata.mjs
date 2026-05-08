// Upload /out directory to Pinata as a single pinned folder.
// Usage: node scripts/upload-to-pinata.mjs
// Requires NEXT_PUBLIC_PINATA_JWT in .env.local
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, sep } from "path";

// Load .env.local manually (no dotenv dep)
const envText = readFileSync(".env.local", "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return i === -1 ? [l, ""] : [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);
const JWT = env.NEXT_PUBLIC_PINATA_JWT;
if (!JWT) {
  console.error("Missing NEXT_PUBLIC_PINATA_JWT in .env.local");
  process.exit(1);
}

const ROOT = "out";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(ROOT);
console.log(`Uploading ${files.length} files from ${ROOT}/...`);

const formData = new FormData();
for (const path of files) {
  const buf = readFileSync(path);
  // Pinata expects relative path including the root folder name
  const relPath = "buildsite-eth/" + relative(ROOT, path).split(sep).join("/");
  const blob = new Blob([buf]);
  formData.append("file", blob, relPath);
}

const meta = {
  name: "buildsite.eth",
  keyvalues: { project: "buildsite.eth", builtAt: new Date().toISOString() },
};
formData.append("pinataMetadata", JSON.stringify(meta));
formData.append("pinataOptions", JSON.stringify({ wrapWithDirectory: false, cidVersion: 1 }));

console.log("POST https://api.pinata.cloud/pinning/pinFileToIPFS ...");
const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
  method: "POST",
  headers: { Authorization: `Bearer ${JWT}` },
  body: formData,
});

const text = await res.text();
if (!res.ok) {
  console.error("Pinata error:", res.status, text);
  process.exit(1);
}

const data = JSON.parse(text);
console.log("\n✅ Uploaded to IPFS");
console.log("CID:        ", data.IpfsHash);
console.log("Size:       ", data.PinSize, "bytes");
console.log("Timestamp:  ", data.Timestamp);
console.log("");
console.log("Gateway:    https://gateway.pinata.cloud/ipfs/" + data.IpfsHash);
console.log("eth.limo:   https://buildsite.eth.limo (after setting contenthash)");
console.log("");
console.log("Next: set the contenthash on buildsite.eth in app.ens.domains");
console.log("      Records → Content Hash → ipfs://" + data.IpfsHash);
