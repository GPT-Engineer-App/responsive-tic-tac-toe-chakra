import React from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";

const GameBoard = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2} width="300px" height="300px">
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <GridItem key={index} bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center" fontSize="4xl" fontWeight="bold" cursor="pointer">
            <Box>{}</Box>
          </GridItem>
        ))}
    </Grid>
  );
};

export default GameBoard;
