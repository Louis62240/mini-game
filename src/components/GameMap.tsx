import { useEffect, useState } from "react";
import WaterCell from "./WaterCell";
import GrassCell from "./GrassCell";

interface Position {
  x: number;
  y: number;
}

// Import initial map
import { mapData as initialMapData } from "../data/map";

export default function GameMap() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 2, y: 2 });
  const [mapData, setMapData] = useState<number[][]>(initialMapData);

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

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
  }, [playerPos, mapData]);

 const regenerateMap = () => {
  const height = initialMapData.length;
  const width = initialMapData[0].length;

  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  const maxRadius = Math.min(centerX, centerY) - 1; // rayon max de l'île

  const newMap = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => {
      // Bordure fixe d'eau
      if (y === 0 || y === height - 1 || x === 0 || x === width - 1) return 2;

      // Distance au centre
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Probabilité d'être de l'eau proche des bords (effet d'île)
      const edgeFactor = (distance / maxRadius) ** 2; // plus on est loin, plus c'est probable
      const rand = Math.random();

      if (rand < edgeFactor * 0.7) return 2; // eau proche des bords
      if (rand < 0.2) return 1; // obstacle aléatoire
      return 0; // herbe
    })
  );

  setMapData(newMap);
  setPlayerPos({ x: centerX, y: centerY });
};




  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
      <div style={{ flex: '1' }}>
        <div className="game-map">
          {mapData.map((row, y) => (
            <div key={y} className="row">
              {row.map((cell, x) => {
                if (cell === 2) return <WaterCell key={x} />;
                const borderRadius = getGrassBorderRadius(x, y, mapData);
                const showWaterBackground = borderRadius !== "0px 0px 0px 0px";
                return <GrassCell key={x} style={{ borderRadius }} showWaterBackground={showWaterBackground} />;
              })}
            </div>
          ))}
        </div>
      </div>
      <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '32px' }}>
        <button 
          onClick={regenerateMap}
          style={{
            padding: '12px 28px',
            fontSize: '16px',
            fontWeight: 500,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            boxShadow: '0 1px 4px #0001',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#1746a0')}
          onMouseOut={e => (e.currentTarget.style.background = '#2563eb')}
        >
          Régénérer la map
        </button>
      </div>
    </div>
  );
}

function getGrassBorderRadius(x: number, y: number, map: number[][]) {
  const RADIUS = 16;
  let topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0;

  if (
    map[y - 1]?.[x] === 2 &&
    map[y]?.[x - 1] === 2 &&
    map[y - 1]?.[x - 1] === 2 &&
    map[y - 1]?.[x] !== 0 &&
    map[y]?.[x - 1] !== 0
  ) topLeft = RADIUS;

  if (
    map[y - 1]?.[x] === 2 &&
    map[y]?.[x + 1] === 2 &&
    map[y - 1]?.[x + 1] === 2 &&
    map[y - 1]?.[x] !== 0 &&
    map[y]?.[x + 1] !== 0
  ) topRight = RADIUS;

  if (
    map[y + 1]?.[x] === 2 &&
    map[y]?.[x + 1] === 2 &&
    map[y + 1]?.[x + 1] === 2 &&
    map[y + 1]?.[x] !== 0 &&
    map[y]?.[x + 1] !== 0
  ) bottomRight = RADIUS;

  if (
    map[y + 1]?.[x] === 2 &&
    map[y]?.[x - 1] === 2 &&
    map[y + 1]?.[x - 1] === 2 &&
    map[y + 1]?.[x] !== 0 &&
    map[y]?.[x - 1] !== 0
  ) bottomLeft = RADIUS;

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
}
