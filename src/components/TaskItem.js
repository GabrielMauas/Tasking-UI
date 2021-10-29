import { Text, IconButton, Flex, Button } from '@chakra-ui/react';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'

import OptionsMenu from './OptionsMenu';

function TaskItem({ task, toggleComplete, deleteValue }) {

    return(
        <Button as="flex" flexDirection="row" justifyContent="space-between" alignItems="center"  cursor="default"  borderRadius="10"  >
            <Flex alignItems="center" >
                <IconButton 
                    icon={task.completed ? <FaCheckSquare /> : <FaRegSquare />} 
                    onClick={() => toggleComplete(task)} 
                    bgColor="transparent" 
                    _focus={{border: 'none'}} 
                     
                />
                <Text fontSize="lg"  ml="5" fontWeight="semibold" >{task.name}</Text>
            </Flex>
            <OptionsMenu deleteValue={deleteValue} task={task} />
            {/* <IconButton icon={ <FaEllipsisH /> }  bgColor="transparent" _focus={{border: 'none'}} _hover={{bgColor: `${prColor(item.priority)}.300`}} _active={{bgColor: `${prColor(item.priority)}.500`}} borderRadius="20" /> */}
        </Button>
    )
}

export default TaskItem;