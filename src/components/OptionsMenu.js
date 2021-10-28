import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorModeValue
  } from "@chakra-ui/react";
  import { FaEllipsisH } from 'react-icons/fa';

function OptionsMenu() {

    const fontColor = useColorModeValue('gray.800', 'gray.200');

    return(
        <Menu>
            <MenuButton as={IconButton} icon={ <FaEllipsisH /> } bgColor="transparent" colorScheme="gray" border="2px gray.200" >
            </MenuButton>
            <MenuList color={fontColor}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default OptionsMenu
