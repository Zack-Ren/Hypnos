import { Button, Title, Container, Paper, TextInput, PasswordInput } from '@mantine/core';
import { useState } from 'react';
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
      <Container size={420} my={40}>
          <Title align="center">Please Log In</Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Username" placeholder="email@example.com" onChange={e => setUserName(e.target.value)} required/>
            <PasswordInput label="Password" placeholder="Your password" onChange={e => setPassword(e.target.value)} required/>
            <Button fullWidth mt="xl" onClick={handleSubmit}>
              Sign in
            </Button>
          </Paper>
      </Container>
    );
}

export default Login;