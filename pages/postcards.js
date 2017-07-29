/* global API_URL */

import Layout from '../components/Layout.js'
import Map from '../components/Map'
import fetch from 'isomorphic-unfetch'

const colStyle = {
  width: '100%'
}

const nameStyle = {
  fontFamily: 'Archivo Narrow',
  fontSize: 24
}

const descriptionStyle = {
  fontFamily: 'Archivo Narrow',
  fontSize: 18
}

const Postcards = ({postcard}) => (
  <Layout>
    <div style={colStyle}>
      <img src={postcard.image.file.url} />
      <Map url={postcard.mapUrl} linkUrl={postcard.url} />
    </div>
    <div style={colStyle}>
      <h2 style={nameStyle}>{postcard.place}</h2>
      <p style={descriptionStyle}>{postcard.description}</p>
    </div>
  </Layout>
)

Postcards.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${API_URL}postcards/${id}`)
  const postcard = await res.json()
  return { postcard: postcard[0] }
}

export default Postcards
