import { Box, Button, Heading, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

// import TaskList from './TaskList';

function CollectionCard({ title, tasks, colors, id }) {

    const color = useColorModeValue('gray.700');

     return(
        <Button as="a" href={`/tasks/${id}`} borderRadius="10" px="10" py="5" textAlign="left" size="xl">

                <Box w="7px" h="70px" mr="5" ml="-3" bgColor={`${colors}.500`} ></Box>
                <Box w="100%" >
                    <Heading size="lg" mb="3" fontWeight="semibold" color={color}>{ title }</Heading>
                    <Text color="gray.500">{ tasks } Tasks</Text>
                </Box>
                <IconButton icon={ <ArrowRightIcon /> } />

        </Button>
     )
}

export default CollectionCard;