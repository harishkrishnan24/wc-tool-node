import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

console.log(process.argv);

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

// fs.readFile(filePath, (err, data) => {
//   if (err) {
//     console.error(`Error reading file: ${err.message}`);
//     return;
//   }
//   switch (argument) {
//     case "-c":
//       console.log(data.length);
//       return;
//     default:
//       console.error("Invalid argument");
//       return;
//   }
// });

// const rl = readline.createInterface({
//   input: fs.createReadStream(filePath),
//   output: process.stdout,
//   terminal: false,
// });

// rl.on("line", (line) => {
//   lines++;
//   bytes += Buffer.byteLength(line);
//   words += line.split(/\s+/).length;
// });

// rl.on("close", () => {
//   switch (argument) {
//     case "-c":
//       console.log(bytes);
//       return;
//     default:
//       console.error("Invalid argument");
//       return;
//   }
// });

const reader = fs.createReadStream(filePath);

reader.on("data", (chunk) => {
  lines += chunk.toString().match(/\n/g)?.length || 0;
  bytes += chunk.length;
  words += chunk.toString().split(/\s+/).length;
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
