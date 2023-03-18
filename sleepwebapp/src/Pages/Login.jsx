import { Button, Box, Title, Space, Alert} from '@mantine/core';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

async function loginUser(username,password) {
  return axios.post('api/Login', {
    username: username,
    password: password
  })
  .then(response => response.status);
}
  

function Login() {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      username,
      password
    );
    if(token == 200) {
      navigate(`/patientlist`)
    }
    else {
      navigate(`/invalid`)
    }
  }
    return (
      <Box sx={{ maxWidth: 300 }} mx="auto">
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <Title>Username</Title>
              <input type="text" onChange={e => setUserName(e.target.value)} required/>
            </label>
            <label>
            <Title>Password</Title>
              <input type="password" onChange={e => setPassword(e.target.value)} required/>
            </label>
            <Space h="md"/>
            <div>
              <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
      </Box>
    );
}

export default Login;