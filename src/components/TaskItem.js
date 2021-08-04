import { Text, IconButton, Flex } from '@chakra-ui/react';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'
// import { useState } from 'react';

import OptionsMenu from './OptionsMenu';

function TaskItem({ item, prColor }) {

    // const [complete, setComplete]= useState('no');

    // const onComplete = (check) => {
    //     if(complete === 'no') {
    //         setComplete('yes');
    //         check = complete;
    //         return;
    //     } else {
    //         setComplete('no');
    //         check = complete;
    //         return;
    //     }
    // }


    return(
        <Flex key={item.id} flexDirection="row" justifyContent="space-between" alignItems="center" bgColor={`${prColor(item.priority)}.200`} _hover={{bgColor: `${prColor(item.priority)}.400`}} _active={{bgColor: `${prColor(item.priority)}.400`}} _focus={{border: 'none'}} cursor="default"  borderRadius="20" color="gray.800" >
            <Flex alignItems="center" >
                <IconButton  icon={ item.complete === 'yes' ? <FaCheckSquare /> : <FaRegSquare /> } bgColor="transparent"  _focus={{border: 'none'}} _hover={{bgColor: `${prColor(item.priority)}.300`}} borderRadius="20" _active={{bgColor: `${prColor(item.priority)}.500`}} />
                <Text fontSize="lg"  ml="5" fontWeight="semibold" >{item.task}</Text>
            </Flex>
            <OptionsMenu color={prColor(item.priority)} />
            {/* <IconButton icon={ <FaEllipsisH /> }  bgColor="transparent" _focus={{border: 'none'}} _hover={{bgColor: `${prColor(item.priority)}.300`}} _active={{bgColor: `${prColor(item.priority)}.500`}} borderRadius="20" /> */}
        </Flex>
    )
}

export default TaskItem;