import { Spinner, Flex } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
    return (
        <>
        {/* <Skeleton h="100px" borderRadius="10" px="10" py="5" />
        <Skeleton h="100px" borderRadius="10" px="10" py="5" />
        <Skeleton h="100px" borderRadius="10" px="10" py="5" />
        <Skeleton h="100px" borderRadius="10" px="10" py="5" /> */}
        <Flex justify="center" align="center" w="100%" my="24">
            <Spinner 
                size="xl"
                thickness="5px"
            />
        </Flex>
        </>



            
    )
}

export default Loading
