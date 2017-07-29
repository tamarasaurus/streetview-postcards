const { createClient } = require('contentful')
const fetch = require('isomorphic-unfetch')
const express = require('express')
const router = express.Router()
const env = require('node-env-file')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
if (dev) env(path.join(__dirname, '/.env'))

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN
})

router.get('/search', (req, res) => {
  res.json({
    results: []
  })
})

router.get('/postcards', (req, res) => {
  res.json({
    postcards: []
  })
})

router.get('/postcards/:id', (req, res) => {
  res.json({ })
})

module.exports = router
