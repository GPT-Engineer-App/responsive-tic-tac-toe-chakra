import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import GameBoard from "../components/GameBoard";
import PlayerInfo from "../components/PlayerInfo";
import PlayerNameInput from "../components/PlayerNameInput";
import WinningLine from "../components/WinningLine";

const Index = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [hasWinner, setHasWinner] = useState(false);
  const [winningLine, setWinningLine] = useState(null);

  const handlePlayerNamesSubmit = (p1, p2) => {
    setPlayer1(p1);
    setPlayer2(p2);
  };

  if (!player1 || !player2) {
    return <PlayerNameInput onSubmit={handlePlayerNamesSubmit} />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <PlayerInfo player1={player1} player2={player2} currentPlayer={currentPlayer} />
      <GameBoard />
      <WinningLine line={winningLine} isVisible={hasWinner} />
    </Box>
  );
};

export default Index;
