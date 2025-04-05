"use client"
import Logo from './Logo'
import DropDown from './DropDown'
import DropDownItem from './DropDownItem'
import VerticalSeparator from './VerticalSeparator'
import { HiOutlineCursorClick } from "react-icons/hi";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import ToolBtn from './ToolBtn'

const IoIosArrowDownIcon = <IoIosArrowDown/>
const GoDownloadIcon = <GoDownload/>
const BiRedoIcon = <BiRedo size={15}/>
const BiUndoIcon = <BiUndo size={15}/>
const HiOutlineCursorClickIcon = <HiOutlineCursorClick size={15}/>

const NavBar = () => {
    const handleOpen = () => {
        console.log("Open clicked!!!!");
    };
    
  return (
    <div className='w-full border-b 
     border-gray-300 p-4 flex  justify-between h-[69px] fixed top-0 
     bg-white z-10
     ' 
     >
      <div className='flex gap-3 items-center'>
        <Logo/>
        <DropDown icon={IoIosArrowDownIcon} title="File">
          <DropDownItem title="Open" description="open a JSON file" onclick={handleOpen} />
        </DropDown>
        <VerticalSeparator/>
        <ToolBtn tooltip="Select" icon={HiOutlineCursorClickIcon} onClick={()=>{}}/>
        <ToolBtn tooltip="Undo" icon={BiUndoIcon} onClick={()=>{}}/>
        <ToolBtn tooltip="Redo" icon={BiRedoIcon} onClick={()=>{}}/>
      </div>

      <DropDown dropl={true} icon={GoDownloadIcon} title="Export">
        <DropDownItem title="PNG" description="Best for sharing" onclick={handleOpen}/>
        <DropDownItem title="JPG" description="Best for printing" onclick={handleOpen}/>
        <DropDownItem title="JSON" description="Save for later editing" onclick={handleOpen}/>
      </DropDown>


    </div>
  )
}

export default NavBar
