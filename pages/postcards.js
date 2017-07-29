/* global API_URL */
import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'

const Postcards = ({postcard}) => (
  <Layout>
    <h1>{postcard.name}</h1>
    <p>{postcard.description}</p>
    <img src={postcard.image.file.url} />
    <a href={postcard.url}>{postcard.url}</a>
  </Layout>
)

Postcards.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${API_URL}postcards/${id}`)
  const postcard = await res.json()
  return { postcard: postcard[0] }
}

export default Postcards
