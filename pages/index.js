/* global API_URL */
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const listItemStyle = {
  fontFamily: 'Archivo Narrow',
  listStyle: 'none',
  textAlign: 'center',
  marginTop: 20
}

const wrapperStyle = {
  cursor: 'pointer',
  marginRight: 20
}

const titleStyle = {
  paddingTop: 10,
  display: 'inline-block'
}

const PostcardLink = (props) => (
  <li className='col-xs-12 col-sm-4' style={listItemStyle}>
    <Link as={`/p/${props.id}`} href={`/postcards?id=${props.id}`}>
      <div style={wrapperStyle}>
        <img width='300' height='200' src={props.image} title={props.title} />
        <span style={titleStyle}>{props.title}</span>
      </div>
    </Link>
  </li>
)

const Index = (props) => (
  <div>
    <Layout>
      <ul className='row'>
        {props.postcards.map((postcard) => (
          <PostcardLink key={postcard.id} id={postcard.id} title={postcard.place} image={postcard.image.file.url} />
      ))}
      </ul>
      <style jsx>{``}</style>
    </Layout>
  </div>
)

Index.getInitialProps = async function () {
  const res = await fetch(`${API_URL}postcards`)
  const postcards = await res.json()
  return { postcards }
}

export default Index
