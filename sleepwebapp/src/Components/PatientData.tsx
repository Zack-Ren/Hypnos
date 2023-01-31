import { Stack, Container, Group, Flex, Title, Text, ActionIcon} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { ArrowNarrowLeft } from'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

interface patientProps {
    name: String,
    dob: string,
    sex: String;
}

function PatientData ( {name, dob, sex} : patientProps) {
    const navigate = useNavigate();

    return (
            <Group spacing="xl">
                <NavBar />
                <Flex direction='column'>
                    <Stack justify="space-between">
                        <ActionIcon size="xl" onClick={() => navigate(-1)}>
                            <ArrowNarrowLeft size={48}/>
                        </ActionIcon>
                        <Stack>
                            <Title> {name} </Title>
                            <Text fz="xl">DOB: {dob}</Text>
                            <Text fz="xl">Sex: {sex}</Text>
                        </Stack>
                        <Stack>
                            <Title>Collected Data</Title>
                            <Text fz="xl" td="underline">Start Time:</Text>
                            <Text fz="xl" td="underline">End Time:</Text>
                        </Stack>
                    </Stack>
                </Flex>
        </Group>
    );
}

export default PatientData;