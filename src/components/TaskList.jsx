import React from "react";
import { Box, Button, Flex, IconButton, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
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
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack align="stretch" spacing={4}>
      {tasks.map((task) => (
        <Flex key={task.id} p={4} bg={getTaskBackgroundColor(task.priority)} borderRadius="md" direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }}>
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
          <Flex mt={{ base: 4, md: 0 }} justify={{ base: "space-between", md: "flex-end" }}>
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
