import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Flex, Badge } from '@chakra-ui/react';

import AddCollection from './AddCollection';
import CollectionCard from './CollectionCard';
import Loading from './Loading';
import { useAuth } from '../contexts/AuthContext';
import { getFolders } from '../firebase/api';

function Dashboard() {

    const { currentUser } = useAuth();

    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = {
        setLoading,
        setFolders,
        currentUser
    }

    useEffect(() => {
        getFolders(params);
    }, []);


    return(
        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]} >
            <Flex justify="space-between">
                <Heading size="xl" fontWeight="bold" textAlign="left">
                    Collections
                </Heading>
                {/* <AddCollection /> */}
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
                                        You have no collections.
                                    </Badge>
                                    // <NoColls />
                                :
                                    folders.map( (folder, index) => {
                                        return(
         
                                                <CollectionCard key={folder.id} index={index} folder={folder} />
       
                                        )
                                    }) 
                                }
                                <AddCollection />
                            </Grid>
             

            }

        </Box>
    )
}

export default Dashboard;