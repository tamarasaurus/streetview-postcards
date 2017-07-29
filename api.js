const { createClient } = require('contentful')
const express = require('express')
const router = express.Router()
const env = require('node-env-file')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
if (dev) env(path.join(__dirname, '/.env'))

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
  resolveLinks: true
})

const findPostcards = (id, res) => {
  const query = {
    include: 3,
    'sys.id': id
  }

  client
    .getEntries(query)
    .then((entries) => res.json(entries.items.map(formatPostcard)))
    .catch(() => {
      res.status(400)
      res.json({ error: 'Bad request' })
    })
}

const formatPostcard = ({ sys, fields }) => {
  const { id, createdAt } = sys
  const image = fields.image.fields
  const { place, description, latlong, url } = fields
  return { id, image, createdAt, place, description, latlong, url }
}

router.get('/search', (req, res) => res.json({ results: [] }))
router.get('/postcards', (req, res) => findPostcards(null, res))
router.get('/postcards/:id', (req, res) => findPostcards(req.params.id, res))

module.exports = router
