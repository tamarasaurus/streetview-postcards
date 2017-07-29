export default (props) => (
  <a className='map' href={props.linkUrl}>
    <img src={props.url} width='320' height='400' target='_blank' title={props.title} />
  </a>
)
