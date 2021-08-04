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
        color: 'blue',
        list: [
            {
                id: 1,
                task: 'Finish UI',
                priority: 'High',
                complete: 'no' 
            },
            {
                id: 2,
                task: 'example2',
                priority: 'Medium',
                complete: 'yes'
            },
            {
                id: 3,
                task: 'example3',
                priority: 'Low',
                complete: 'no'
            },
            {
                id: 4,
                task: 'example4',
                priority: 'None',
                complete: 'yes'
            }
        ]
    },
    {
        id: 2,
        title: 'Personal',
        color: 'red',
        list: [
          {
              id: 1,
              task: 'Personal',
              priority: 'High',
              complete: 'no' 
          },
          {
              id: 2,
              task: 'example2',
              priority: 'Medium',
              complete: 'yes'
          },
          {
              id: 3,
              task: 'example3',
              priority: 'Low',
              complete: 'no'
          },
          {
              id: 4,
              task: 'example4',
              priority: 'None',
              complete: 'yes'
          }
      ]
    },
    {
        id: 3,
        title: 'Gym',
        color: 'yellow',
        list: [
          {
              id: 1,
              task: 'gym',
              priority: 'High',
              complete: 'no' 
          },
          {
              id: 2,
              task: 'example2',
              priority: 'Medium',
              complete: 'yes'
          },
          {
              id: 3,
              task: 'example3',
              priority: 'Low',
              complete: 'no'
          },
          {
              id: 4,
              task: 'example4',
              priority: 'None',
              complete: 'yes'
          }
      ]
    },
    {
        id: 4,
        title: 'Side Project',
        color: 'pink',
        list: [
          {
              id: 1,
              task: 'side project',
              priority: 'High',
              complete: 'no' 
          },
          {
              id: 2,
              task: 'example2',
              priority: 'Medium',
              complete: 'yes'
          },
          {
              id: 3,
              task: 'example3',
              priority: 'Low',
              complete: 'no'
          },
          {
              id: 4,
              task: 'example4',
              priority: 'None',
              complete: 'yes'
          }
      ]
    },
    {
        id: 5,
        title: 'Shop List',
        color: 'green',
        list: [
          {
              id: 1,
              task: 'Shop list',
              priority: 'High',
              complete: 'no' 
          },
          {
              id: 2,
              task: 'example2',
              priority: 'Medium',
              complete: 'yes'
          },
          {
              id: 3,
              task: 'example3',
              priority: 'Low',
              complete: 'no'
          },
          {
              id: 4,
              task: 'example4',
              priority: 'None',
              complete: 'yes'
          }
      ]
    }
]

  return (
    <>
      <Box minH={["110vh", "110vh", "100vh"]} maxW="100vw" overflow="hidden">
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
