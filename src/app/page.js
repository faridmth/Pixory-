"use client"
import { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import StageContainer from "./components/StageContainer";
import ToolBar from "./components/ToolBar";

const design_Width = 100;
const design_Height = 100;

export default function Home() {
  const [stages,setStages]=useState([])
  const stagesContRef = useRef()

    useEffect(() => {

      const resizeObserver = new ResizeObserver(entries => {
        console.log(entries[0])
        if (stagesContRef.current) {
          stages.forEach(stage=>{
            stage.width(0)
            stage.height(0)
          })
          let width = entries[0].borderBoxSize[0].inlineSize
          let height = stagesContRef.current.offsetHeight
          let scale = Math.min(
            (width*0.8) / (design_Width),
            (height*0.8) / (design_Height)
          )  
          
          stages.forEach(stage=>{
            stage.setContainer(stagesContRef.current)
            stage.width(width)
            stage.height(height)
            let mainRect = stage.findOne('.main-rect')
            stage.scaleX(scale)
            stage.scaleY(scale)
            mainRect.x((width/(2*scale))-(design_Width/2))
            mainRect.y((height/(2*scale))-(design_Height/2))
            stage.draw()

          })
        }

      });
      
      if (stagesContRef.current) {
        resizeObserver.observe(stagesContRef.current);
      }
      
      return () => resizeObserver.disconnect();
    }, [stages]);
  return (
   <div className="w-full">
      <NavBar/> 
      <div className="w-full flex absolute h-[calc(100%-69px)] ">
        <SideBar/>
        <main className=" w-[calc(100%-95px)] bg-red-50">
          <ToolBar/>
              <div
                className="w-full stages-container
                 min-h-[calc(100%-40px)] flex flex-col  bg-red-800"
                ref={stagesContRef}
              >          
                <StageContainer stageSetter={setStages} />         
                <StageContainer stageSetter={setStages} />         
                <StageContainer stageSetter={setStages} />         
        </div>
        </main>
      </div>
   </div>
  );
}     
