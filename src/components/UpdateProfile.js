import React, { useRef, useState } from 'react';
import { Heading, Stack, Input, Button, Text, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const confPassRef = useRef();
    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { currentUser, updateEm, updatePass } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(confPassRef.current.value !== passRef.current.value){
            return setError('Passwords do not match.');
        }

        const promises = []
        setError('');
        setLoading(true);

        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEm(emailRef.current.value));
        }
        if(passRef.current.value) {
            promises.push(updatePass(passRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push('/');
            })
            .catch(() => {
                setError('Failed to update profile.');
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return (
        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]}>
            <Heading textAlign="center" p="5">Update Profile</Heading>
            <Stack as="form" spacing={3} m="5" mx="auto" w={["95%", "95%", "80%"]} onSubmit={handleSubmit}>
                <Input type="email" variant="outline" placeholder="Email" ref={emailRef} defaultValue={currentUser.email} />
                <Input type="password" variant="outline" placeholder="Password (Leave blank to keep the same)" ref={passRef} />
                <Input type="password" variant="outline" placeholder="Confirm Password (Leave blank to keep the same)" ref={confPassRef} />
                <Button disabled={loading} type="submit" variant="outline" colorScheme="blue">Update</Button>
                <Text textAlign="center"><Button variant="link"><Link to="/">Cancel</Link></Button></Text>
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

export default UpdateProfile