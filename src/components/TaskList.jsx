import React from "react";
import { Box, Button, Flex, IconButton, Text, VStack } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const getTaskBackgroundColor = (priority) => {
  switch (priority) {
    case "high":
      return "red.100";
    case "medium":
      return "yellow.100";
    case "low":
      return "green.100";
    default:
      return "gray.100";
  }
};

const TaskList = ({ tasks, handleDeleteTask, handleTaskCompletion, handleCollaborate, handleEditTask }) => {
  return (
    <VStack align="stretch" spacing={4}>
      {tasks.map((task) => (
        <Flex key={task.id} p={4} bg={getTaskBackgroundColor(task.priority)} borderRadius="md" justify="space-between" align="center">
          <Box>
            <Text fontSize="lg" fontWeight="bold" textDecoration={task.completed ? "line-through" : "none"}>
              {task.title}
            </Text>
            <Text>Folder: {task.folder}</Text>
            <Text>Due Date: {task.dueDate}</Text>
            <Text>Priority: {task.priority}</Text>
            <Text>Time Limit: {task.timeLimit} minutes</Text>
            <Text>Time of Day: {task.timeOfDay}</Text>
          </Box>
          <Flex>
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} mr={2} />
            <Button colorScheme="green" onClick={() => handleTaskCompletion(task.id)} disabled={task.completed} mr={2}>
              {task.completed ? "Completed" : "Complete"}
            </Button>
            <Button colorScheme="blue" onClick={() => handleCollaborate(task.id)} mr={2}>
              Collaborate
            </Button>
            <Button colorScheme="orange" onClick={() => handleEditTask(task)}>
              Edit
            </Button>
          </Flex>
        </Flex>
      ))}
    </VStack>
  );
};

export default TaskList;
