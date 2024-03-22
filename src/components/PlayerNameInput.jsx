import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";

const PlayerNameInput = ({ onSubmit }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleSubmit = () => {
    onSubmit(player1, player2);
  };

  return (
    <Box>
      <Input placeholder="Player 1 name" value={player1} onChange={(e) => setPlayer1(e.target.value)} mb={2} />
      <Input placeholder="Player 2 name" value={player2} onChange={(e) => setPlayer2(e.target.value)} mb={4} />
      <Button onClick={handleSubmit} colorScheme="blue">
        Start Game
      </Button>
    </Box>
  );
};

export default PlayerNameInput;
