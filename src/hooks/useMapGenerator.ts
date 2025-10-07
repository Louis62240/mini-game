import { useState } from "react";
import { mapData as initialMapData } from "../data/map";

export function useMapGenerator() {
  const [mapData, setMapData] = useState(initialMapData);

  const regenerateMap = () => {
    const height = initialMapData.length;
    const width = initialMapData[0].length;

    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    const maxRadius = Math.min(centerX, centerY) - 1;

    const newMap = Array.from({ length: height }, (_, y) =>
      Array.from({ length: width }, (_, x) => {
        if (y === 0 || y === height - 1 || x === 0 || x === width - 1) return 2;

        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const edgeFactor = (distance / maxRadius) ** 2;
        const rand = Math.random();

        if (rand < edgeFactor * 0.7) return 2;
        if (rand < 0.2) return 1;
        return 0;
      })
    );

    setMapData(newMap);
    return { newMap, centerX, centerY };
  };

  return { mapData, setMapData, regenerateMap };
}
