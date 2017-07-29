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
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&key=${process.env.GOOGLE_MAPS_API_KEY}&zoom=13&size=340x400&style=feature:administrative.locality|element:all|hue:0x2c2e33|saturation:7|lightness:19|visibility:on&style=feature:administrative.locality|element:labels.text|visibility:on|saturation:-3&style=feature:administrative.locality|element:labels.text.fill|color:0xf39247&style=feature:landscape|element:all|hue:0xffffff|saturation:-100|lightness:100|visibility:simplified&style=feature:poi|element:all|hue:0xffffff|saturation:-100|lightness:100|visibility:off&style=feature:poi.school|element:geometry.fill|color:0xf39247|saturation:0|visibility:on&style=feature:road|element:geometry|hue:0xff6f00|saturation:100|lightness:31|visibility:simplified&style=feature:road|element:geometry.stroke|color:0xf39247|saturation:0&style=feature:road|element:labels|hue:0x008eff|saturation:-93|lightness:31|visibility:on&style=feature:road.arterial|element:geometry.stroke|visibility:on|color:0xf3dbc8|saturation:0&style=feature:road.arterial|element:labels|hue:0xbbc0c4|saturation:-93|lightness:-2|visibility:simplified&style=feature:road.arterial|element:labels.text|visibility:off&style=feature:road.local|element:geometry|hue:0xe9ebed|saturation:-90|lightness:-8|visibility:simplified&style=feature:transit|element:all|hue:0xe9ebed|saturation:10|lightness:69|visibility:on&style=feature:water|element:all|hue:0xe9ebed|saturation:-78|lightness:67|visibility:simplified`
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
