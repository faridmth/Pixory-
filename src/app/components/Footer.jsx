import { useState } from "react";
import ToolBtn from "./ToolBtn";
import { LuZoomIn } from "react-icons/lu";
import { LuZoomOut } from "react-icons/lu";

const LuZoomInIcon = <LuZoomIn size={16}/>
const LuZoomOutIcon = <LuZoomOut size={16}/>

const Footer = ({stages, scale, setScale,design_Height,design_Width,isZoomingRef}) => {
  if(stages.length === 0) return null;

  // function to recenter the main Rect :
  const recenterRect = (stage,newScale)=>{
    let mainRect = stage.findOne('.main-rect');
    if (mainRect) {
      const width = stage.width();
      const height = stage.height();
      
      mainRect.x((width / (2 * newScale)) - (design_Width / 2));
      mainRect.y((height / (2 * newScale)) - (design_Height / 2));
    }
    
    stage.draw();
  }
  
  const zoomIn = () => {
    isZoomingRef.current = true;
    
    const newScale = parseFloat((scale + 0.1).toFixed(2));
  
    stages.forEach(stage => {
      // Store the important element (mainRect)
      const mainRect = stage.findOne('.main-rect');
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
      
      // Add padding around the rect (20% of container)
      const paddingX = containerWidth * 0.03;
      const paddingY = containerHeight * 0.03;
      
      // Set stage size to fit content with padding
      const requiredWidth = scaledRectWidth + (paddingX * 2);
      const requiredHeight = scaledRectHeight + (paddingY * 2);
      
      stage.width(Math.max(containerWidth, requiredWidth));
      stage.height(Math.max(containerHeight, requiredHeight));

      
      // Recenter main rectangle
      recenterRect(stage, newScale);
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

      
      // Add padding around the rect (20% of container)
      const paddingX = containerWidth * 0.03;
      const paddingY = containerHeight * 0.03;
      
      // Set stage size to fit content with padding
      const requiredWidth = scaledRectWidth + (paddingX * 2);
      const requiredHeight = scaledRectHeight + (paddingY * 2);

      console.log(requiredHeight)
      console.log(containerHeight)
      console.log("-------------")
      
      stage.width(Math.max(containerWidth, requiredWidth));
      stage.height(Math.max(containerHeight, requiredHeight));
      container.style.height = `${Math.max(containerHeight, requiredHeight)}px`;      
      // Recenter main rectangle
      recenterRect(stage, newScale);
    });
    
    setScale(newScale);
    
    setTimeout(() => {
      isZoomingRef.current = false;
    }, 100);
  };
  
  return (
    <div className='w-[calc(100%-95px)] h-[40px] fixed bottom-[0px] 
     bg-white z-1 flex justify-end pr-8 items-center'>
        <ToolBtn tooltip="Zoom In" icon={LuZoomInIcon} tooltipDir="top" onClick={zoomIn}/>
        <p className='mx-2'>{(scale*100).toFixed(0)}%</p>
        <ToolBtn tooltip="Zoom Out" icon={LuZoomOutIcon} tooltipDir="top" onClick={zoomOut}/>
    </div>
  );
};
export default Footer
