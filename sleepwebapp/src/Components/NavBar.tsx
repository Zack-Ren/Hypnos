import { Navbar, Button, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function NavBar() {

  const navigate = useNavigate();

  return (
    <Navbar height={600} p="xs" width={{ base: 300 }}>
      <Navbar.Section >
        <Button fullWidth variant="subtle" radius="xs" size="xl" onClick={() => navigate('/patientlist')}>
          Patients
        </Button>
      </Navbar.Section>
      <Navbar.Section >
      <Button fullWidth variant="subtle" radius="xs" size="xl" onClick={() => navigate('/patientlist')}>
          Starred
        </Button>
      </Navbar.Section>
      <Navbar.Section >
        <Button fullWidth variant="subtle" radius="xs" size="xl" onClick={() => navigate('/patientlist')}>
          Archived
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavBar;