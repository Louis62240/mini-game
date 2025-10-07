import { useState } from "react";
import WaterCell from "./WaterCell";
import GrassCell from "./GrassCell";
import { usePlayerMovement } from "../hooks/usePlayerMovement";
import { useMapGenerator } from "../hooks/useMapGenerator";
import { getGrassBorderRadius } from "../utils/mapUtils";
import { useGrassTilesetInfo } from "../hooks/useGrassTilesetInfo";

interface Position {
  x: number;
  y: number;
}

export default function GameMap() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 2, y: 2 });
  const { mapData, setMapData, regenerateMap } = useMapGenerator();
const tilesetInfo = useGrassTilesetInfo();
  usePlayerMovement(playerPos, mapData, setPlayerPos);

  const handleRegenerate = () => {
    const { newMap, centerX, centerY } = regenerateMap();
    setPlayerPos({ x: centerX, y: centerY });
    setMapData(newMap);
  };

  return (
    <div className="flex items-start gap-8">
      <div className="flex-1">
        <div className="game-map">
          {mapData.map((row, y) => (
            <div key={y} className="row">
              {row.map((cell, x) => {
                if (cell === 2) return <WaterCell key={x} />;
                const borderRadius = getGrassBorderRadius(x, y, mapData);
                const showWaterBackground = borderRadius !== "0px 0px 0px 0px";
                return (
                  <GrassCell tilesetInfo={tilesetInfo}
                    key={x}
                    style={{ borderRadius }}
                    showWaterBackground={showWaterBackground}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-[180px] flex flex-col items-end mt-8">
        <button
          onClick={handleRegenerate}
          className="px-7 py-3 text-lg font-medium bg-blue-600 text-white rounded-md shadow hover:bg-blue-800 transition"
        >
          Régénérer la map
        </button>
      </div>
    </div>
  );
}
