"use client"
import { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import StageContainer from "./components/StageContainer";
import ToolBar from "./components/ToolBar";
import Footer from "./components/Footer";

const design_Width = 1900;
const design_Height = 500;

export default function Home() {
  const [stages, setStages] = useState([]);
  const [scale, setScale] = useState(1);
  const stagesContRef = useRef();
  const isZoomingRef = useRef(false);
  const scrollBarRef = useRef(false);
  const scrollContentRef = useRef(false);
  const [contentWidth, setContentWidth] = useState(2000);

  useEffect(()=>{
    if (!stagesContRef.current) return;
    const paddingX = 80;
    setContentWidth(stagesContRef.current.scrollWidth+paddingX)

  },[scale])



  useEffect(() => {
    if (!scrollBarRef.current || !stagesContRef.current || !scrollContentRef.current) return;
    
    // Sync scrollbar -> container
    const handleScrollBarScroll = () => {
      if (isZoomingRef.current) return; // Don't sync during zooming
      stagesContRef.current.scrollLeft = scrollBarRef.current.scrollLeft;
    };
    
    // Sync container -> scrollbar
    const handleContainerScroll = () => {
      if (isZoomingRef.current) return; // Don't sync during zooming
      scrollBarRef.current.scrollLeft = stagesContRef.current.scrollLeft;
    };
    
    scrollBarRef.current.addEventListener('scroll', handleScrollBarScroll);
    stagesContRef.current.addEventListener('scroll', handleContainerScroll);
    
    return () => {
      window.removeEventListener('resize', updateScrollWidth);
      scrollBarRef.current?.removeEventListener('scroll', handleScrollBarScroll);
      stagesContRef.current?.removeEventListener('scroll', handleContainerScroll);
    };
  }, []);


  



  return (
    <div className="w-full">
      <NavBar/> 
      <div className="w-full flex absolute h-[calc(100%-69px)]">
        <SideBar/>
        <main className="min-w-[calc(100%-95px)] ml-[95px] mt-[69px]
         h-full  ">
          <ToolBar/>
          <div
            className=" stages-container   
             flex flex-col  min-h-[calc(100%-80px)] 
             overflow-auto mt-[40px] pb-[50px] gap-2 w-full "
            ref={stagesContRef}
          >      
            <StageContainer stageSetter={setStages} stages={stages} isZoomingRef={isZoomingRef} setScale ={setScale}/>         
            <StageContainer stageSetter={setStages} stages={stages} isZoomingRef={isZoomingRef} setScale ={setScale}/>         
          </div>
          <div className="w-full h-[15px] bg-white fixed bottom-[40px] overflow-auto " ref={scrollBarRef}>
            <div className="h-[5px]"style={{ width: `${contentWidth}px` }}  ref={scrollContentRef}></div> 
          </div>    

          <Footer 
          stages={stages}
           scale={scale} 
           setScale={setScale}
           design_Height={design_Height}
           design_Width={design_Width}
           isZoomingRef={isZoomingRef}
           setContentWidth={setContentWidth}

           />
        </main>
      </div>
    </div>
  );
}