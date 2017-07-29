/* global API_URL */

import Layout from '../components/Layout.js'
import Map from '../components/Map'
import fetch from 'isomorphic-unfetch'

const colStyle = {
  width: '100%',
  marginTop: 60
}

const nameStyle = {
  fontFamily: 'Archivo Narrow'
}

const descriptionStyle = {
  fontFamily: 'Archivo Narrow'
}

const Postcards = ({postcard}) => (
  <Layout>
    <div style={colStyle}>
      <img src={postcard.image.file.url} />
      <Map url={postcard.mapUrl} linkUrl={postcard.url} />
    </div>
    <div style={colStyle}>
      <h2 style={nameStyle}>{postcard.name}</h2>
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
