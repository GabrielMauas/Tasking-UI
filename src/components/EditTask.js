import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Stack, FormLabel, Input, Box, Select
  } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React, { useRef } from 'react';

function EditTask({ type }) {

        const { isOpen, onOpen, onClose } = useDisclosure();
        const firstField = useRef();
      
        return (
          <>
            <IconButton icon={ <AddIcon /> } colorScheme="gray" onClick={onOpen} />
            <Drawer
              isOpen={isOpen}
              placement="bottom"
              initialFocusRef={firstField}
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  {type} a Task
                </DrawerHeader>
      
                <DrawerBody>
                  <Stack spacing="24px">
                    <Box>
                      <FormLabel htmlFor="task">Name</FormLabel>
                      <Input
                        ref={firstField}
                        id="task"
                        placeholder="New Task..."
                      />
                    </Box>
      
                    <Box>
                      <FormLabel htmlFor="owner">Priority</FormLabel>
                      <Select id="owner" defaultValue="segun">
                        <option value="None">None</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </Select>
                    </Box>
      
                  </Stack>
                </DrawerBody>
      
                <DrawerFooter borderTopWidth="1px">
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Add</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
    )
}

export default EditTask;