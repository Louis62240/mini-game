import { useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export function usePlayerMovement(
  playerPos: Position,
  mapData: number[][],
  setPlayerPos: (pos: Position) => void
) {
  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    if (mapData[newY]?.[newX] !== 1 && mapData[newY]?.[newX] !== 2) {
      setPlayerPos({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const moves: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };
      const move = moves[e.key];
      if (move) movePlayer(...move);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerPos, mapData]);
}
