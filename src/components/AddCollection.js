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
    Stack, FormLabel, Input, Box, useToast, useRadioGroup, Grid
  } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React, { useRef, useState } from 'react';

import { foldersRef } from '../firebase/firebaseConfig';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import RadioCard from './CustomRadioButton';


function AddCollection() {

	const options = [
		"#FC76A1",
		"#DBBE56",
		"#E39264",
		"#D25A61",
		"#AE68E6",
		"#70C4BF",
		"#9E7F72"
	];
    const [collectionColor, setCollectionColor] = useState("#FC76A1");
    const { getRootProps, getRadioProps } = useRadioGroup({
		name: "collection-color",
		defaultValue: "#FC76A1",
		onChange: setCollectionColor
	});

    const { isOpen, onOpen, onClose } = useDisclosure();
    const nameRef = useRef();
    const { currentUser } = useAuth();
    const toast = useToast();

    const createFolder = async () => {
        const data = {
            name: nameRef.current.value,
            ownerId: currentUser.uid,
            createdAt: serverTimestamp(),
            collectionColor
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
                colorScheme="blue" 
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
                                <FormLabel my="5">Color</FormLabel>
                                <Grid templateColumns="repeat(4, 1fr)" gap="3">
									{options.map((value) => {
										const radio = getRadioProps({ value });
										return (
											<RadioCard
												color={value}
												key={value}
												{...radio}
											>
												{value}
											</RadioCard>
										);
									})}
								</Grid>
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