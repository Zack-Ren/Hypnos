import { Button, Box, Title, Space, Alert, Stack} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Invalid() {


  const navigate = useNavigate();
    return (
        <Stack justify="space-between">
            <Box sx={{ maxWidth: 300 }} mx="auto">
        <Alert title="Invalid Information" color="red">
            The username or password is incorrect.
        </Alert>
        <Space h="md" />
        <Button type="submit" onClick={() => navigate(`/`)}>Retry</Button>
        </Box>
      </Stack>
    );
}

export default Invalid;