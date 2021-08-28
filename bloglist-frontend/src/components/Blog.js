import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteBlog } from '../reducers/blogReducer'
import {Link} from 'react-router-dom'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
return (
  <div className='blogDiv'>
    <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author} </Link>
	<button onClick={() => dispatch(deleteBlog(blog.id))}>Delete</button>
  </div>
  )
}

export default Blog