import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorModeValue
  } from "@chakra-ui/react";
import { FaEllipsisV } from 'react-icons/fa';


function OptionsMenuCollection({ deleteValue }) {

    const fontColor = useColorModeValue('gray.800', 'gray.200');



    return(
        <Menu>
            <MenuButton as={IconButton} icon={ <FaEllipsisV /> } bgColor="" colorScheme="gray" border="2px gray.200" >
            </MenuButton>
            <MenuList color={fontColor}>
                <MenuItem>Edit</MenuItem>
                <MenuItem onClick={() => deleteValue()}>Delete</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default OptionsMenuCollection
