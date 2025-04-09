import { useState } from "react";
import ToolBtn from "./ToolBtn";
import { LuZoomIn } from "react-icons/lu";
import { LuZoomOut } from "react-icons/lu";
import { useGlobalState } from "../store/store";

const LuZoomInIcon = <LuZoomIn size={16}/>
const LuZoomOutIcon = <LuZoomOut size={16}/>

const Footer = ({stages, scale, setScale,design_Height,design_Width,isZoomingRef}) => {
 
  const zoomIn = () => {
    isZoomingRef.current = true;
    
    const newScale = parseFloat((scale + 0.1).toFixed(2));
  
    stages.forEach(stage => {
      // Store the important element (mainRect)
      const mainRect = stage.findOne('.main-rect');
      if(mainRect===undefined) return
      const mainRectOriginalWidth = mainRect.width();
      const mainRectOriginalHeight = mainRect.height();
      
      // Get container and fully reset it
      const container = stage.getContainer();

      // FULL RESET - Clear any previous dimensions completely
      stage.scale({ x: 1, y: 1 }); // Reset to base scale
      
      // Reset container to fill parent
      container.style.width = '100%';
      container.style.height = 'calc(100% - 80px)';
  
      
      // Get container dimensions after reset
      const containerWidth = container.clientWidth-1;
      const containerHeight = container.clientHeight;
      
      // Now apply new scale
      stage.scale({ x: newScale, y: newScale });
      
      // Calculate scaled dimensions of mainRect
      const scaledRectWidth = mainRectOriginalWidth * newScale;
      const scaledRectHeight = mainRectOriginalHeight * newScale;
      
      // Add padding around the rect 
      const paddingX = containerWidth * 0.05;
      const paddingY = containerHeight * 0.05;
      
      // Set stage size to fit content with padding
      const requiredWidth = scaledRectWidth + (paddingX * 2);
      const requiredHeight = scaledRectHeight + (paddingY * 2);

      
      stage.width(Math.max(containerWidth, requiredWidth));
      stage.height(Math.max(containerHeight, requiredHeight));
        // Calculate center position of the stage/container
        const stageCenter = {
          x: stage.width() / 2,
          y: stage.height() / 2
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

      
      // Recenter main rectangle
      //recenterRect(stage, newScale);
    });
    
    setScale(newScale);
    
    setTimeout(() => {
      isZoomingRef.current = false;
    }, 100);
  };
  
  
  const zoomOut = () => {
    isZoomingRef.current = true;
    
    if (scale <= 0.1) return;
    
    const newScale = parseFloat((scale - 0.1).toFixed(2));
    
    stages.forEach(stage => {
      // Store the important element (mainRect)
      const mainRect = stage.findOne('.main-rect');
      if(mainRect===undefined) return
      const mainRectOriginalWidth = mainRect.width();
      const mainRectOriginalHeight = mainRect.height();
      
      // Get container and fully reset it
      const container = stage.getContainer();
      
      // FULL RESET - Clear any previous dimensions completely
      stage.scale({ x: 1, y: 1 }); // Reset to base scale
      
      // Reset container to fill parent
      container.style.width = '100%';
      container.style.height = 'calc(100vh - 69px - 80px)';      
      // Get container dimensions after reset
      const containerWidth = container.clientWidth-1;
      const containerHeight = container.clientHeight;
      
      // Now apply new scale
      stage.scale({ x: newScale, y: newScale });
      
      // Calculate scaled dimensions of mainRect
      const scaledRectWidth = mainRectOriginalWidth * newScale;
      const scaledRectHeight = mainRectOriginalHeight * newScale;    

      
      // Add padding around the rect 
      const paddingX = containerWidth * 0.05;
      const paddingY = containerHeight * 0.05;
      
      // Set stage size to fit content with padding
      const requiredWidth = scaledRectWidth + (paddingX * 2);
      const requiredHeight = scaledRectHeight + (paddingY * 2);

      
      stage.width(Math.max(containerWidth, requiredWidth));
      stage.height(Math.max(containerHeight, requiredHeight));
      container.style.height = `${Math.max(containerHeight, requiredHeight)}px`;  
      
      
      // Calculate center position of the stage/container
      const stageCenter = {
        x: stage.width() / 2,
        y: stage.height() / 2
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
    });
    
    setScale(newScale);
    
    setTimeout(() => {
      isZoomingRef.current = false;
    }, 100);
  };

  const toolPanelModalOpen = useGlobalState((state)=>state.toolPanelModalOpen)
  
  
  return (
    <div className='w-[calc(100%-395px)] h-[40px] fixed bottom-[0px] 
     bg-white z-1 flex justify-end pr-8 items-center'
     style={{ 
      width: `calc(100% - ${toolPanelModalOpen ? 395 : 95}px)`,
    }}

     >
        <ToolBtn tooltip="Zoom In" icon={LuZoomInIcon} tooltipDir="top" onClick={zoomIn}/>
        <p className='mx-2'>{(scale*100).toFixed(0)}%</p>
        <ToolBtn tooltip="Zoom Out" icon={LuZoomOutIcon} tooltipDir="top" onClick={zoomOut}/>
    </div>
  );
};
export default Footer
