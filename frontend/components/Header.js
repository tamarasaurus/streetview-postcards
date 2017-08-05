import Link from 'next/link'

const headerStyle = {
  fontFamily: 'Permanent Marker',
  fontSize: 60,
  textAlign: 'center',
  margin: 0,
  padding: 0,
  paddingBottom: 60,
  cursor: 'pointer'
}

const Header = () => (
  <div>
    <Link href='/'>
      <h1 style={headerStyle}>Street view postcards</h1>
    </Link>
  </div>
)

export default Header
