"use client";
import { useEffect, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
const design_Width = 100;
const design_Height = 100;

const StageContainer = ({stageSetter}) => {
  const stageRef = useRef(null);

  useEffect(()=>{
    if (stageRef.current) {
      stageSetter(pre=>[...pre,stageRef.current])
    }
  },[])

  return (
      <Stage ref={stageRef}>
        <Layer>
          <Rect
            width={design_Width}
            height={design_Height}
            fill={"white"}
            name="main-rect"
          />

        </Layer>
      </Stage>
  );
};

export default StageContainer;
