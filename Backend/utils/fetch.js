// utils/getOrFetch.js

const { redisClient } = require("../config/redis")

const getOrFetch = async ({ key, dbData, fetchFn, ttl }) => {

  let cached = null;
  try {
    cached = await redisClient.get(key)
  } catch (redisError) {
    console.log("Redis not available for key:", key);
  }
  
  if (cached) {
    console.log("REDIS HIT:", key)
    return JSON.parse(cached)
  }

  if (dbData) {
    console.log("DB HIT:", key)
    try {
      await redisClient.set(key, JSON.stringify(dbData), "EX", ttl)
    } catch (redisError) {
      console.log("Could not cache to Redis:", redisError.message);
    }
    return dbData
  }

  console.log("API CALL:", key)
  const data = await fetchFn()

  try {
    await redisClient.set(key, JSON.stringify(data), "EX", ttl)
  } catch (redisError) {
    console.log("Could not cache to Redis:", redisError.message);
  }

  return data
}

module.exports = getOrFetch