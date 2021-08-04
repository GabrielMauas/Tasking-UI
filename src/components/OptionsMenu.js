import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorModeValue
  } from "@chakra-ui/react";
  import { FaEllipsisH } from 'react-icons/fa';

function OptionsMenu({ color }) {

    const fontColor = useColorModeValue('gray.800', 'gray.200');

    return(
        <Menu>
            <MenuButton as={IconButton} icon={ <FaEllipsisH /> }  bgColor="transparent" _focus={{border: 'none'}} _hover={{bgColor: `${color}.300`}} _active={{bgColor: `${color}.500`}} borderRadius="20" >
            </MenuButton>
            <MenuList color={fontColor}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default OptionsMenu
