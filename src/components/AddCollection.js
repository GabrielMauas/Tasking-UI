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
    Stack, FormLabel, Input, Box, useToast, useRadioGroup, Grid, useColorModeValue
  } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React, { useRef, useState } from 'react';

// import { foldersRef } from '../firebase/firebaseConfig';
import { serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import RadioCard from './CustomRadioButton';
import { createCollection } from '../firebase/api';


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
    const { getRadioProps } = useRadioGroup({
		name: "collection-color",
		defaultValue: "#FC76A1",
		onChange: setCollectionColor
	});
    const [name, setName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const nameRef = useRef();
    const { currentUser } = useAuth();
    const toast = useToast();

    const params = {
        currentUser,
        toast
    }
    const data = {
        name,
        ownerId: currentUser.uid,
        createdAt: serverTimestamp(),
        collectionColor
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        createCollection(params, data);
    }
    const bordercolor = useColorModeValue('gray.300', 'gray.600');

    
    return (
        <>
            <Button 
                icon={ <AddIcon /> } 
                onClick={onOpen}  
                borderRadius="12"
                borderWidth="2px"
                borderColor={bordercolor}
                py="7"
                fontSize="md"
                leftIcon={ <AddIcon /> }
                _hover={{transform: "scale(0.98)"}}
                _active={{transform: "scale(0.96)"}}
                _focus={{borderColor: 'none'}}
            >
                Add Collection
            </Button>
            <Modal
                initialFocusRef={nameRef}
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="sm"
                motionPreset="slideInRight"
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
                                    onChange={(e) => setName(e.target.value)}
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