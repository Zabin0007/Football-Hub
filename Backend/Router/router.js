const express = require('express')
const { getLiveMatches, getTodayMatches, getMatchById } = require('../Controllers/matchController')
const router = express.Router()
router.get('/live', getLiveMatches)
router.get('/today', getTodayMatches)
router.get('/match/:id', getMatchById)
module.exports = router