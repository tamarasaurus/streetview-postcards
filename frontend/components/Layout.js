/* global GOOGLE_ANALYTICS_CODE */

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
      <script dangerouslySetInnerHTML={{__html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '${GOOGLE_ANALYTICS_CODE}', 'auto');
        ga('send', 'pageview');`}} />
    </Head>
    <Header />
    {props.children}
  </div>
)

export default Layout
