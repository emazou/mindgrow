import { Link as LinkRouter, useParams } from 'react-router-dom'
import '../../styles/Blog.css'

function BlogCards({ item }) {

  return (
    <div className='blogcard' key={item._id}>
      <img src={item.photo} alt="photo" />
      <div className='bloginfo'>
        <h4>{item.title}</h4>
        <LinkRouter to={`/blog/${item._id}`} ><button>Read more</button></LinkRouter>
      </div>
    </div>
  )
}

export default BlogCards