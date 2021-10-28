import React, { useRef, useState } from 'react';
import { Heading, Stack, Input, Button, Text, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPass } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPass(emailRef.current.value);
            setMessage('Check your inbox for instructions');
        } catch (error) {
            setError('Failed to reset password.');
        }
        setLoading(false);
    }

    return (
        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]}>
            <Heading textAlign="center" p="5">Reset Password</Heading>
            <Stack as="form" spacing={3} m="5" mx="auto" w={["95%", "90%", "80%"]} onSubmit={handleSubmit}>
                <Input type="email" variant="outline" placeholder="Email" ref={emailRef} />
                
                <Button disabled={loading} type="submit" colorScheme="purple" >Submit</Button>
                <Text textAlign="center"><Button variant="link"><Link to="/login">Back to Log in</Link></Button></Text>
            
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                {message && (
                    <Alert status="success">
                        <AlertIcon />
                        {message}
                    </Alert>
                )}

            </Stack>
        </Box>
    )
}

export default ForgotPassword