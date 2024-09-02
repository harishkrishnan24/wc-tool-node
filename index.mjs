import fs from "node:fs";
import path from "node:path";

console.log(process.argv);

if (process.argv.length < 4) {
  console.error("Usage: node index.mjs <args> <file_name>");
}

const __dirname = import.meta.dirname;
const argument = process.argv[2];
const fileName = process.argv[3];
const filePath = path.join(__dirname, fileName);

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }
  switch (argument) {
    case "-c":
      console.log(data.length);
      return;
    default:
      console.error("Invalid argument");
      return;
  }
});
