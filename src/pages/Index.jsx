import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Heading, Icon, Switch, Text, useColorMode, useToast } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [gridSize, setGridSize] = useState(3);
  const [board, setBoard] = useState(Array(gridSize * gridSize).fill(null));
  const [player, setPlayer] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
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
    setBoard(Array(gridSize * gridSize).fill(null));
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

  return (
    <Box p={4} bg="orange.50">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="xl">
          Tic Tac Toe
        </Heading>
        <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} colorScheme="purple" />
      </Flex>
      <Flex justify="center" align="center" mb={4}>
        <Button onClick={() => setGridSize(3)} mr={2} colorScheme={gridSize === 3 ? "teal" : "gray"}>
          3x3
        </Button>
        <Button onClick={() => setGridSize(4)} colorScheme={gridSize === 4 ? "teal" : "gray"}>
          4x4
        </Button>
      </Flex>
      <Grid templateColumns={`repeat(${gridSize}, 1fr)`} gap="2px" maxW="400px" mx="auto">
        {board.map((value, index) => (
          <Box
            key={index}
            bg={colorMode === "dark" ? "gray.700" : "gray.100"}
            borderRadius="md"
            w="100px"
            h="100px"
            onClick={() => handleClick(index)}
            cursor="pointer"
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="md"
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            sx={{
              aspectRatio: "1 / 1",
            }}
          >
            {renderIcon(value)}
          </Box>
        ))}
      </Grid>
      <Text mt={4} textAlign="center" fontWeight="bold">
        Player {player}'s turn
      </Text>
      <Flex justify="center" mt={8}>
        <Box mr={8}>
          <Text fontWeight="bold">Player X</Text>
          <Text fontSize="2xl">{scores.X}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Player O</Text>
          <Text fontSize="2xl">{scores.O}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Index;
