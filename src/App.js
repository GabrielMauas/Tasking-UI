import React from 'react';
import { Box } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';

function App() {

  const collections = [
    {
        id: 1,
        title: 'Work',
        tasks: 5,
        color: 'blue',
        list: [
            {
                id: 1,
                task: 'example1',
                priority: 'High'
            },
            {
                id: 2,
                task: 'example2',
                priority: 'Medium'
            },
            {
                id: 3,
                task: 'example3',
                priority: 'Low'
            },
            {
                id: 4,
                task: 'example4',
                priority: 'None'
            }
        ]
    },
    {
        id: 2,
        title: 'Personal',
        tasks: 5,
        color: 'red',
        list: [
            {
                id: 1,
                task: 'example1',
                priority: 'High'
            },
            {
                id: 2,
                task: 'example2',
                priority: 'High'
            },
            {
                id: 3,
                task: 'example3',
                priority: 'High'
            }
        ]
    },
    {
        id: 3,
        title: 'Gym',
        tasks: 5,
        color: 'yellow',
        list: [
            {
                id: 1,
                task: 'example1',
                priority: 'High'
            },
            {
                id: 2,
                task: 'example2',
                priority: 'High'
            },
            {
                id: 3,
                task: 'example3',
                priority: 'High'
            }
        ]
    },
    {
        id: 4,
        title: 'Side Project',
        tasks: 5,
        color: 'pink',
        list: [
            {
                id: 1,
                task: 'example1',
                priority: 'High'
            },
            {
                id: 2,
                task: 'example2',
                priority: 'High'
            },
            {
                id: 3,
                task: 'example3',
                priority: 'High'
            }
        ]
    },
    {
        id: 5,
        title: 'Shop List',
        tasks: 5,
        color: 'green',
        list: [
            {
                id: 1,
                task: 'example1',
                priority: 'High'
            },
            {
                id: 2,
                task: 'example2',
                priority: 'High'
            },
            {
                id: 3,
                task: 'example3',
                priority: 'High'
            }
        ]
    }
]

  return (
    <>
      <Box minH="110vh" maxW="100vw" overflow="hidden">
        <Navbar />
        {/* <Dashboard /> */}

        <Switch>
          <Route path="/" exact>
            <Dashboard collections={collections} />
          </Route>
          <Route path="/tasks/:id">
            <TaskList collections={collections} />
          </Route>
        </Switch>
      </Box>
    </>
  );
}

export default App;
