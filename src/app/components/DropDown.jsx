"use client"


const DropDown = ({children,dropl,icon,title}) => {
  return (
    <div className={`dropdown ${dropl?"dropdown-end":""}`}>
        <div tabIndex={0} role="button" className="btn btn-ghost">
           <p> {title}</p>
            {icon}
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {children}
        </ul>
    </div>
  )
}

export default DropDown
