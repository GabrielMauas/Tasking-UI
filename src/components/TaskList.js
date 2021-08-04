import { Box, IconButton, Stack, Heading, Flex, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
// import { useState } from 'react';

import TaskItem from './TaskItem';
import EditTask from './EditTask';

function TaskList({ collections }) {

    const { id } = useParams();

    const newCollection = collections.filter( col => col.id === parseInt(id) );

    const { title, color, list } = newCollection[0];

    const completed = list.filter( task => task.complete === 'yes');
    const uncompleted = list.filter( task => task.complete  === 'no' );

    const prColor = pr => {
        if(pr === 'High') return 'red'; 
        if(pr === 'Medium') return 'yellow'; 
        if(pr === 'Low') return 'green'; 
        if(pr === 'None') return 'gray'; 
    }

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
        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]} >
            <Flex align="center" justify="space-between" >
                <IconButton as="a" href="/" icon={ <ArrowBackIcon /> } />
                <Heading color={`${color}.500`} size="xl" > {title} </Heading>
                <EditTask type="Create" />
            </Flex>


            <Stack my="10" spacing={2} >
                <Text mb="3" fontWeight="semibold">Tasks - {uncompleted.length}</Text>
                {
                    uncompleted.map( item => {
                        return (
                            <TaskItem key={item.id} item={item} prColor={prColor} />
                        )
                    })
                }
            </Stack>
            <Stack my="10" spacing={2} >
                <Text mb="3" fontWeight="semibold">Completed - {completed.length}</Text>
                {
                    completed.map( item => {
                        return (
                            <TaskItem key={item.id} item={item} prColor={prColor} />
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

export default TaskList;