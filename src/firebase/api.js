import { query, onSnapshot, where, orderBy, collection, doc, getDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const foldersRef = collection(db, 'folders');

export const createCollection = async (params, data) => {
    params.toast({
        title: 'Collection Created',
        status: 'success',
        duration: 2000,
        isClosable: true
    });
    await addDoc(foldersRef, data);
}

export const getFolders = async (params) => {
    params.setLoading(true);
    const q = await query(foldersRef, where("ownerId", "==", params.currentUser.uid), orderBy("name"));
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
        const foldersArray = [];
        querySnapshot.forEach((doc) => {
            foldersArray.push({...doc.data(), id: doc.id});
        });
        
        params.setFolders(foldersArray);
        params.setLoading(false);
    });
    return () => unsubscribe();
}

export const getColl = async (params) => {
    const docRef = doc(db, 'folders', params.id);
    const docData = await getDoc(docRef);
    params.setDocName(docData.data().name);
    params.setDocColor(docData.data().collectionColor);
}

export const getUncompletedTasks = async (params) => {
    params.setLoading(true);
    const docRef = collection(db, 'tasks');
    // const docData = await getDoc(docRef);
    const uncompleted = await query(docRef, where("parentId", "==", params.id), where("completed", "==", false));
    const unsubscribe = await onSnapshot(uncompleted, (querySnapshot) => {
        const tasksArray = [];
        querySnapshot.forEach((doc) => {
            tasksArray.push({...doc.data(), id: doc.id});
        });
        
        params.setUncompletedTasks(tasksArray);
        params.setLoading(false);
    });

    return () => unsubscribe();
}

export const getCompletedTasks = async (params) => {
    params.setLoading(true);
    const docRef = collection(db, 'tasks');
    // const docData = await getDoc(docRef);
    const completed = await query(docRef, where("parentId", "==", params.id), where("completed", "==", true));
    const unsubscribe = await onSnapshot(completed, (querySnapshot) => {
        const tasksArray = [];
        querySnapshot.forEach((doc) => {
            tasksArray.push({...doc.data(), id: doc.id});
        });
        
        params.setCompletedTasks(tasksArray);
        params.setLoading(false);
    });
    return () => unsubscribe();
}

export const toggleComplete = async (task) => {
    const docRef = doc(db, 'tasks', task.id);
    await updateDoc(docRef, {
        completed: !task.completed
    })
}

export const deleteTask = async (task, params) => {
    const docRef = doc(db, 'tasks', task.id);
    params.toast({
        title: "Task Deleted",
        status: "error",
        duration: 2000,
        isClosable: true
    })
    await deleteDoc(docRef);
}
export const deleteFolder = async (params) => {
    params.setLoading(true);
    const folderRef = doc(db, 'folders', params.id);
    params.toast({
        title: "Collection Deleted",
        status: "error",
        duration: 2000,
        isClosable: true
    })
    await deleteDoc(folderRef);
    params.setLoading(false);
    params.history.push('/');
}

export const createTask = async (params, data) => {
    params.toast({
        title: 'Task Created',
        status: 'success',
        duration: 2000,
        isClosable: true
    });
    await addDoc(collection(db, 'tasks'), data);
}

