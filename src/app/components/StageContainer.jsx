"use client";
import { useEffect, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
const design_Width = 1900;
const design_Height = 500;

const StageContainer = ({stageSetter,stages,isZoomingRef,setScale}) => {
  const stageRef = useRef(null);
  const contRef = useRef(null);

    // Handler for window resize events
    const handleWindowResize = () => {
      if (!contRef.current || stages.length === 0) return;
      // Reset stage dimensions first
      stages.forEach(stage => {
        stage.width(0);
        stage.height(0);
      });
      
      // Get current container dimensions
      let width = contRef.current.offsetWidth;
      let height = contRef.current.offsetHeight;
      
      applyStageChanges(width, height);
    };
    
    // Handler for ResizeObserver events
    const handleContainerResize = (entries) => {
  
      if (!contRef.current || stages.length === 0|| isZoomingRef.current) return;
      //console.log('hiiiii')
      // Reset stage dimensions first
      stages.forEach(stage => {
        stage.width(0);
        stage.height(0);
      });
      
      // Get width from entries as specified
      let width = entries[0].borderBoxSize[0].inlineSize;
      let height = contRef.current.offsetHeight;
          
      applyStageChanges(width, height);
    };
    
    //  function to apply changes to stages
    const applyStageChanges = (width, height) => {
      // Calculate scale based on design dimensions
      let newScale = Math.min(
        ((width * 0.8) / design_Width),
        ((height * 0.8) / design_Height)
      );    
      // Round to 2 decimal places
      newScale = parseFloat(newScale.toFixed(2));
      
      stages.forEach(stage => {
        //stage.setContainer(contRef.current);
        stage.width(width);
        stage.height(height);
        
        let mainRect = stage.findOne('.main-rect');
        stage.scaleX(newScale);
        stage.scaleY(newScale);
        
        // Center the main rectangle
        mainRect.x((width / (2 * newScale)) - (design_Width / 2));
        mainRect.y((height / (2 * newScale)) - (design_Height / 2));
        
        stage.draw();
      });
      
      setScale(newScale);
    };
  
    useEffect(() => {
      // Set up ResizeObserver for the container
      const resizeObserver = new ResizeObserver(entries => {
        handleContainerResize(entries);
      });
      
      if (contRef.current) {
        resizeObserver.observe(contRef.current);
      }
      
      window.addEventListener('resize', handleWindowResize);
      
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', handleWindowResize);
      };
    }, [stages]); 

  useEffect(()=>{
    if (stageRef.current) {
      stageSetter(pre=>[...pre,stageRef.current])
      stageRef.current.setContainer(contRef.current);

    }
  },[])

  return (
      <div className={`h-[calc(100vh-69px-80px)] min-h-[400px] w-full bg-red-800 `} ref={contRef}>
        <Stage ref={stageRef}>
          <Layer>
            <Rect
              width={design_Width}
              height={design_Height}
              fill={"white"}
              stroke={"black"}
              name="main-rect"
            />
          </Layer>
        </Stage>
      </div>
  );
};

export default StageContainer;
