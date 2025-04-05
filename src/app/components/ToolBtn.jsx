import React from 'react'

const ToolBtn = ({tooltip,icon,onClick,tooltipDir}) => {
  return (
    <div 
        className={`btn btn-ghost !p-2 tooltip ${tooltipDir==="top"?"tooltip-top":"tooltip-bottom"} `}
        data-tip={tooltip}
        onClick={onClick}
    >
       {icon}
    </div>
  )
}

export default ToolBtn
