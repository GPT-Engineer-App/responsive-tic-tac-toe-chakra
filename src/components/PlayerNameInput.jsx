import React from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";

const PlayerNameInput = ({ playerNames, setPlayerNames, setGameStarted }) => {
  const handleNameChange = (event, player) => {
    setPlayerNames({ ...playerNames, [player]: event.target.value });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Enter Player Names
      </Heading>
      <Flex direction="column" maxW="400px" mx="auto">
        <FormControl id="playerX" mb={4}>
          <FormLabel>Player X</FormLabel>
          <Input type="text" value={playerNames.X} onChange={(event) => handleNameChange(event, "X")} />
        </FormControl>
        <FormControl id="playerO" mb={8}>
          <FormLabel>Player O</FormLabel>
          <Input type="text" value={playerNames.O} onChange={(event) => handleNameChange(event, "O")} />
        </FormControl>
        <Button colorScheme="blue" onClick={() => setGameStarted(true)}>
          Start Game
        </Button>
      </Flex>
    </Box>
  );
};

export default PlayerNameInput;
