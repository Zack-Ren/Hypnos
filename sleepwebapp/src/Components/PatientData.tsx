import { Stack, Container, Group, Flex, Title, Text, ActionIcon} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { ArrowNarrowLeft } from'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';


function PatientData () {

    const {patientId} = useParams();

    const navigate = useNavigate();

    const [patient,setPatient] = useState<any>([]);

    
    useEffect(() => {
        axios.get(`api/Patient/${patientId}`).then((response) => {
            setPatient(response.data);
        });
    }, [patientId]);
    console.log(patientId)
    return (
            <Group spacing="xl">
                <NavBar />
                <Flex direction='column'>
                    <Stack justify="space-between">
                        <ActionIcon size="xl" onClick={() => navigate(-1)}>
                            <ArrowNarrowLeft size={48}/>
                        </ActionIcon>
                        <Stack>
                            <Title> {patient.name} </Title>
                            <Text fz="xl">DOB: </Text>
                            <Text fz="xl">Sex: </Text>
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