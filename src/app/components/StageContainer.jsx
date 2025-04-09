"use client";
import { useEffect, useRef } from "react";
import { Stage, Layer, Rect,Transformer } from "react-konva";
import { useGlobalState } from "../store/store";
import { useKonvaSnapping } from "../hooks/use-konva-snapping";

const design_Width = 1900;
const design_Height = 500;

const StageContainer = ({setStages,stages,isZoomingRef,setScale}) => {
  const stageRef = useRef(null);
  const contRef = useRef(null);
  const transformerRef= useRef(null)

  const activeStage = useGlobalState((state=>state.activeStage))
  const setActiveStage = useGlobalState((state=>state.setActiveStage))

  const {handleResizing,handleResizeEnd}= useKonvaSnapping({
    guidelineColor:"purple",
    guidelineDash:true,
    snapToStageCenter:true,
    snapRange:5,
    guidelineThickness:0.5,
    showGuidelines:true,
    snapToShapes:true,
    snapToStageBorders:true
  })

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
        // Set the stage dimensions to match container
        stage.width(width);
        stage.height(height);
        
        // Calculate center position of the stage/container
        const stageCenter = {
          x: width / 2,
          y: height / 2
        };
        
        // Apply the scale first (this is important)
        stage.scale({ x: newScale, y: newScale });
        
        // Position the stage to center the content
        // This centers the entire stage content without specifically targeting any rectangle
        const newPos = {
          x: stageCenter.x - (design_Width * newScale / 2),
          y: stageCenter.y - (design_Height * newScale / 2)
        };
        
        stage.position(newPos);
        stage.draw();
      });
      
      setScale(newScale);
    };
  
    useEffect(() => {
      if(stages.length ===0 ) return

        stageRef.current.getLayers().forEach(layer => {
          let mainRect = layer.findOne('.main-rect')
          // reset the transformer by clicking on the work space
          let transformer = layer.findOne('.main-transformer')
          mainRect.on('click', () => {
            transformer.nodes([])
          });

     
          // Set clip function to use the main rectangle dimensions
          layer.clip({
            x: mainRect.x(),
            y: mainRect.y(),
            width: mainRect.width(),
            height: mainRect.height()
          });
        });
    
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
      setStages(prev => [...prev, stageRef.current]);
      stageRef.current.setContainer(contRef.current);
    }
  },[])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            // Reset all stage rectangles to black
            stages.forEach((stage) => {
              const rect = stage.findOne('.main-rect');
              if (rect) rect.stroke('black');
            });
  
            // Set the active one to red
            if (stageRef.current) {
              setActiveStage(stageRef.current)
              const activeRect = stageRef.current.findOne('.main-rect');
              if (activeRect) activeRect.stroke('#11a7fe');
            }
            // Redraw all stages
            stages.forEach((stage) => stage.draw());
          }
        });
      },
      {
        threshold: [0.7],
      }
    );
  
    if (contRef.current) {
      observer.observe(contRef.current);
    }
  
    return () => {
      if (contRef.current) {
        observer.unobserve(contRef.current);
      }
    };
  }, [stages]);


      

  return (
      <div className={`h-[calc(100vh-69px-80px)] min-h-[400px] w-full bg-red-800`} ref={contRef}>
        <Stage ref={stageRef}>
          <Layer>
            <Rect
              width={design_Width}
              height={design_Height}
              fill={"white"}
              stroke={"black"}
              name="main-rect"
            />
          <Transformer
              ref={transformerRef}
              flipEnabled={false}
              keepRatio={true}
              zIndex={888}
              onTransform={handleResizing}
              onTransformEnd={handleResizeEnd}
              name="main-transformer"
            />
          </Layer>
        </Stage>
      </div>
  );
};

export default StageContainer;
