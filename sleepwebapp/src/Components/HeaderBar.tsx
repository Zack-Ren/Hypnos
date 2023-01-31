import { Header, Title, Group, ActionIcon } from "@mantine/core";
import { Search, ArrowNarrowLeft} from "tabler-icons-react";
import { useNavigate } from 'react-router-dom';


interface headerProps {
    title: String,
}

function HeaderBar ( {title} : headerProps) {
    const navigate = useNavigate();
    
    return (
        <Header height={90} p="xs">
            <Group position="apart">
                <ActionIcon size="xl" onClick={() => navigate('/')}>
                    <ArrowNarrowLeft size={48}/>
                </ActionIcon>
                <Title>
                    {title}
                </Title>
                <Search size={48} strokeWidth={2} color={'#000000'}/>
            </Group>
        </Header>
    );
}

export default HeaderBar;