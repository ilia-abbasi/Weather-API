const redis = require("redis");

let redisClient;

async function redisConnect() {
  const redisHost = process.env.REDIS_HOST || "127.0.0.1";
  const redisPort = process.env.REDIS_PORT || 6379;
  redisClient = await redis
    .createClient(redisPort, redisHost)
    .on("connect", () => console.log("Redis: Connected"))
    .on("error", (err) =>
      console.log(`Redis: An error occurred while trying to connect: ${err}`)
    )
    .connect();
}

async function redisSet(key, value, expiration = 0) {
  if (expiration <= 0) {
    console.log(
      `Redis: REFUSED to set (${key}/${value}) pair because an expiration was not provided`
    );
    return;
  }

  try {
    await redisClient.set(key, value, { EX: expiration });
  } catch (err) {
    console.log(
      `Redis: An error occurred while setting (${key}/${value}) pair:`
    );
    console.log(err);
  }
}

async function redisGet(key) {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (err) {
    console.log(`Redis: An error occurred while getting (${key}):`);
    console.log(err);
    return false;
  }
}

module.exports = {
  redisConnect,
  redisSet,
  redisGet,
};
