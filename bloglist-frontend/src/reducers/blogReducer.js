import blogService from '../services/blogs'

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(
      { type:'NEW_BLOG',
        data:newBlog }
    )
  }
}

export const initilaizeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data:blogs
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
	   const blogs = await blogService.getAll()
	   const blogToChange = blogs.find(b => b.id === id)
	   const changedBlog = {
		   ...blogToChange,
		   likes: blogToChange.likes + 1
	   }
	   await blogService.update(id,changedBlog)
	   dispatch({
		   type:'LIKE_BLOG',
		   data:changedBlog
	   })
  }
}

export const addComment = (id,comment) => {
	return async dispatch => {
		console.log('Entered comment')
		const changedBlog = await blogService.addComment(id,comment)
		console.log(changedBlog)
		dispatch({
			type:'ADD_COMMENT',
			data:changedBlog
		})
	}
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type:'DELETE_BLOG',
      data:{ id:id }
    })
  }
}


const reducer = (state = [],action) => {
  switch(action.type){
  case 'NEW_BLOG':{
    return [...state,action.data]
  }
  case 'INIT_BLOGS':{
    return action.data
  }
  case 'LIKE_BLOG':{
	  const id = action.data.id
	  return state.map(b => b.id !== id ? b :action.data)
  }
  case 'ADD_COMMENT':{
	  const id = action.data.id
	  return state.map(b => b.id !== id ? b :action.data)
  }
  case 'DELETE_BLOG':{
	  const id = action.data.id
	  return state.filter(b => b.id !== id)
  }
  }
  return state
}

export default reducer