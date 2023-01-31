import { TextInput, Button, Group, Box, Stack} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid username'),
      password: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid password'),
    },
  });

  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Username"
          placeholder=""
          {...form.getInputProps('username')}
        />

        <TextInput
          withAsterisk
          label="Password"
          placeholder=""
          {...form.getInputProps('password')}
        />

        <Group position="center" mt="md">
          <Button type="submit" onClick={() => navigate('/patientlist')}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Login;