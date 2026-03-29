const express = require('express')
const { getLiveMatches, getTodayMatches, getMatchById, getMatchEvents, getMatchStats, getMatchLineups } = require('../Controllers/matchController')
const { register, login, googleAuth } = require('../Controllers/authcontroller')
const middleware = require('../utils/middleware')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/login/google', googleAuth)
router.get('/protected',middleware,(req,res)=>{
    res.json({message:"You Are Authorized",user:req.user})
})
router.get('/live', getLiveMatches)
router.get('/today', getTodayMatches)
router.get('/match/:id', getMatchById)
router.get('/match/:id/events', getMatchEvents)
router.get('/match/:id/stats', getMatchStats)
router.get('/match/:id/lineups', getMatchLineups)
module.exports = router