import { Box, IconButton, Stack, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaEllipsisH } from 'react-icons/fa';
import { useParams } from 'react-router-dom';


function TaskList({ collections }) {

    const { id } = useParams();

    const newCollection = collections.filter( col => col.id === parseInt(id) );

    const { title, color, list } = newCollection[0]

    const prColor = pr => {
        if(pr === 'High') return 'red'; 
        if(pr === 'Medium') return 'yellow'; 
        if(pr === 'Low') return 'green'; 
        if(pr === 'None') return 'gray'; 
    }



    return(


        <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]} >
            <Flex align="center" >
                <IconButton as="a" href="/" icon={ <ArrowBackIcon /> } mr="5" />
                <Heading color={`${color}.500`} size="lg" > {title} </Heading>
            </Flex>

            <Stack my="10" spacing={2} >
                {
                    list.map( item => {
                        return (
                            <Button key={item.id} display="flex" justifyContent="space-between" alignItems="center" bgColor={`${prColor(item.priority)}.200`} _hover={{bgColor: `${prColor(item.priority)}.400`}} _active={{bgColor: `${prColor(item.priority)}.400`}} _focus={{border: 'none'}} cursor="default" p="2" borderRadius="20" color="black" >
                                <Text fontSize="lg" ml="10" >{item.task}</Text>
                                <IconButton icon={ <FaEllipsisH /> } bgColor="transparent" _focus={{border: 'none'}} />
                            </Button>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

export default TaskList;