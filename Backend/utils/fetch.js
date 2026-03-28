// utils/getOrFetch.js

const redisClient = require("../config/redis")

const getOrFetch = async ({ key, dbData, fetchFn, ttl }) => {

  const cached = await redisClient.get(key)
  if (cached) {
    console.log("REDIS HIT:", key)
    return JSON.parse(cached)
  }

  if (dbData) {
    console.log("DB HIT:", key)
    await redisClient.set(key, JSON.stringify(dbData), "EX", ttl)
    return dbData
  }

  console.log("API CALL:", key)
  const data = await fetchFn()

  await redisClient.set(key, JSON.stringify(data), "EX", ttl)

  return data
}

module.exports = getOrFetch