const dotenv = require("dotenv");
const { redisConnect, redisSet, redisGet } = require("./cache.js");

async function main() {
  dotenv.config();
  await redisConnect();
//   await redisSet("um", "excuseMeWhatTheActualFuck", 2);
//   console.log(await redisGet("um"));
}

try {
  main();
} catch (err) {
  console.log(`An error occurred while running the program:\n${err}`);
}
