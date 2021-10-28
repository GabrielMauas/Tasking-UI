import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    Stack, FormLabel, Input, Box, useToast
  } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React, { useRef } from 'react';

import { foldersRef } from '../firebase/firebaseConfig';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';


function AddCollection() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const nameRef = useRef();
    const { currentUser } = useAuth();
    const toast = useToast();

    const createFolder = async () => {
        const data = {
            name: nameRef.current.value,
            ownerId: currentUser.uid,
            createdAt: serverTimestamp(),
        }
        await addDoc(foldersRef, data);
        toast({
            title: 'Collection Created',
            status: 'success',
            duration: 2000,
            isClosable: true
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        createFolder();
    }
    
    return (
        <>
            <IconButton 
                icon={ <AddIcon /> } 
                colorScheme="gray" 
                onClick={onOpen}  
                borderRadius="10" 
                border="2px gray.200" 
                size="lg" 
            >
            </IconButton>
            <Modal
                initialFocusRef={nameRef}
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="sm"
            >
                <ModalOverlay />
                <ModalContent onSubmit={handleSubmit}>
                    <ModalCloseButton />
                    <ModalHeader>
                        Create a New Collection
                    </ModalHeader>
            
                    <ModalBody py="5">
                        <Stack spacing="24px">
                            <Box as="form" id="my-form">
                                <FormLabel htmlFor="task">Name</FormLabel>
                                <Input
                                    id="task"
                                    required
                                    ref={nameRef}
                                    autoComplete={'off'}
                                    placeholder="New Collection..."
                                />
                            </Box>
                        </Stack>
                    </ModalBody>
            
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" form="my-form" colorScheme="blue" onClick={onClose}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddCollection;