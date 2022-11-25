import React , { FC, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { Note } from "../interface/Note";

export interface NoteProp{
    ele : Note,
    bg : string
}


const NoteItem : FC<NoteProp> = ({ele , bg}) => {

    const [title , settitle] = useState("")
    const [color , setcolor] = useState("")

    useEffect(() => {
        // setcolor(getRandom())
    } , [])

    useEffect(() => {
        if(ele.url && ele.title === ""){
            settitle("Save in : " + new URL(ele.url).hostname)
        }
    } , [ele])

 

    const nav = useNavigate()
    return (
        <div className={`border-r h-44 overflow-hidden cursor-pointer ${bg} `} onClick={()=>nav("/form/"+ele.id)}>
            <div className="px-3 py-2 text-lg text-white font-medium">
                {title}{ele.title} 
            </div>
            <div className="px-3 py-1 break-words text-white  ">
                {ele.content}
            </div>
        </div>
    )
}

export default NoteItem