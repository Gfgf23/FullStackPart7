import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import ShowBlog from './components/ShowBlog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { useSelector,useDispatch } from 'react-redux'
import { createBlog,initilaizeBlogs,likeBlog,deleteBlog } from './reducers/blogReducer'
import {initUser,login,logout} from './reducers/userReducer'
import {initUsers} from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams,useHistory
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'



const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const blogFormRef = useRef()

  const Menu = () => {
	  const padding = {
		paddingRight: 5
		}
	  if (user === null){
		  return (<LoginForm/>)
	  }
	  return(
	  <div>
	  <Link to='/blogs' style={padding}>blogs</Link>
	  <Link to='/users' style={padding}>users</Link>
	  </div>
	  )
  }
  const Blogs = () => {
    return (
      <div>
        <h2>blogs</h2>
		<p> {user.name} is logged in <button onClick={handleLogout}>logout</button> </p>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
		<Togglable buttonLabel ='create blog' ref={blogFormRef}>
		<BlogForm handleCreateBlog={handleCreateBlog}/>
		</Togglable>
      </div>
    )
  }

  


  const handleCreateBlog = async (blogObject) => {
    const newBlog = {
      title:blogObject.title,
      author:blogObject.author,
      url:blogObject.url,
      likes:0,
      user:user.Id
    }
    dispatch(createBlog(newBlog))
    blogFormRef.current.toggleVisibility()

  }
  

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
	history.push('/')
  }

  useEffect(() => {
    dispatch(initilaizeBlogs())
	dispatch(initUser())
	dispatch(initUsers())
  }, [])

 
  
  return (
  <div className='container'>
	<Menu/>
	<Switch>
	<Route path='/blogs/:id'><ShowBlog blogs={blogs}/></Route>
	<Route path='/blogs'><Blogs/></Route>
	<Route path='/users/:id'><User users={users}/></Route>
	<Route path='/users'><Users users={users}/></Route>
	</Switch>
	
	</div>


  )

}
export default App