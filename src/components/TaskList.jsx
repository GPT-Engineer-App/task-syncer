import React from "react";
import { Box, Button, Flex, IconButton, Text, VStack } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, handleDeleteTask, handleTaskCompletion }) => {
  return (
    <VStack align="stretch" spacing={4}>
      {tasks.map((task) => (
        <Flex key={task.id} p={4} bg="gray.100" borderRadius="md" justify="space-between" align="center">
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
            <Button colorScheme="green" onClick={() => handleTaskCompletion(task.id)} disabled={task.completed}>
              {task.completed ? "Completed" : "Complete"}
            </Button>
          </Flex>
        </Flex>
      ))}
    </VStack>
  );
};

export default TaskList;
