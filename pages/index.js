import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const PostcardLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/postcards?id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

const Index = (props) => (
  <Layout>
    <h1>Street view postcards</h1>
    <ul>
      {props.postcards.map(({show}) => (
        <PostcardLink key={show.id} id={show.id} title={show.name}/>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    postcards: data
  }
}

export default Index
