import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Stack, FormLabel, Input, Box, Select
  } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React, { useRef } from 'react';


function AddCollection() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = useRef();
    
    return (
        <>
            <Button rightIcon={ <AddIcon /> } colorScheme="gray" onClick={onOpen} px="10" py="8" borderRadius="10" border="2px gray.200" size="lg" >Add Collection</Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                initialFocusRef={firstField}
                onClose={onClose}
                size="lg"
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                    Create a New Collection
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
                            <FormLabel htmlFor="priority">Priority</FormLabel>
                            <Select id="priority" defaultValue="None">
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
                    <Button colorScheme="blue">Create</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AddCollection;