"use client"
import { CiImageOn } from "react-icons/ci";
import SideBarOption from "./SideBarOption";
import { RxText } from "react-icons/rx";
import { LuShapes } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { LuBot } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import ImagesSideBar from "./ImagesSideBar";
import TextSideBar from "./TextSideBar";
import { useSideBar } from "@/app/store/side-bar";
import ShapesSideBar from "./ShapesSideBar";
import DrawSideBar from "./DrawSideBar";
import AiSideBar from "./AiSideBar";
import SettingsSideBar from "./SettingsSideBar";
const CiImageOnIcon = <CiImageOn size={22}/>
const RxTextOnIcon = <RxText size={22}/>
const LuShapesIcon = <LuShapes size={22}/>
const GoPencilIcon = <GoPencil size={22}/>
const LuBotIcon = <LuBot size={22}/>
const IoSettingsOutlineIcon = <IoSettingsOutline size={22}/>

const SideBar = () => {

  const sideBarChoosedOption = useSideBar((state)=>state.sideBarChoosedOption)

  return (
    <aside className='h-full w-fit  border-r 
     border-gray-300 fixed top-[69px]
     bg-white z-2 flex '>
      <div className=" w-[95px]">
        <SideBarOption title="Image" icon={CiImageOnIcon} />
        <SideBarOption title="Text" icon={RxTextOnIcon} />
        <SideBarOption title="Shapes" icon={LuShapesIcon} />
        <SideBarOption title="Draw" icon={GoPencilIcon} />
        <SideBarOption title="Ai" icon={LuBotIcon} />
        <SideBarOption title="Settings" icon={IoSettingsOutlineIcon} />
      </div>
      {sideBarChoosedOption==="Image"&&<ImagesSideBar/>}
      {sideBarChoosedOption==="Text"&&<TextSideBar/>}
      {sideBarChoosedOption==="Shapes"&&<ShapesSideBar/>}
      {sideBarChoosedOption==="Draw"&&<DrawSideBar/>}
      {sideBarChoosedOption==="Ai"&&<AiSideBar/>}
      {sideBarChoosedOption==="Settings"&&<SettingsSideBar/>}
      
    </aside>
  )
}

export default SideBar
