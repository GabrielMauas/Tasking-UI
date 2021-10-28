import { Heading, Text, Button, Stack, Box } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'

const Dashboard = () => {

    const { currentUser } = useAuth();

    return (
        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]}>
            <Heading size="xl">Profile</Heading>
            <Stack textAlign="center" spacing={3} mt="10" mx="auto" border="1px" p="10"  borderRadius="10" borderColor="gray.600" w={["100%", "100%", "100%"]}>
                <Text fontSize="lg"><strong>Email: </strong>{currentUser.email}</Text>
            </Stack>
            <Box display="flex" justifyContent="center" w="100%">
                <Link to="/update-profile">
                        <Button  _focus={{"border": "none"}} variant="ghost" fontSize="md" colorScheme="blue" mt="5">Update Profile</Button>
                </Link>
            </Box>
          
        </Box>
    )
}

export default Dashboard