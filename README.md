# responsive-tic-tac-toe-chakra

This specification outlines the requirements for a responsive Tic Tac Toe game designed with React and Chakra UI. The game will support both 3x3 and 4x4 grid modes while adhering to the classic gameplay rules. It will feature a dark mode, distinct notifications for player turns, and use visually appealing icons for player symbols. A score tally system will record game outcomes, storing session data in the browser's local storage.
Features and Functional Requirements

    Game Grid Customization
        The game must allow users to choose between a 3x3 and a 4x4 grid before starting a new game.
        The choice of grid does not affect the win condition: three matching symbols in a straight line.

    Dark Mode
        Users must be able to toggle between light and dark modes. This preference should be remembered across sessions using local storage.

    Player Turn Notification
        The game must clearly display which player's turn is next. This should be prominently placed to avoid confusion.

    Player Symbols
        Players will use "X" and "O" symbols, distinguished by color and size.
        Symbols should be sourced from the FontAwesome (fa-icons) set:
            "X" can be represented by fa-times
            "O" can be represented by fa-circle-o
        Symbols must be large and easily distinguishable, with distinct colors for each player.

    Score Tally and Session Storage
        The game must keep a tally of scores, incrementing the score of the winning player after each game.
        The application must store session data in the local storage, including:
            Scores of each player.
            Time and date of the game.
            Which player won the game.
        The stored session data should be viewable in a simple, accessible format, such as a modal or sidebar.

    Technical Requirements
        The game must be developed using React and styled with Chakra UI for consistency and responsive design.
        No database or backend functionality; all data should be stored client-side in local storage.
        The application must be optimized for both desktop and mobile viewing, ensuring a seamless user experience across devices.

User Interface Design

    Layout
        The game interface should be minimalistic and intuitive, with clear distinctions between different sections (game grid, score tally, mode selection).
        Use Chakra UI components for UI elements to maintain design consistency and simplify responsiveness.

    Icons and Colors
        Use contrasting colors for the "X" and "O" symbols for clear visibility. Consider accessibility when choosing color schemes, ensuring they are distinguishable for color-blind users.
        Icons should be scalable to fit different screen sizes without losing clarity.

    Mode Toggle and Notifications
        Implement a toggle switch for the dark/light mode, prominently displayed for easy access.
        Notifications for player turns should be clear and concise, appearing in a fixed position that does not obstruct the gameplay area.

Development and Testing

    Component Structure
        Organize the application into reusable components (e.g., Grid, Cell, ScoreBoard) to facilitate maintainability and scalability.
        Use React state and context efficiently to manage game state and settings across components.

    Local Storage Management
        Implement utility functions for reading from and writing to local storage, ensuring data integrity and preventing errors.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/responsive-tic-tac-toe-chakra.git
cd responsive-tic-tac-toe-chakra
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
