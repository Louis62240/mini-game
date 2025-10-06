import { useEffect, useState } from "react";
import GrassImgSrc from "../assets/grass/GRASS+.png";

const SPRITE_SIZE = 16;

export function useGrassTilesetInfo() {
  const [tilesetInfo, setTilesetInfo] = useState<{cols: number, rows: number, total: number}>({cols:0, rows:0, total:0});

  useEffect(() => {
    const img = new window.Image();
    img.src = GrassImgSrc;
    img.onload = () => {
      const cols = Math.floor(img.width / SPRITE_SIZE);
      const rows = Math.floor(img.height / SPRITE_SIZE);
      const total = cols * rows;
      setTilesetInfo({ cols, rows, total });
    };
  }, []);

  return tilesetInfo;
}
