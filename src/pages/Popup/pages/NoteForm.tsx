import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import useNoteStore from "../../../store/note";
import { useNavigate, useParams } from "react-router-dom"

const NoteForm: FC = () => {

    const [form , setform] = useState({
        id : "",
        title : "",
        content : "",
        categoryId : "",
        createDate : new Date()
    })
  
    const { items, addItem, editItem , deleteItem } = useNoteStore()
    const nav = useNavigate()
    let { id } = useParams();

    useEffect(() => {
        if (id !== "add" && id !== "") {
            let item = items.find(i => i.id === id)
            if (item) {
                setform(item)
            }
        }
    }, [])

    const onSave = () => {
        let trueId = id || ""
        if (trueId === "add") {
            let body = {
                ...form,
                id: nanoid(8),
                createDate : new Date(),
            }
            addItem(body)
            nav("/")
        } else if (trueId !== "") {
            let body = {...form}
            editItem(trueId, body)
            nav("/")
        }
    }

    const onRemove = () => {
        deleteItem(id||"")
        nav("/")
    }

    return (
        <div className="p-3">
            <div className="flex justify-between">
                <div className="p-1.5 rounded-md bg-gray-200 " onClick={() => nav("/")}>
                    <ArrowSmallLeftIcon className="h-8 w-8" />
                </div>
                <div className="flex space-x-2">
                    {id !== "add" && id !== "" ?  <button onClick={onRemove}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button> : "" }
                   
                    <button onClick={onSave} className="px-3 py-1.5 rounded-md bg-gray-200 text-medium text-lg">Save</button>
                </div>

            </div>

            <div className="mt-3">
                <input value={form.title} onChange={e => setform({...form , title : e.target.value})} className="focus:outline-none px-4 py-2 text-lg text-gray-800" placeholder="Title" />
                <div className="mt-2">
                    <textarea value={form.content} onChange={e => setform({...form , content : e.target.value})} rows={4} className="w-full focus:outline-none px-4 py-2 text-lg text-gray-800" placeholder="Content" />
                </div>

            </div>
        </div>
    )
}

export default NoteForm