import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, VStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [dueDate, setDueDate] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        title: newTask,
        folder: selectedFolder,
        dueDate: dueDate,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setSelectedFolder("");
      setDueDate("");
      toast({
        title: "Task added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    toast({
      title: "Task deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    toast({
      title: "Task completed",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Task Automation</Heading>
      <Flex mb={4}>
        <Input placeholder="Enter task" value={newTask} onChange={(e) => setNewTask(e.target.value)} mr={2} />
        <Input placeholder="Select folder" value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} mr={2} />
        <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} mr={2} />
        <Button leftIcon={<FaPlus />} onClick={handleAddTask}>
          Add Task
        </Button>
      </Flex>
      <VStack align="stretch" spacing={4}>
        {tasks.map((task) => (
          <Flex key={task.id} p={4} bg="gray.100" borderRadius="md" justify="space-between" align="center">
            <Box>
              <Text fontSize="lg" fontWeight="bold" textDecoration={task.completed ? "line-through" : "none"}>
                {task.title}
              </Text>
              <Text>Folder: {task.folder}</Text>
              <Text>Due Date: {task.dueDate}</Text>
            </Box>
            <Flex>
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} mr={2} />
              <Button colorScheme="green" onClick={() => handleTaskCompletion(task.id)} disabled={task.completed}>
                {task.completed ? "Completed" : "Complete"}
              </Button>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
