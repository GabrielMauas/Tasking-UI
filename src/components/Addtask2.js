import React from 'react'
import { Input, Box, IconButton, ButtonGroup, useColorModeValue, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';

import { serverTimestamp } from 'firebase/firestore';
import { createTask, capitalize } from '../firebase/api';

function Addtask2({ id, color }) {


    const bgcolor = useColorModeValue('gray.200', 'gray.700');
    const bordercolor = useColorModeValue('gray.300', 'gray.600');
    const taskRef = useRef();
    // const priorityRef = useRef();
    const toast = useToast();
    const [name, setName] = useState('');

    const data = {
      name: capitalize(name),
      // priority: priorityRef.current.value,
      parentId: id,
      createdAt: serverTimestamp(),
      completed: false
    }
    const params = {
      toast
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        createTask(params, data);
        setName('');
        taskRef.current.value = "";
    }

    return (
        <Box as="form" onSubmit={handleSubmit} w="100%" borderWidth="3px" borderColor={bgcolor} borderRadius="15" _hover={{borderColor: bordercolor}}  >
            <ButtonGroup w="100%" py="2" px="3">
                <IconButton type="submit" borderRadius="12" icon={ <AddIcon /> } bgColor={color}size="sm" mt="1" />
                <Input type="text" ref={taskRef} border="none" fontSize="lg" fontWeight="500" _focus={{border: 'none'}} placeholder="Add task" onChange={(e) => setName(e.target.value)} />
            </ButtonGroup>
        </Box>

    )
}

export default Addtask2
