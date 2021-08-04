import { Box, Grid, Heading } from '@chakra-ui/react';

import CollectionCard from './CollectionCard';
import AddCollection from './AddCollection';

function Dashboard({ collections }) {



    return(
        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]} >
            <Heading size="lg" >
                Collections
            </Heading>
            <Grid templateColumns={["100%", "100", "repeat(2, 1fr)"]} gap={15} my="10" >
                {
                    collections.map( c => {

                        return(
                            <CollectionCard key={c.id} title={c.title} tasks={c.tasks} colors={c.color} id={c.id} list={c.list} />
                        )
                    })
                }
                <AddCollection />
            </Grid>
        </Box>
    )
}

export default Dashboard;