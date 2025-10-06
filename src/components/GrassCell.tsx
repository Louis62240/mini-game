
import GrassImgSrc from "../assets/grass/GRASS+.png";
import WaterImgSrc from "../assets/water/water.jpg";
import { useGrassTilesetInfo } from "../hooks/useGrassTilesetInfo";

const TILE_SIZE = 64;

export default function GrassCell({ style, showWaterBackground }: { style?: React.CSSProperties, showWaterBackground?: boolean }) {
  const tilesetInfo = useGrassTilesetInfo();
  const col = 0;
  const row = 0;

  if (tilesetInfo.cols === 0 || tilesetInfo.rows === 0) {
    // Image pas encore chargée, on affiche rien ou un fond neutre
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
      />
    );
  }

  const backgroundWidth = tilesetInfo.cols * TILE_SIZE;
  const backgroundHeight = Math.ceil(tilesetInfo.total / tilesetInfo.cols) * TILE_SIZE;
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
