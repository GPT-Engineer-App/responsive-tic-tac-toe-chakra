import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Heading, Icon, Switch, Text, useColorMode, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [playerNames, setPlayerNames] = useState({ X: "Player X", O: "Player O" });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
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

    const winner = calculateWinner(newBoard);
    if (winner) {
      toast({
        title: `Player ${winner} wins!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setScores({ ...scores, [winner]: scores[winner] + 1 });
      resetBoard();
    } else if (newBoard.every((cell) => cell !== null)) {
      toast({
        title: "It's a draw!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      resetBoard();
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

  const renderIcon = (value) => {
    if (value === "X") {
      return <Icon as={FaTimes} boxSize={12} color="red.500" />;
    } else if (value === "O") {
      return <Icon as={FaRegCircle} boxSize={12} color="blue.500" />;
    }
    return null;
  };

  const handleNameChange = (event, player) => {
    setPlayerNames({ ...playerNames, [player]: event.target.value });
  };

  const startNewGame = () => {
    resetBoard();
    setIsModalOpen(true);
  };

  return (
    <Box p={4} bg="orange.50">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="xl">
          Tic Tac Toe
        </Heading>
        <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} colorScheme="purple" />
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={2} maxW="400px" mx="auto">
        {board.map((value, index) => (
          <Box
            key={index}
            bg="gray.200"
            border="1px solid"
            borderColor="gray.400"
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
            {renderIcon(value)}
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
    </Box>
  );
};

export default Index;
