"use client"
import { CiFileOn } from "react-icons/ci";

const DropDownItem = ({title,description,onclick}) => {
  return (
    <li onClick={onclick}>
        <a className="flex ">
        <CiFileOn size={30}/>

            <p className="flex flex-col justify-start">
                {title}
                <span className="text-gray-400">{description}</span>
            </p>
        </a>
    </li>

  )
}

export default DropDownItem
