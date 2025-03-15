"use client"
import { CiImageOn } from "react-icons/ci";
import SideBarOption from "./SideBarOption";
import { RxText } from "react-icons/rx";
import { LuShapes } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { LuBot } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";






const CiImageOnIcon = <CiImageOn size={22}/>
const RxTextOnIcon = <RxText size={22}/>
const LuShapesIcon = <LuShapes size={22}/>
const GoPencilIcon = <GoPencil size={22}/>
const LuBotIcon = <LuBot size={22}/>
const IoSettingsOutlineIcon = <IoSettingsOutline size={22}/>
const SideBar = () => {
  return (
    <aside className='h-full w-[95px]  border-r 
     border-gray-300'>
      <SideBarOption title="Image" icon={CiImageOnIcon} onclick={()=>{}}/>
      <SideBarOption title="Text" icon={RxTextOnIcon} onclick={()=>{}}/>
      <SideBarOption title="Shapes" icon={LuShapesIcon} onclick={()=>{}}/>
      <SideBarOption title="Draw" icon={GoPencilIcon} onclick={()=>{}}/>
      <SideBarOption title="Ai" icon={LuBotIcon} onclick={()=>{}}/>
      <SideBarOption title="Settings" icon={IoSettingsOutlineIcon} onclick={()=>{}}/>
    </aside>
  )
}

export default SideBar
