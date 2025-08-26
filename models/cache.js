const redis = require("redis");

let redisClient;

async function redisConnect() {
  const redisHost = process.env.REDIS_HOST || "127.0.0.1";
  const redisPort = process.env.REDIS_PORT || 6379;
  redisClient = await redis
    .createClient(redisPort, redisHost)
    .on("connect", () => console.log("Redis connected"))
    .on("error", (err) => console.log(`Redis threw an error: ${err}`))
    .connect();
}

async function redisSet(key, value, expiration = 0) {
  if (expiration <= 0) {
    console.log(
      `REFUSED to set (${key}/${value}) pair in redis because an expiration was not provided`
    );
    return;
  }

  try {
    await redisClient.set(key, value, { EX: expiration });
  } catch (err) {
    console.log(`An error occurred while setting (${key}/${value}) in redis:`);
    console.log(err);
  }
}

async function redisGet(key) {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (err) {
    console.log(`An error occurred while getting (${key}) in redis:`);
    console.log(err);
    return false;
  }
}

module.exports = {
  redisConnect,
  redisSet,
  redisGet,
};
