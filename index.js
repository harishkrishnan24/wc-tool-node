import fs from "node:fs";
import path from "node:path";

if (process.argv.length < 4) {
  console.error("Usage: node index.mjs <args> <file_name>");
}

const __dirname = import.meta.dirname;
const argument = process.argv[2];
const fileName = process.argv[3];
const filePath = path.join(__dirname, fileName);

let lines = 0;
let bytes = 0;
let words = 0;

const reader = fs.createReadStream(filePath);

reader.on("data", (chunk) => {
  const chunkStr = chunk.toString();
  lines += chunkStr.match(/\n/g)?.length ?? 0;
  bytes += chunk.length;
  words += chunkStr.split(/\s+/).filter(Boolean).length ?? 0;
});

reader.on("error", (error) => {
  console.error(`Error reading file: ${error.message}`);
});

reader.on("end", () => {
  switch (argument) {
    case "-c":
      console.log(bytes);
      return;
    case "-l":
      console.log(lines);
      return;
    case "-w":
      console.log(words);
      return;
    default:
      console.error("Invalid argument");
      return;
  }
});
