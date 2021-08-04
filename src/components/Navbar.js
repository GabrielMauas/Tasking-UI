import { Stack, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon, SettingsIcon } from '@chakra-ui/icons';
import { FaThLarge } from 'react-icons/fa'

function Navbar() {

    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <>
            <Stack zIndex={2} spacing={0} position="fixed" bottom="0" height={["8vh", '10vh', "100vh"]} p="5" bgColor="gray.900" w={["100vw",'100vw' ,"6vw"]} boxShadow="dark-lg" display="flex" justifyContent={["space-around", "space-around", "space-evenly"]} alignItems="center" flexDirection={["row", "row", "column"]} >
                <IconButton icon={ <SettingsIcon /> } size="lg" bgColor="transparent" p="8" color="white" _hover={{ bg: 'gray.700' }} _focus={{ border: 'none' }} rounded="none" />
                <IconButton as="a" href="/" icon={ <FaThLarge /> }  size="lg" bgColor="transparent" p="8" color="white" _hover={{ bg: 'gray.700' }} _focus={{ border: 'none' }} rounded="none" />
                <IconButton icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon /> } size="lg" bgColor="transparent" p="8" color="white" _hover={{ bg: 'gray.700' }} _focus={{ border: 'none' }} rounded="none" onClick={toggleColorMode} />
            </Stack>
        </>
    )
}

export default Navbar;
