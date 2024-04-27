// COMMENTS AND NOTE FOR EDUCATIONAL PURPOSES

import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import { useEffect, useState } from 'react';

// Define tasks state and its setter function using the useState hook
function App() {
  const [tasks, setTasks] = useState([]);
  // useEffect hook to save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length === 0) return;
    // Storing tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  }, [tasks]); // Run this effect whenever tasks state changes

  useEffect(() => {
    // Retrieve tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    // Set tasks state to retreive the stored tasks or an empty array
    setTasks(storedTasks || []);
  }, []);

  // Funciton to add a new task
  function addTask(name) {
    setTasks(prevTasks => [...prevTasks, { name: name, done: false }]);
  }

  // Function to remove a task by its index 
  function removeTask(indexToRemove) {
    setTasks(prevTasks => {
      // Filters out the task at the specified index
      const updatedTasks = prevTasks.filter((_, index) => index !== indexToRemove);
      // Update local storage with the filtered task 
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }
  
  function updateTaskDone(taskIndex, newDone) {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one!';
    }
    if (percentage < 30 && percentage > 0) {
      return "Great start!"
    }
    if (percentage >= 40 && percentage <= 60) {
      return "Just about halfway there! How about a short break?";
    }
    if (percentage >= 75 && percentage < 100) {
      return 'Almost there!';
    }
    if (percentage === 100) {
      return "Nice job! You're all done!";
    }
  }

  function renameTasks(index, newName) {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={index}
          name={task.name} 
          done={task.done}
          onToggle={done => updateTaskDone(index, done)}
          onTrash={() => removeTask(index)}
          onRename={newName => renameTasks(index, newName)}
        />
      ))}
    </main>
  );
}

export default App;
