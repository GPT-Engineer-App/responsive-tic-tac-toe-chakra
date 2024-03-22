import React from "react";
import { Box, Text } from "@chakra-ui/react";

const PlayerInfo = ({ player1, player2, currentPlayer }) => {
  return (
    <Box>
      <Text>
        {player1} (X) {currentPlayer === "X" ? "●" : "○"}
      </Text>
      <Text>
        {player2} (O) {currentPlayer === "O" ? "●" : "○"}
      </Text>
    </Box>
  );
};

export default PlayerInfo;
