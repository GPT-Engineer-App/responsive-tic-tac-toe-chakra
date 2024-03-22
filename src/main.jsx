import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme, useColorMode } from "@chakra-ui/react";
import { Global } from "@emotion/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    body: "IBM Plex Sans, sans-serif",
    heading: "IBM Plex Sans, sans-serif",
  },
});

const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap');
    `}
  />
);

function Root() {
  const { colorMode } = useColorMode();

  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Fonts />
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
