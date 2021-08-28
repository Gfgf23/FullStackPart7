import React,{useState} from 'react'
import {useParams} from 'react-router-dom'
import {likeBlog} from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {addComment} from '../reducers/blogReducer'
const ShowBlog = ({blogs}) => {
	const [comment,setComment] = useState('')
	const dispatch = useDispatch()
	const id = useParams().id
	const blog = blogs.find(b => b.id === id)
	return(
	<div>
	<h2>{blog.title}</h2>
	<p>{blog.likes} likes <button onClick={() => dispatch(likeBlog(blog.id))}>Like</button></p>
	<p>added by {blog.author}</p>
	<input type='text' value={comment} onChange={({target})=>{setComment(target.value)}}/>
	<button onClick={()=>{dispatch(addComment(blog.id,comment))
	setComment('')
	}}>add Comment</button>
	<h3>comments</h3>
	<ul>
	{blog.comments.map((comment,i) => <li key={i}>{comment}</li>)}
	</ul>
	</div>
	)
}

export default ShowBlog