import { useEffect, useState } from "react";
import GrassImgSrc from "../assets/grass/GRASS+.png";
import WaterImgSrc from "../assets/water/water.jpg";

const SPRITE_SIZE = 16; // taille originale d'une tuile
const TILE_SIZE = 64;   // taille d'affichage dans le jeu

export default function GrassCell({ style, showWaterBackground }: { style?: React.CSSProperties, showWaterBackground?: boolean }) {
  const [tilesetInfo, setTilesetInfo] = useState<{cols: number, rows: number, total: number}>({cols:0, rows:0, total:0});

  // Charger l'image pour récupérer ses dimensions
  useEffect(() => {
    const img = new Image();
    img.src = GrassImgSrc;
    img.onload = () => {
      const cols = Math.floor(img.width / SPRITE_SIZE);
      const rows = Math.floor(img.height / SPRITE_SIZE);
      const total = cols * rows;
      setTilesetInfo({ cols, rows, total });
      console.log("Tileset info:", { width: img.width, height: img.height, cols, rows, total });
    };
  }, []);

  // Variante aléatoire stable
  // const variant = useMemo(() => Math.floor(Math.random() * (tilesetInfo.total || 1)), [tilesetInfo.total]);

  // const col = variant % (tilesetInfo.cols || 1);
  // const row = Math.floor(variant / (tilesetInfo.cols || 1));
const col = 0;
  const row = 0;
  // Calcul zoomé
  const backgroundWidth = (tilesetInfo.cols || 1) * TILE_SIZE;
  const backgroundHeight = Math.ceil((tilesetInfo.total || 1) / (tilesetInfo.cols || 1)) * TILE_SIZE;
  const backgroundPosition = `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`;

  return (
    <div
      className="cell grass"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        position: "relative",
        background: "none",
        ...style,
      }}
    >
      {showWaterBackground && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${WaterImgSrc})`,
            backgroundSize: "cover",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
          backgroundImage: `url(${GrassImgSrc})`,
          backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
          backgroundPosition,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          borderRadius: style?.borderRadius,
        }}
      />
    </div>
  );
}
