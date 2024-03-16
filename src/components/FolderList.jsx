import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const FolderList = ({ folders, setSelectedFolder }) => {
  return (
    <VStack align="stretch" spacing={4}>
      {folders.map((folder) => (
        <Box key={folder} p={4} bg="gray.100" borderRadius="md" onClick={() => setSelectedFolder(folder)} cursor="pointer">
          <Text fontSize="lg" fontWeight="bold">
            {folder}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default FolderList;
