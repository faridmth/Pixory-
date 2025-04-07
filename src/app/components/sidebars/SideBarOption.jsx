import React from 'react'
import { useSideBar } from '../../store/side-bar'

const SideBarOption = ({icon,title}) => {

  const sideBarChoosedOption = useSideBar((state)=>state.sideBarChoosedOption)
  const setSideBarChoosedOption = useSideBar((state)=>state.setSideBarChoosedOption)
  const setToolPanelModalOpen = useSideBar((state)=>state.setToolPanelModalOpen)
  const handleClick =  ()=>{
    if(sideBarChoosedOption!==title){
      setSideBarChoosedOption(title)
      setToolPanelModalOpen(true)
    }
    if(sideBarChoosedOption===title){
      setSideBarChoosedOption("")
      setToolPanelModalOpen(false)

    }
  }
  return (
    <div 
        className={`btn btn-ghost  rounded-none flex flex-col
           justify-center items-center py-9 ${sideBarChoosedOption===title?"bg-[#e2e2e2]":""}`} 
        data-tip={title}
        onClick={handleClick}
    >
        <div>
            {icon}
        </div>
        <p className='text-[12px]'>{title}</p>
    </div>

  )
}

export default SideBarOption
