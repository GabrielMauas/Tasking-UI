import { Text, IconButton, Flex, useColorModeValue, Box, Stack } from '@chakra-ui/react';
import { FaCheckSquare, FaTimes } from 'react-icons/fa'

// import OptionsMenu from './OptionsMenu';

function TaskItem({ color, task, toggleComplete, deleteValue, params }) {

    const bgcolor = useColorModeValue('gray.200', 'gray.700');

    return(
        <Flex bgColor={bgcolor} flexDirection="row" w="100%" justifyContent="space-between" alignItems="center"  cursor="default"  borderRadius="15" py="1" px="3">
        {/* // <Stack direction="row" bgColor={bgcolor}> */}
            <Stack alignItems="center" direction="row" py="2" px="1">
                <IconButton 
                    icon={task.completed ? <FaCheckSquare /> : null} 
                    onClick={() => toggleComplete(task)} 
                    mx="1"
                    bgColor={task.completed ? color : null} 
                    _focus={{border: 'none'}} 
                    borderRadius="10"
                    borderWidth="3px"
                    borderColor={color}
                    size="xs"
                     
                />
                <Box>
                    <Text as={task.completed ? "s" : "p"} ml="1" maxW={["170px", "200px", "400px"]} flexWrap="wrap" py="1" fontSize="lg" isTruncated fontWeight="semi-bold" >{task.name}</Text>
                </Box>
            </Stack>
            <IconButton borderRadius="8" size="sm" icon={ <FaTimes /> } onClick={() => deleteValue(task, params)} bgColor="transparent" />
            {/* <OptionsMenu deleteValue={deleteValue} task={task} /> */}
            {/* <IconButton icon={ <FaEllipsisH /> }  bgColor="transparent" _focus={{border: 'none'}} _hover={{bgColor: `${prColor(item.priority)}.300`}} _active={{bgColor: `${prColor(item.priority)}.500`}} borderRadius="20" /> */}
        </Flex>
    )
}

export default TaskItem;