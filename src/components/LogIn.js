import React, { useRef, useState } from 'react';
import { Heading, Stack, Input, Button, Text, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const LogIn = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const { logIn, signInWithGoogle } = useAuth();
    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passRef.current.value);
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    const handleGoogle = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <Box my="20">
            <Heading textAlign="center" p="5">Log In</Heading>
            <Stack as="form" spacing={3} m="5" mx="auto" w={["85%", "80%", "40%"]} onSubmit={handleSubmit}>
                <Input type="email" required variant="outline" placeholder="Email" ref={emailRef} />
                <Input type="password" required variant="outline" placeholder="Password" ref={passRef} />
                <Button justifyContent="flex-end" variant="link"><Link to="/reset-password">Forgot Password?</Link></Button>
                
                <Button disabled={loading} type="submit" colorScheme="blue" >Log In</Button>
                <Button disabled={loading} colorScheme="blue" variant="outline" rightIcon={ <FaGoogle /> } onClick={handleGoogle} >Access with Google</Button>
                <Text textAlign="right">Don't have an account? <Button variant="link"><Link to="/signup">Sign Up!</Link></Button></Text>
            
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
            </Stack>
        </Box>
    )
}

export default LogIn