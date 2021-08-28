import loginService from '../services/login'
import blogService from '../services/blogs'

export const initUser = () => {
	return async dispatch => {
	const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
	  dispatch({
		  type:'INIT_USER',
		  data:user
	  })
    }
	dispatch({
		type:'NOTHING'
	})
	}
}

export const login = (username,password) => {
	return async dispatch => {
		try{
			const user = await loginService.login({
			username, password,
		})
			window.localStorage.setItem(
			'loggedBlogAppUser', JSON.stringify(user)
		)
			blogService.setToken(user.token)
			dispatch({
			type:'LOGIN',
			data:user
		})
		} catch(e){}
		
	}
}

export const logout = () => {
	return async dispatch =>{
		window.localStorage.removeItem('loggedBlogAppUser')
		blogService.setToken(null)
		dispatch({
			type:'LOGOUT',
			data:null
		})
	}
}

const reducer = (state = null,action) => {
	switch(action.type){
		case 'INIT_USER':{
			return action.data
		}
		case 'LOGIN':{
			return action.data
		}
		case 'LOGOUT':{
			return null
		}
	}
	return state
} 
export default reducer



















