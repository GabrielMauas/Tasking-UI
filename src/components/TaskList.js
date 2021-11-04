import { Box, IconButton, Stack, Heading, Flex, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getColl, getUncompletedTasks, getCompletedTasks, toggleComplete, deleteTask, deleteFolder } from '../firebase/api';

import TaskItem from './TaskItem';
import Addtask2 from './Addtask2';
import Loading from './Loading';
import OptionsMenuCollection from './OptionsMenuCollection';


function TaskList() {

    const { id } = useParams();

    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [docName, setDocName] = useState('');
    const [docColor, setDocColor] = useState('');
    const toast = useToast();
    const history = useHistory();

    const params = {
        setUncompletedTasks,
        setCompletedTasks,
        setLoading,
        setDocName,
        setDocColor,
        id,
        toast,
        history
    }

    useEffect(() => {
        getColl(params);
        getCompletedTasks(params);
        getUncompletedTasks(params);
    }, []);

    return(
        <>
            {
            loading
            ? 
            <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]} >
                <Loading />
            </Box>
            :       
            <Box position="absolute" top={["5%", "5%", "15%"]} left={["5", "20", "25%"]} right={["5", "20", "25%"]} >
                <Flex align="center" justify="space-between" >
                    <Link to="/"> 
                        <IconButton icon={ <ArrowBackIcon /> } />
                    </Link>
                    <Heading size="2xl" fontWeight="700" color={docColor} > { docName } </Heading>
                    <Stack spacing={2} direction="row">
                        <OptionsMenuCollection deleteValue={deleteFolder} params={params} />
                        {/* <AddTask id={id} color={docColor} /> */}
                    </Stack>
                </Flex>
                <Stack mt="20" mb="20" spacing={3}>
                    <Text fontSize="lg" fontWeight="bold" mb="5">Tasks - {uncompletedTasks.length}</Text>
                    <Addtask2 id={id} color={docColor} />

                        {
                            uncompletedTasks.map(task => <TaskItem key={task.id} color={docColor} toggleComplete={toggleComplete} task={task} deleteValue={deleteTask} params={params} /> )
                        }
                </Stack>
                {
                    completedTasks.length > 0
                    ? 
                    <Stack mt="24" mb="20">
                        <Text fontSize="lg" fontWeight="bold" mb="5">Completed - {completedTasks.length}</Text>
                        {
                            completedTasks.map(task => <TaskItem key={task.id} color={docColor} toggleComplete={toggleComplete} task={task} deleteValue={deleteTask} params={params} /> )
                        }
                    </Stack>
                    : null
                }

            </Box>
            }
        </>
    )
}

export default TaskList;