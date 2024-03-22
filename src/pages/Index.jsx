import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Heading, Icon, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Divider } from "@chakra-ui/react";
import ColorModeToggle from "../components/ColorModeToggle";
import { FaTimes, FaRegCircle, FaRedo, FaEquals } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
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
    if (winner) {
      toast({
        title: `${playerNames[winner]} wins!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setScores({ ...scores, [winner]: scores[winner] + 1 });
      setTimeout(resetBoard, 3000);
    } else if (newBoard.every((cell) => cell !== null)) {
      toast({
        title: "It's a draw!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      setScores({ ...scores, draws: scores.draws + 1 });
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
    setPlayer(Math.random() < 0.5 ? "X" : "O");
  };

  return (
    <Flex direction="column" p={4} minHeight="100vh" position="relative" justify="center">
      <Box position="absolute" top={4} right={4}>
        <ColorModeToggle />
      </Box>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Tic Tac Toe
      </Heading>

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
      <Flex mt={4} justify="center" align="center" maxW="400px" mx="auto">
        <Text fontWeight="normal" mr={2}>
          {playerNames[player]}'s turn
        </Text>
        {player === "X" ? <Icon as={FaTimes} color="red.500" /> : <Icon as={FaRegCircle} color="blue.500" />}
      </Flex>
      <Divider my={8} maxW="400px" mx="auto" />
      <Flex justify="center" mb={12} align="flex-end">
        <Box mr={8}>
          <Flex direction="column" align="flex-end">
            <Flex align="center">
              <Icon as={FaTimes} color="red.500" mr={2} />
              <Text fontWeight="normal">{playerNames.X}</Text>
            </Flex>
            <Text fontSize="2xl">{scores.X}</Text>
          </Flex>
        </Box>
        <Box mr={8}>
          <Flex direction="column" align="center">
            <Icon as={FaEquals} color="gray.500" boxSize={6} />
            <Text fontSize="2xl">{scores.draws}</Text>
          </Flex>
        </Box>
        <Box>
          <Flex direction="column" align="flex-end">
            <Flex align="center">
              <Icon as={FaRegCircle} color="blue.500" mr={2} />
              <Text fontWeight="normal">{playerNames.O}</Text>
            </Flex>
            <Text fontSize="2xl">{scores.O}</Text>
          </Flex>
        </Box>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent pb={6}>
          <ModalHeader>Enter player names</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="playerX" mb={4}>
              <FormLabel>
                <Icon as={FaTimes} color="red.500" mr={2} />
                Player X
              </FormLabel>
              <Input type="text" value={playerNames.X} onChange={(event) => handleNameChange(event, "X")} placeholder="Enter player name" />
            </FormControl>
            <FormControl id="playerO" mb={6}>
              <FormLabel>
                <Icon as={FaRegCircle} color="blue.500" mr={2} />
                Player O
              </FormLabel>
              <Input type="text" value={playerNames.O} onChange={(event) => handleNameChange(event, "O")} placeholder="Enter player name" />
            </FormControl>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)} fontWeight="normal">
              Start game
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex justify="center" mt={8}>
        <Button leftIcon={<FaRedo />} variant="outline" fontWeight="normal" onClick={startNewGame}>
          Restart game
        </Button>
      </Flex>
    </Flex>
  );
};

export default Index;
