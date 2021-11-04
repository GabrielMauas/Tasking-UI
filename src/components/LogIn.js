import React, { useRef, useState } from 'react';
import { Heading, Stack, Input, Button, Text, Alert, AlertIcon, Box, InputGroup, IconButton, InputRightElement } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaFacebook, FaGithub, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LogIn = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const { logIn, signInWithGoogle, signInWithMicrosoft, signInWithFacebook, signInWithGithub } = useAuth();
    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);

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
    // const handleMicrosoft = async (e) => {
    //     e.preventDefault();

    //     try {
    //         setError('');
    //         setLoading(true);
    //         await signInWithMicrosoft();
    //         history.push('/');
    //     } catch (error) {
    //         setError(error.message);
    //     }
    //     setLoading(false);
    // }
    // const handleFacebook = async (e) => {
    //     e.preventDefault();

    //     try {
    //         setError('');
    //         setLoading(true);
    //         await signInWithFacebook();
    //         history.push('/');
    //     } catch (error) {
    //         setError(error.message);
    //     }
    //     setLoading(false);
    // }
    // const handleGithub = async (e) => {
    //     e.preventDefault();

    //     try {
    //         setError('');
    //         setLoading(true);
    //         await signInWithGithub();
    //         history.push('/');
    //     } catch (error) {
    //         setError(error.message);
    //     }
    //     setLoading(false);
    // }

    return (
        <Box my="20">
            <Heading textAlign="center" p="5">Log In</Heading>
            <Stack as="form" spacing={3} m="5" mx="auto" w={["85%", "80%", "40%"]} onSubmit={handleSubmit}>
                <Stack spacing={5} direction={["column", "column", "row"]} align="center">
                    <Button disabled={loading} w="100%" colorScheme="blue" variant="outline" p="5" rightIcon={ <FaGoogle /> } onClick={handleGoogle} >Access with Google</Button>
                    {/* <Button disabled={loading} w="100%" colorScheme="orange" variant="outline" rightIcon={ <FaMicrosoft /> } onClick={handleMicrosoft} >Access with Microsoft</Button>                             */}
                </Stack>
                <Text textAlign="center" color="gray.500">Or</Text>
                <Input type="email" required autoComplete={'off'} variant="outline" placeholder="Email" ref={emailRef} />
                <InputGroup>
                    <Input type={show ? "text" : "password"} required variant="outline" placeholder="Password" ref={passRef} />
                    <InputRightElement>
                        <IconButton icon={show ? <ViewOffIcon /> : <ViewIcon />} onClick={() => setShow(!show)} bgColor="transparent" size="sm" _focus={{border: 'none'}} />
                    </InputRightElement>
                </InputGroup>

                <Button justifyContent="flex-end" variant="link"><Link to="/reset-password">Forgot Password?</Link></Button>
                
                <Button disabled={loading} type="submit" colorScheme="blue" >Log In</Button>

                {/* <Stack spacing={5} direction={["column", "column", "row"]} align="center" >
                    <Button w="100%" disabled={loading} colorScheme="facebook" variant="outline" rightIcon={ <FaFacebook /> } onClick={handleFacebook} >Access with Faceboook</Button>
                    <Button w="100%" disabled={loading} colorScheme="black" variant="outline" rightIcon={ <FaGithub /> } onClick={handleGithub} >Access with Github</Button>
                </Stack> */}
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