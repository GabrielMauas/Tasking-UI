import { Box, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function CollectionCard({ folder, innerRef }) {

    const color = useColorModeValue('gray.700');

     return(
        <Link to={`/${folder.id}`} ref={innerRef}>
            <Button borderRadius="12" px="10" py="7" w="100%" textAlign="left" size="xl" borderColor={folder.collectionColor} borderWidth="4px" _active={{transform: "scale(0.99)"}}>
                {/* <Box w="7px" h="70px" mr="5" ml="-3" bgColor={folder.collectionColor}></Box> */}
                <Box w="100%" >
                    <Heading size="lg" fontWeight="semibold" color={color}>{ folder.name }</Heading>
                </Box>
                {/* <IconButton icon={ <ArrowRightIcon /> } /> */}
                <ArrowRightIcon />
            </Button>
        </Link>
 
     )
}

export default CollectionCard;