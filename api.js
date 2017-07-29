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

const createGoogleMapImageUrl = (lat, lon) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&key=${process.env.GOOGLE_MAPS_API_KEY}&zoom=13&size=340x400&style=feature:landscape|saturation:-100|lightness:60&style=feature:road.local|saturation:-100|lightness:40|visibility:on&style=feature:transit|saturation:-100|visibility:simplified&style=feature:administrative.province|visibility:off&style=feature:water|visibility:on|lightness:30&style=feature:road.highway|element:geometry.fill|color:0xef8c25|lightness:40&style=feature:road.highway|element:geometry.stroke|visibility:off&style=feature:poi.park|element:geometry.fill|color:0xb6c54c|lightness:40|saturation:-40&markers=size:mid%7Ccolor:blue%7C${lat},${lon}`
}

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
  const mapUrl = createGoogleMapImageUrl(latlong.lat, latlong.lon)
  return { id, image, createdAt, place, description, latlong, url, mapUrl }
}

router.get('/search', (req, res) => res.json({ results: [] }))
router.get('/postcards', (req, res) => findPostcards(null, res))
router.get('/postcards/:id', (req, res) => findPostcards(req.params.id, res))

module.exports = router
