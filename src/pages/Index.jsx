import { useState, useEffect } from "react";
import { Button, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text } from "@chakra-ui/react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [breakDuration, setBreakDuration] = useState(5);
  const [breakCountdown, setBreakCountdown] = useState(0);

  const startBreakCountdown = () => {
    setBreakCountdown(breakDuration * 60);
    onClose();
  };

  useEffect(() => {
    let timer;
    if (breakCountdown > 0) {
      timer = setInterval(() => {
        setBreakCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (breakCountdown === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [breakCountdown]);

  return (
    <VStack spacing={4}>
      {}
      <Button onClick={onOpen}>Take a Break</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Break Duration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInput defaultValue={5} min={1} max={60} onChange={(valueAsString, valueAsNumber) => setBreakDuration(valueAsNumber)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={startBreakCountdown}>
              Start Break
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {breakCountdown > 0 && (
        <Text>
          Time remaining for break: {Math.floor(breakCountdown / 60)}:{("0" + (breakCountdown % 60)).slice(-2)} minutes
        </Text>
      )}
      {}
    </VStack>
  );
};

export default Index;
