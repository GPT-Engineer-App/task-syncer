import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import TaskList from "./TaskList";

const FolderList = ({ folders, tasks, setSelectedFolder, handleDeleteTask, handleTaskCompletion, handleCollaborate, handleEditTask }) => {
  return (
    <VStack align="stretch" spacing={4}>
      {folders.map((folder) => (
        <Box key={folder} p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            {folder}
          </Text>
          <TaskList tasks={tasks.filter((task) => task.folder === folder)} handleDeleteTask={handleDeleteTask} handleTaskCompletion={handleTaskCompletion} handleCollaborate={handleCollaborate} handleEditTask={handleEditTask} />
        </Box>
      ))}
    </VStack>
  );
};

export default FolderList;
