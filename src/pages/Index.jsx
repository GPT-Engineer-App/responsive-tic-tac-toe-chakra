import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Heading, Icon, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import ColorModeToggle from "../components/ColorModeToggle";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [playerNames, setPlayerNames] = useState({ X: "Player X", O: "Player O" });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCells, setSelectedCells] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setSelectedCells([...selectedCells, index]);

    const winner = calculateWinner(newBoard);
    const xColor = "red";
    const oColor = "blue";
    const drawColor = "gray";

    if (winner) {
      const toastColor = winner === "X" ? xColor : oColor;
      setScores({ ...scores, [winner]: scores[winner] + 1 });
      toast({
        title: `${playerNames[winner]} (${winner}) wins!`,
        status: toastColor,
        duration: 3000,
        isClosable: true,
      });
      setTimeout(resetBoard, 3000);
    } else if (newBoard.every((cell) => cell !== null)) {
      toast({
        title: "It's a draw!",
        status: drawColor,
        duration: 3000,
        isClosable: true,
      });
      setTimeout(resetBoard, 3000);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  const renderIcon = (value, index) => {
    if (value === "X") {
      return (
        <Box border={selectedCells.includes(index) ? "1px solid" : "none"} borderColor="red.500" bg={selectedCells.includes(index) ? "red.100" : "transparent"} borderRadius="md" display="flex" justifyContent="center" alignItems="center" w="100%" h="100%">
          <Icon as={FaTimes} boxSize={12} color="red.500" />
        </Box>
      );
    } else if (value === "O") {
      return (
        <Box border={selectedCells.includes(index) ? "1px solid" : "none"} borderColor="blue.500" bg={selectedCells.includes(index) ? "blue.100" : "transparent"} borderRadius="md" display="flex" justifyContent="center" alignItems="center" w="100%" h="100%">
          <Icon as={FaRegCircle} boxSize={12} color="blue.500" />
        </Box>
      );
    }
    return null;
  };

  const handleNameChange = (event, player) => {
    setPlayerNames({ ...playerNames, [player]: event.target.value });
  };

  const startNewGame = () => {
    resetBoard();
    setSelectedCells([]);
    setIsModalOpen(true);
  };

  return (
    <Flex direction="column" p={4} height="100vh" justify="center" align="center">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="xl">
          Tic Tac Toe
        </Heading>
        <ColorModeToggle />
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={2} maxW="400px" mx="auto">
        {board.map((value, index) => (
          <Box
            key={index}
            bg="gray.200"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="md"
            w="100px"
            h="100px"
            onClick={() => handleClick(index)}
            cursor="pointer"
            display="flex"
            justifyContent="center"
            alignItems="center"
            transition="all 0.2s"
            _hover={{ bg: "gray.300" }}
            sx={{
              aspectRatio: "1 / 1",
            }}
          >
            {renderIcon(value, index)}
          </Box>
        ))}
      </Grid>
      <Text mt={4} textAlign="center" fontWeight="bold">
        {playerNames[player]} ({player})'s turn
      </Text>
      <Flex justify="center" mt={8}>
        <Box mr={8}>
          <Text fontWeight="bold">{playerNames.X} (X)</Text>
          <Text fontSize="2xl">{scores.X}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">{playerNames.O} (O)</Text>
          <Text fontSize="2xl">{scores.O}</Text>
        </Box>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Player Names</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="playerX" mb={4}>
              <FormLabel>Player X</FormLabel>
              <Input type="text" value={playerNames.X} onChange={(event) => handleNameChange(event, "X")} />
            </FormControl>
            <FormControl id="playerO" mb={8}>
              <FormLabel>Player O</FormLabel>
              <Input type="text" value={playerNames.O} onChange={(event) => handleNameChange(event, "O")} />
            </FormControl>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              Start Game
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex justify="center" mt={4}>
        <Button colorScheme="blue" onClick={startNewGame}>
          New Game
        </Button>
      </Flex>
    </Flex>
  );
};

export default Index;
