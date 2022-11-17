import React , { FC } from "react";
import {useNavigate} from "react-router-dom"

export interface NoteProp{
    id : string
    title : string
    content : string
    color : string//
}

const NoteItem : FC<NoteProp> = ({id , title , content}) => {
    const nav = useNavigate()
    return (
        <div className="border rounded-lg cursor-pointer " onClick={()=>nav("/form/"+id)}>
            <div className="px-3 py-2 text-lg">
                {title}
            </div>
            <div className="p-3  ">
                {content}
            </div>
        </div>
    )
}

export default NoteItem