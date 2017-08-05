export default (props) => (
  <a className='map' href={props.linkUrl} target='_blank'>
    <img src={props.url} width='320' height='400' title={props.title} />
  </a>
)
