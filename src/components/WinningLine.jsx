const WinningLine = ({ line, isVisible }) => {
  const getLineStyle = () => {
    const [a, b, c] = line;
    const cellSize = 100;
    const margin = 2;
    const x1 = (a % 3) * (cellSize + margin) + cellSize / 2;
    const y1 = Math.floor(a / 3) * (cellSize + margin) + cellSize / 2;
    const x2 = (c % 3) * (cellSize + margin) + cellSize / 2;
    const y2 = Math.floor(c / 3) * (cellSize + margin) + cellSize / 2;
    return {
      position: "absolute",
      width: `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`,
      transform: `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`,
      top: `${Math.min(y1, y2)}px`,
      left: `${Math.min(x1, x2)}px`,
      transformOrigin: "top left",
      backgroundColor: "red",
      height: "4px",
      zIndex: 1,
    };
  };

  if (!isVisible) {
    return null;
  }

  return <div style={getLineStyle()} />;
};

export default WinningLine;
