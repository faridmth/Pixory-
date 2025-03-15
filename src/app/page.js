import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import StageContainer from "./components/StageContainer";
import ToolBar from "./components/ToolBar";

export default function Home() {
  return (
   <div className="w-full">
      <NavBar/>
      <div className="flex absolute h-[calc(100%-69px)] w-full">
        <SideBar/>
        <main className=" w-full ">
          <ToolBar/>
        <StageContainer/>
        </main>
      </div>
   </div>
  );
}
