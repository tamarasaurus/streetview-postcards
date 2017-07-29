/* global API_URL */

import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const PostcardLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/postcards?id=${props.id}`}>
      <a>{props.title}<img src={props.image} title={props.title} /></a>
    </Link>
  </li>
)

const Index = (props) => (
  <Layout>
    <h1>Street view postcards</h1>
    <ul>
      {props.postcards.map((postcard) => (
        <PostcardLink key={postcard.id} id={postcard.id} title={postcard.place} image={postcard.image.file.url} />
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 10px;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async function () {
  console.log(API_URL)
  const res = await fetch(`${API_URL}postcards`)
  const postcards = await res.json()
  return { postcards }
}

export default Index
