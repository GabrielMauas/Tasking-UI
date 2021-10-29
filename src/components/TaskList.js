import { Box, IconButton, Stack, Heading, Flex, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useParams, Link, useHistory } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { query, onSnapshot, where, doc, getDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import TaskItem from './TaskItem';
import AddTask from './AddTask';
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

    const getColl = async () => {
        const docRef = doc(db, 'folders', id);
        const docData = await getDoc(docRef);
        setDocName(docData.data().name);
        setDocColor(docData.data().collectionColor);
    }

    const getUncompletedTasks = async () => {
        setLoading(true);
        const docRef = collection(db, 'tasks');
        // const docData = await getDoc(docRef);
        const uncompleted = await query(docRef, where("parentId", "==", id), where("completed", "==", false));
        const unsubscribe = await onSnapshot(uncompleted, (querySnapshot) => {
            const tasksArray = [];
            querySnapshot.forEach((doc) => {
                tasksArray.push({...doc.data(), id: doc.id});
            });
            
            setUncompletedTasks(tasksArray);
            setLoading(false);
        });

        return () => unsubscribe();
    }

    const getCompletedTasks = async () => {
        setLoading(true);
        const docRef = collection(db, 'tasks');
        // const docData = await getDoc(docRef);
        const completed = await query(docRef, where("parentId", "==", id), where("completed", "==", true));
        const unsubscribe = await onSnapshot(completed, (querySnapshot) => {
            const tasksArray = [];
            querySnapshot.forEach((doc) => {
                tasksArray.push({...doc.data(), id: doc.id});
            });
            
            setCompletedTasks(tasksArray);
            setLoading(false);
        });
        return () => unsubscribe();
    }

    const toggleComplete = async (task) => {
        const docRef = doc(db, 'tasks', task.id);
        await updateDoc(docRef, {
            completed: !task.completed
        })
    }

    const deleteTask = async (task) => {
        const docRef = doc(db, 'tasks', task.id);
        await deleteDoc(docRef);
        toast({
            title: "Task Deleted",
            status: "error",
            duration: 2000,
            isClosable: true
        })
    }
    const deleteFolder = async () => {
        setLoading(true);
        const folderRef = doc(db, 'folders', id);
        await deleteDoc(folderRef);
        toast({
            title: "Collection Deleted",
            status: "error",
            duration: 2000,
            isClosable: true
        })
        setLoading(false);
        history.push('/');
    }


    useEffect(() => {
        getColl();
        getCompletedTasks();
        getUncompletedTasks();
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
                    <Heading size="xl" color={docColor} > { docName } </Heading>
                    <Stack spacing={2} direction="row">
                        <OptionsMenuCollection deleteValue={deleteFolder} />
                        <AddTask id={id} color={docColor} />
                    </Stack>
                </Flex>
                <Stack mt="24" p="5">
                <Text fontSize="lg" fontWeight="bold" mb="5">Tasks - {uncompletedTasks.length}</Text>
                    {
                        uncompletedTasks.map(task => <TaskItem key={task.id} toggleComplete={toggleComplete} task={task} deleteValue={deleteTask} /> )
                    }
                </Stack>
                <Stack mt="24" p="5">
                <Text fontSize="lg" fontWeight="bold" mb="5">Completed - {completedTasks.length}</Text>
                    {
                        completedTasks.map(task => <TaskItem key={task.id} toggleComplete={toggleComplete} task={task} deleteValue={deleteTask} /> )
                    }
                </Stack>
            </Box>
            }
        </>
    )
}

export default TaskList;