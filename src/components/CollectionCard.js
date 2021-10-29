import { Box, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function CollectionCard({ folder }) {

    const color = useColorModeValue('gray.700');

     return(
        <Link to={`/${folder.id}`}>
            <Button borderRadius="10" px="10" py="5" w="100%" textAlign="left" size="xl">
                <Box w="7px" h="70px" mr="5" ml="-3" bgColor={folder.collectionColor}></Box>
                <Box w="100%" >
                    <Heading size="lg" mb="1" fontWeight="semibold" color={color}>{ folder.name }</Heading>
                </Box>
                {/* <IconButton icon={ <ArrowRightIcon /> } /> */}
                <ArrowRightIcon />
            </Button>
        </Link>
 
     )
}

export default CollectionCard;