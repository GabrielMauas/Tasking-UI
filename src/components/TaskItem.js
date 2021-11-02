import { Text, IconButton, Flex, useColorModeValue, Box } from '@chakra-ui/react';
import { FaCheckSquare, FaRegSquare, FaTimes } from 'react-icons/fa'

// import OptionsMenu from './OptionsMenu';

function TaskItem({ task, toggleComplete, deleteValue }) {

    const bgcolor = useColorModeValue('gray.200', 'gray.700');

    return(
        <Flex bgColor={bgcolor} flexDirection="row" maxW="100%" justifyContent="space-between" alignItems="center"  cursor="default"  borderRadius="5">
            <Flex alignItems="center">
                <IconButton 
                    icon={task.completed ? <FaCheckSquare /> : <FaRegSquare />} 
                    onClick={() => toggleComplete(task)} 
                    bgColor="transparent" 
                    _focus={{border: 'none'}} 
                    borderRadius="30"
                     
                />
                <Flex>
                    <Text maxWidth="200px" flexWrap="wrap" py="1" fontSize="lg" ml="5" fontWeight="semibold"  >{task.name}</Text>
                </Flex>
            </Flex>
            <IconButton icon={ <FaTimes /> } onClick={() => deleteValue(task)} borderRadius="30" bgColor="transparent" />
            {/* <OptionsMenu deleteValue={deleteValue} task={task} /> */}
            {/* <IconButton icon={ <FaEllipsisH /> }  bgColor="transparent" _focus={{border: 'none'}} _hover={{bgColor: `${prColor(item.priority)}.300`}} _active={{bgColor: `${prColor(item.priority)}.500`}} borderRadius="20" /> */}
        </Flex>
    )
}

export default TaskItem;