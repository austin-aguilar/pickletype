const express = require('express')
const { fetchQuotes } = require('../controllers/quotesController')
const router = express.Router()


router.get ('/', fetchQuotes)

module.exports = router