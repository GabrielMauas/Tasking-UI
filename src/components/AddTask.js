import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Stack, FormLabel, Input, Box, Select, useToast
  } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React, { useRef } from 'react';

import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function EditTask({ id, color }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const taskRef = useRef();
    // const priorityRef = useRef();
    const toast = useToast();

    const createTask = async () => {
        const data = {
            name: taskRef.current.value,
            // priority: priorityRef.current.value,
            parentId: id,
            createdAt: serverTimestamp(),
            completed: false
        }
        await addDoc(collection(db, 'tasks'), data);
        toast({
            title: 'Task Created',
            status: 'success',
            duration: 2000,
            isClosable: true
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        createTask();
    }
        return (
          <>
            <IconButton icon={ <AddIcon /> } bgColor={color} onClick={onOpen} />
            <Modal
              isOpen={isOpen}
              placement="bottom"
              initialFocusRef={taskRef}
              onClose={onClose}
              size='sm'
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                  Create a Task
                </ModalHeader>
      
                <ModalBody py="5">
                  <Stack as="form" id="task-form" onSubmit={handleSubmit} spacing="24px">
                    <Box>
                      <FormLabel htmlFor="task">Name</FormLabel>
                      <Input
                        ref={taskRef}
                        id="task"
                        autoComplete={'off'}
                        placeholder="New Task..."
                      />
                    </Box>
      
                    {/* <Box>
                      <FormLabel htmlFor="priority">Priority</FormLabel>
                      <Select id="priority" defaultValue="None" ref={priorityRef}>
                        <option value="None">None</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </Select>
                    </Box> */}
      
                  </Stack>
                </ModalBody>
      
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" type="submit" form="task-form" onClick={onClose}>Add</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
    )
}

export default EditTask;