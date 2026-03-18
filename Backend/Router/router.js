const express = require('express')
const { getMatches,createMatch, getMatchById } = require('../Controllers/matchCOntroller')
const router = express.Router()
router.get('/matches',getMatches)
router.get('/matches/:id',getMatchById)
router.post('/matches',createMatch)
module.exports = router