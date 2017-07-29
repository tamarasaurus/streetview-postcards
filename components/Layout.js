import Header from './Header'
import stylesheet from 'styles/index.scss'
import Head from 'next/head'

const layoutStyle = {
  padding: 20,
  maxWidth: 980,
  margin: '20px auto'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Head>
      <title>Street View Postcards</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='https://fonts.googleapis.com/css?family=Permanent+Marker|Archivo+Narrow' rel='stylesheet' />
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <link rel='shortcut icon' href='/static/favicon.ico' type='image/x-icon' />
      <link rel='icon' href='/static/favicon.ico' type='image/x-icon' />
    </Head>
    <Header />
    {props.children}
  </div>
)

export default Layout
