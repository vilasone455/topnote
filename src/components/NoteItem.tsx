import React , { FC, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { Note } from "../interface/Note";

export interface NoteProp{
    ele : Note
}

const NoteItem : FC<NoteProp> = ({ele}) => {

    const [title , settitle] = useState("")

    useEffect(() => {
        if(ele.url && ele.title === ""){
            settitle("Save in : " + new URL(ele.url).hostname)
        }
    } , [ele])

    const nav = useNavigate()
    return (
        <div className="border rounded-lg cursor-pointer " onClick={()=>nav("/form/"+ele.id)}>
            <div className="px-3 py-2 text-lg">
                {title}{ele.title}
            </div>
            <div className="p-3  ">
                {ele.content}
            </div>
        </div>
    )
}

export default NoteItem