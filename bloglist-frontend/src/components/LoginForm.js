import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {login} from '../reducers/userReducer'
import {Form,Button} from 'react-bootstrap'

const LoginForm = () => {
	const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
	
	const dispatch = useDispatch()  
	const handleLogin = async (event) => {

    event.preventDefault()

    try{
      dispatch(login(username,password))
      setUsername('')
      setPassword('')
    } catch (exception){
      

    }
  }
    return(
      <Form onSubmit={handleLogin}>
	  <Form.Group>
        <Form.Label> username </Form.Label>
          <Form.Control
            id='username'
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        
	  </Form.Group>
	  <Form.Group>
        <Form.Label> password </Form.Label>
          <Form.Control
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
      </Form.Group>
        <div>
          <Button id='login-button' variant="primary" type="submit">login</Button>
        </div>
      </Form>
    )
  }
  
  export default LoginForm