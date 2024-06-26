import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Input, Select, Text, VStack, IconButton, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Container, useBreakpointValue } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaFolder, FaTasks, FaCalendarDay } from "react-icons/fa";
import FolderList from "../components/FolderList";
import TaskList from "../components/TaskList";

const Index = () => {
  const [view, setView] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [timeLimit, setTimeLimit] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [folders, setFolders] = useState([]);
  const [collaboratorEmails, setCollaboratorEmails] = useState("");
  const [breakDuration, setBreakDuration] = useState(0);
  const [remainingBreakTime, setRemainingBreakTime] = useState(0);
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let timer;
    if (remainingBreakTime > 0) {
      timer = setInterval(() => {
        setRemainingBreakTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsBreakModalOpen(false);
    }
    return () => clearInterval(timer);
  }, [remainingBreakTime]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        title: newTask,
        folder: selectedFolder,
        dueDate: dueDate,
        priority: priority,
        timeLimit: timeLimit,
        timeOfDay: timeOfDay,
        completed: false,
        collaboratorEmails: collaboratorEmails.split(",").map((email) => email.trim()),
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

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === editTask.id) {
        return {
          ...task,
          title: editTask.title,
          folder: editTask.folder,
          dueDate: editTask.dueDate,
          priority: editTask.priority,
          timeLimit: editTask.timeLimit,
          timeOfDay: editTask.timeOfDay,
          notes: editTask.notes,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsEditModalOpen(false);
    setEditTask(null);
    toast({
      title: "Task updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxWidth="container.lg" p={4}>
      <Heading mb={4}>This Is How My Brain Works</Heading>
      <Flex mb={4} align="center" wrap="wrap">
        <Button leftIcon={<FaFolder />} onClick={() => setView("folder")} mr={2} mb={2}>
          Folder View
        </Button>
        <Button leftIcon={<FaTasks />} onClick={() => setView("all")} mr={2} mb={2}>
          All Tasks View
        </Button>
        <Button leftIcon={<FaCalendarDay />} onClick={() => setView("today")} mb={2}>
          Today's Tasks
        </Button>
      </Flex>
      {view === "folder" ? (
        <FolderList folders={folders} tasks={tasks} setSelectedFolder={setSelectedFolder} handleDeleteTask={handleDeleteTask} handleTaskCompletion={handleTaskCompletion} />
      ) : view === "today" ? (
        <VStack align="stretch" spacing={4}>
          {tasks
            .filter((task) => task.dueDate === new Date().toISOString().slice(0, 10))
            .sort((a, b) => a.timeOfDay.localeCompare(b.timeOfDay))
            .map((task, index) => (
              <React.Fragment key={task.id}>
                <TaskList tasks={[task]} handleDeleteTask={handleDeleteTask} handleTaskCompletion={handleTaskCompletion} handleCollaborate={() => {}} handleEditTask={handleEditTask} />
                {index < tasks.length - 1 && (
                  <Button colorScheme="gray" size="sm" mt={2} onClick={() => setIsBreakModalOpen(true)}>
                    Break
                  </Button>
                )}
              </React.Fragment>
            ))}
        </VStack>
      ) : (
        <>
          <Flex mb={4} direction={{ base: "column", md: "row" }} align={{ base: "stretch", md: "center" }}>
            <Input placeholder="Enter task" value={newTask} onChange={(e) => setNewTask(e.target.value)} mr={2} mb={2} />
            <Input placeholder="Select folder" value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} mr={2} mb={2} />
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} mr={2} mb={2} />
            <Select value={priority} onChange={(e) => setPriority(e.target.value)} mr={2} mb={2}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            <Input type="number" placeholder="Time limit (minutes)" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} mr={2} mb={2} />
            <Input type="time" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} mr={2} mb={2} />
            <Input placeholder="Enter collaborator emails (comma-separated)" value={collaboratorEmails} onChange={(e) => setCollaboratorEmails(e.target.value)} mr={2} mb={2} />
            <Button leftIcon={<FaPlus />} onClick={handleAddTask}>
              Add Task
            </Button>
          </Flex>
          <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleTaskCompletion={handleTaskCompletion} />
        </>
      )}
      <Modal isOpen={isBreakModalOpen} onClose={() => setIsBreakModalOpen(false)}>
        {}
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Task Title</FormLabel>
              <Input value={editTask?.title || ""} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Folder</FormLabel>
              <Input value={editTask?.folder || ""} onChange={(e) => setEditTask({ ...editTask, folder: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Due Date</FormLabel>
              <Input type="date" value={editTask?.dueDate || ""} onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Priority</FormLabel>
              <Select value={editTask?.priority || "low"} onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <Input type="number" value={editTask?.timeLimit || ""} onChange={(e) => setEditTask({ ...editTask, timeLimit: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Time of Day</FormLabel>
              <Input type="time" value={editTask?.timeOfDay || ""} onChange={(e) => setEditTask({ ...editTask, timeOfDay: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Notes</FormLabel>
              <Input value={editTask?.notes || ""} onChange={(e) => setEditTask({ ...editTask, notes: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateTask}>
              Update Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Task Title</FormLabel>
              <Input value={editTask?.title || ""} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Folder</FormLabel>
              <Input value={editTask?.folder || ""} onChange={(e) => setEditTask({ ...editTask, folder: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Due Date</FormLabel>
              <Input type="date" value={editTask?.dueDate || ""} onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Priority</FormLabel>
              <Select value={editTask?.priority || "low"} onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <Input type="number" value={editTask?.timeLimit || ""} onChange={(e) => setEditTask({ ...editTask, timeLimit: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Time of Day</FormLabel>
              <Input type="time" value={editTask?.timeOfDay || ""} onChange={(e) => setEditTask({ ...editTask, timeOfDay: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Notes</FormLabel>
              <Input value={editTask?.notes || ""} onChange={(e) => setEditTask({ ...editTask, notes: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateTask}>
              Update Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Task Title</FormLabel>
              <Input value={editTask?.title || ""} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Folder</FormLabel>
              <Input value={editTask?.folder || ""} onChange={(e) => setEditTask({ ...editTask, folder: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Due Date</FormLabel>
              <Input type="date" value={editTask?.dueDate || ""} onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Priority</FormLabel>
              <Select value={editTask?.priority || "low"} onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <Input type="number" value={editTask?.timeLimit || ""} onChange={(e) => setEditTask({ ...editTask, timeLimit: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Time of Day</FormLabel>
              <Input type="time" value={editTask?.timeOfDay || ""} onChange={(e) => setEditTask({ ...editTask, timeOfDay: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Notes</FormLabel>
              <Input value={editTask?.notes || ""} onChange={(e) => setEditTask({ ...editTask, notes: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateTask}>
              Update Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
