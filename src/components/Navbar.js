import React, { useState } from 'react';
import { Stack, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaGripHorizontal, FaUserAlt } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';

function Navbar() {

    const { colorMode, toggleColorMode } = useColorMode();
    const [error, setError] = useState('');
    const { currentUser, logOut } = useAuth();
    const history = useHistory();

    const handleLogOut = async () => {
        setError('');

        try {
            await logOut();
            history.push('/login');
        } catch (error) {
            setError(error.message);
        }
        console.log(error);
    }

    return(
        <>
            <Stack zIndex={2} spacing={0} position="fixed" bottom="0" height={["8vh", '10vh', "100vh"]} p="5" bgColor="gray.900" minW={["100vw",'100vw' ,"5%"]} maxW={["100vw",'100vw' ,"10%"]} boxShadow="dark-lg" display="flex" justifyContent={["space-around", "space-around", "space-evenly"]} alignItems="center" flexDirection={["row", "row", "column"]} >
                <IconButton icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon /> } size="lg" bgColor="transparent" p="4" color="white" _hover={{ bg: "gray.700" }} _active={{ transform: "scale(0.96)" }} _focus={{ border: 'none' }} rounded="10px" onClick={toggleColorMode} />
                <Link to="/">
                    <IconButton  icon={ <FaGripHorizontal /> }  size="lg" bgColor="transparent" p="4" color="white" _hover={{ bg: 'gray.700' }} _active={{ transform: "scale(0.96)" }} _focus={{ border: 'none' }} rounded="10px" />
                </Link>

                { currentUser && (          
                    <Link to="/profile">
                        <IconButton icon={ <FaUserAlt /> }  size="lg" bgColor="transparent" p="4" color="white" _hover={{ bg: 'gray.700' }} _active={{ transform: "scale(0.96)" }} _focus={{ border: 'none' }} rounded="10px"  />
                    </Link>
                )}
                {currentUser && (
                    <IconButton icon={ <HiOutlineLogout /> } size="lg" bgColor="transparent" p="4" color="white" _hover={{ bg: 'gray.700' }} _active={{ transform: "scale(0.96)" }} _focus={{ border: 'none' }} rounded="10px" onClick={handleLogOut} />
                )}

            </Stack>
        </>
    )
}

export default Navbar;
