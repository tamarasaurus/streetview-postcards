const env = require('node-env-file')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
if (dev) env(path.join(__dirname, '/.env'))

module.exports = {
  API_URL: process.env.API_URL,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
}
