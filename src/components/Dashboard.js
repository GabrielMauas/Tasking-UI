import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Flex, Badge } from '@chakra-ui/react';

import AddCollection from './AddCollection';
import CollectionCard from './CollectionCard';
import Loading from './Loading';

import { foldersRef } from '../firebase/firebaseConfig';
import { query, onSnapshot, where, orderBy } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {

    const { currentUser } = useAuth();

    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFolders = async () => {
        setLoading(true);
        const q = await query(foldersRef, where("ownerId", "==", currentUser.uid), orderBy("name"));
        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
            const foldersArray = [];
            querySnapshot.forEach((doc) => {
                foldersArray.push({...doc.data(), id: doc.id});
            });
            
            setFolders(foldersArray);
            setLoading(false);
        });
        return () => unsubscribe();
    }

    useEffect(() => {
        getFolders();
    }, []);


    return(
        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]} >
            <Flex justify="space-between">
                <Heading size="xl" textAlign="left">
                    Collections
                </Heading>
                <AddCollection />
            </Flex>

            {
                loading
                ? <Loading />
                :
                    <Grid templateColumns={["100%", "100%", folders.length === 0 ? "100%" : "repeat(2, 1fr)"]} gap={15} my="10" mb="24" >   
                        { 
                        folders.length === 0 
                        ?
                            <Badge variant="subtle" w="90%" mx="auto" color="gray.500" placeItems="center" textAlign="center" my="5" py="3" fontSize="md" >
                                Create a New Collection
                            </Badge>
                        :
                            folders.map( folder => <CollectionCard folder={folder} key={folder.id} />) 
                        }
                    </Grid>
            }

        </Box>
    )
}

export default Dashboard;