import ToolPanelModal from './ToolPanelModal'
import OptionCard from './OptionCard'
import { useGlobalState } from '@/app/store/store';
import { FaSquareFull } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidPolygon } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import ellipse from "../../../../public/ellipse.png"
import ring from "../../../../public/ring.png"

import Image from 'next/image';
import Konva from 'konva';
import { useKonvaSnapping } from '@/app/hooks/use-konva-snapping';

const ShapesSideBar = () => {
  const activeStage = useGlobalState((state) => state.activeStage);

  const {handleDragging,handleDragEnd}=useKonvaSnapping({
    guidelineColor:"purple",
    guidelineDash:true,
    snapToStageCenter:true,
    snapRange:5,
    guidelineThickness:0.5,
    showGuidelines:true,
    snapToShapes:true,
    snapToStageBorders:true
  })

  const handleSelect = (e)=>{
    let transformer = e.target.getLayer().findOne('.main-transformer')
     transformer.nodes([e.target])
     transformer.moveToTop()
    // layerRef.current.draw()    
  }

  // Track currently selected shape globally
  let selectedShape = null;

  const handleDeselect = (transformer) => {
    // Clear all nodes from the transformer
    transformer.nodes([]);
    // Optional: Redraw the layer
    // transformer.getLayer().draw();
  }

  const handleShapeClick = (shapeType) => {
    if (!activeStage) return;
    let mainRect = activeStage.findOne('.main-rect')
    const layer = mainRect.getLayer();

    let shape;

    switch (shapeType) {
      case 'rect':
        shape = new Konva.Rect({
          x: mainRect.x()-50 + mainRect.width() / 2,
          y: mainRect.y()-50 + mainRect.height() / 2,
          width: 100,
          height: 100,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 2,
          draggable:true,
        });
        
        // Rectangle already has a rectangular hit area by default
        break;
        
      case 'circle':
        shape = new Konva.Circle({
          x: activeStage.width() / 2,
          y: activeStage.height() / 2,
          radius: 50,
          fill: 'blue',
          stroke: 'black',
          strokeWidth: 2,
          draggable:true
        });
        
        // Add rectangular hit area for circle
        shape.hitFunc(function(context) {
          const radius = this.radius();
          const diameter = radius * 2;
          
          context.beginPath();
          context.rect(-radius, -radius, diameter, diameter);
          context.closePath();
          context.fillStrokeShape(this);
        });
        break;
        
      case 'line':
        shape = new Konva.Line({
          x: activeStage.width() / 2,
          y: activeStage.height() / 2,
          points: [0, 0, 250, 0],
          stroke: 'black',
          strokeWidth: 7,
          draggable:true
        });
        break;
        
      case 'polygon':
        shape = new Konva.RegularPolygon({
          x: activeStage.width() / 2,
          y: activeStage.height() / 2,
          sides: 6,
          radius: 70,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 4,
          draggable:true
        });
        
        // Add rectangular hit area for polygon
        shape.hitFunc(function(context) {
          const radius = this.radius();
          const diameter = radius * 2;
          
          context.beginPath();
          context.rect(-radius, -radius, diameter, diameter);
          context.closePath();
          context.fillStrokeShape(this);
        });
        break;
        
      case 'star':
        shape = new Konva.Star({
          x: activeStage.width() / 2,
          y: activeStage.height() / 2,
          numPoints: 5,
          innerRadius: 30,
          outerRadius: 70,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 4,
          draggable:true
        });
        
        // Add rectangular hit area for star
        shape.hitFunc(function(context) {
          const outerRadius = this.outerRadius();
          const diameter = outerRadius * 2;
          
          context.beginPath();
          context.rect(-outerRadius, -outerRadius, diameter, diameter);
          context.closePath();
          context.fillStrokeShape(this);
        });
        break;
        
      case 'arrow':
        shape = new Konva.Arrow({
          x: activeStage.width() / 4,
          y: activeStage.height() / 4,
          points: [0, 0, 100, 100],
          pointerLength: 20,
          pointerWidth: 20,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 7,
          draggable:true
        });
        break;
        
      case 'ellipse':
        shape = new Konva.Ellipse({
          x: activeStage.width() / 2,
          y: activeStage.height() / 2,
          radiusX: 100,
          radiusY: 50,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 4,
          draggable:true
        });
        
        // Add rectangular hit area for ellipse
        shape.hitFunc(function(context) {
          const radiusX = this.radiusX();
          const radiusY = this.radiusY();
          
          context.beginPath();
          context.rect(-radiusX, -radiusY, radiusX * 2, radiusY * 2);
          context.closePath();
          context.fillStrokeShape(this);
        });
        break;
        
      case 'ring':
        shape = new Konva.Ring({
          x: activeStage.width() / 2,
          y: activeStage.height() / 2,
          innerRadius: 70,
          outerRadius: 55,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 2,
          draggable:true
        });
        
        // Add rectangular hit area for ring
        shape.hitFunc(function(context) {
          const outerRadius = this.outerRadius();
          const diameter = outerRadius * 2;
          
          context.beginPath();
          context.rect(-outerRadius, -outerRadius, diameter, diameter);
          context.closePath();
          context.fillStrokeShape(this);
        });
        break;
        
      default:
        break;
    }

    if (shape) {
      // Add click handler with deselection logic
      shape.on('click', (e) => {
        const clickedShape = e.target;
        const transformer = clickedShape.getLayer().findOne('.main-transformer');
        
        // If clicking on a different shape than the currently selected one
        if (selectedShape && selectedShape !== clickedShape) {
          handleDeselect(transformer);
        }
        
        // Update the currently selected shape
        selectedShape = clickedShape;
        
        // Handle selection
        handleSelect(e);
        
        // Stop event propagation
        e.cancelBubble = true;
      });
      
      shape.on('dragmove', handleDragging);
      shape.on('dragend', handleDragEnd);
      layer.add(shape);
      layer.draw();
      
      // Add stage click handler for deselection if not already added
      if (!activeStage.eventListeners.click || activeStage.eventListeners.click.length === 0) {
        activeStage.on('click', (e) => {
          if (e.target === activeStage && selectedShape) {
            const transformer = selectedShape.getLayer().findOne('.main-transformer');
            handleDeselect(transformer);
            selectedShape = null;
          }
        });
      }
    }
  };

  return (
    <ToolPanelModal>
      <OptionCard title="Shapes" description="Add shapes to your canvas" />
      
      <div className='m-[10px] w-fit grid grid-cols-3'>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('rect')}>
          <FaSquareFull size={65} />
        </div>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('circle')}>
          <FaCircle size={65} />
        </div>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('line')}>
          <TfiLayoutLineSolid size={65} />
        </div>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('polygon')}>
          <BiSolidPolygon size={65} />
        </div>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('star')}>
          <IoIosStar size={65} />
        </div>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('arrow')}>
          <FaLongArrowAltRight size={65} />
        </div>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('ellipse')}>
          <Image src={ellipse} width={65} height={65} alt="" />
        </div>
        <div className='p-[10px] cursor-pointer' onClick={() => handleShapeClick('ring')}>
        <Image src={ring} width={65} height={65} alt="" />
        </div>        
      </div>
    </ToolPanelModal>
  );
};

export default ShapesSideBar;