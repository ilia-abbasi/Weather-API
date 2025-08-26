const redis = require("redis");

let redisClient;

async function redisConnect() {
  const redisHost = process.env.REDIS_HOST || "127.0.0.1";
  const redisPort = process.env.REDIS_PORT || 6379;
  redisClient = await redis
    .createClient(redisPort, redisHost)
    .on("connect", () => console.log("Redis connected."))
    .on("error", (err) => console.log(`Redis threw an error: ${err}`))
    .connect();
}

async function redisSet(key, value, expiration = 0) {
  await redisClient.set(key, value, { EX: expiration });
}

async function redisGet(key) {
  return await redisClient.get(key);
}

module.exports = {
  redisConnect,
  redisSet,
  redisGet,
};
