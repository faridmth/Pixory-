"use client";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const design_Width = 500;
const design_Height = 500;

const StageContainer = () => {
  const stageContainerRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (stageContainerRef.current) {
        setStageSize({
          width: stageContainerRef.current.offsetWidth,
          height: stageContainerRef.current.offsetHeight, // Get the parent's height
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const scale = Math.min(1,stageSize.width / design_Width, stageSize.height / design_Height);
  console.log(scale)
  return (
    <div
      ref={stageContainerRef}
      className="w-full h-[650px] flex justify-center items-center overflow-hidden"
    >
      <Stage width={stageSize.width} height={stageSize.height}  scaleX={scale} scaleY={scale}>
        <Layer>
          <Rect
            x={(stageSize.width - design_Width *scale) / 2}
            y={(stageSize.height - design_Height*scale) / 2}
            width={design_Width}
            height={design_Height}
            fill={"white"}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default StageContainer;
