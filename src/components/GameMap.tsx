import { useEffect, useState } from "react";
import { mapData } from "../data/map";
import WaterCell from "./WaterCell";
import GrassCell from "./GrassCell";
interface Position {
  x: number;
  y: number;
}

export default function GameMap() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 2, y: 2 });

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Empêche de traverser les murs ET l'eau
    if (mapData[newY][newX] !== 1 && mapData[newY][newX] !== 2) {
      setPlayerPos({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") movePlayer(0, -1);
      if (e.key === "ArrowDown") movePlayer(0, 1);
      if (e.key === "ArrowLeft") movePlayer(-1, 0);
      if (e.key === "ArrowRight") movePlayer(1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerPos]);

  return (
    <div className="game-map">
     {mapData.map((row, y) => (
  <div key={y} className="row">
    {row.map((cell, x) => {
      if (cell === 2) return <WaterCell key={x} />;
      // Pour tout ce qui n'est pas de l'eau
      const borderRadius = getGrassBorderRadius(x, y, mapData);
      const showWaterBackground = borderRadius !== "0px 0px 0px 0px";
      return <GrassCell key={x} style={{ borderRadius }} showWaterBackground={showWaterBackground} />;
    })}
  </div>
))}

    </div>
  );
}

function getGrassBorderRadius(x: number, y: number, map: number[][]) {
  const RADIUS = 16;
  let topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0;

  // Coin supérieur gauche
  if (
    map[y - 1]?.[x] === 2 &&
    map[y]?.[x - 1] === 2 &&
    map[y - 1]?.[x - 1] === 2 &&
    map[y - 1]?.[x] !== 0 &&
    map[y]?.[x - 1] !== 0
  ) {
    topLeft = RADIUS;
  }

  // Coin supérieur droit
  if (
    map[y - 1]?.[x] === 2 &&
    map[y]?.[x + 1] === 2 &&
    map[y - 1]?.[x + 1] === 2 &&
    map[y - 1]?.[x] !== 0 &&
    map[y]?.[x + 1] !== 0
  ) {
    topRight = RADIUS;
  }

  // Coin inférieur droit
  if (
    map[y + 1]?.[x] === 2 &&
    map[y]?.[x + 1] === 2 &&
    map[y + 1]?.[x + 1] === 2 &&
    map[y + 1]?.[x] !== 0 &&
    map[y]?.[x + 1] !== 0
  ) {
    bottomRight = RADIUS;
  }

  // Coin inférieur gauche
  if (
    map[y + 1]?.[x] === 2 &&
    map[y]?.[x - 1] === 2 &&
    map[y + 1]?.[x - 1] === 2 &&
    map[y + 1]?.[x] !== 0 &&
    map[y]?.[x - 1] !== 0
  ) {
    bottomLeft = RADIUS;
  }

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
}

