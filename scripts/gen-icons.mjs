import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "public", "icons");
fs.mkdirSync(outDir, { recursive: true });

const icon = (size, rx) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="#0F4C5C"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia,serif" font-size="${Math.round(size * 0.43)}" font-weight="bold" fill="white">E</text>
</svg>`;

fs.writeFileSync(path.join(outDir, "icon-192.svg"), icon(192, 32));
fs.writeFileSync(path.join(outDir, "icon-512.svg"), icon(512, 80));

// Also write a simple favicon SVG
fs.writeFileSync(
  path.join(process.cwd(), "public", "favicon.svg"),
  icon(32, 6),
);

console.log("Icons written to public/icons/");
