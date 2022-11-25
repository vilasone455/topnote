import { PlusIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect } from "react";
import Head from "../../../components/Head";
import NoteItem from "../../../components/NoteItem";
import useNoteStore from "../../../store/note";
import useShareState from "../../../store/share";
import { useNavigate } from "react-router-dom"
import useCategoryStore from "../../../store/category";

const colors : string[] = ["bg-red-400" , "bg-blue-400" , "bg-green-400" , "bg-yellow-400" , "bg-indigo-500" , "bg-purple-400" , "bg-gray-400"]


const Homepage: FC = () => {

    const { items , fetchItem } = useNoteStore()
    const { setSidebar } = useShareState()
    const { fetchItem: fetchCategory } = useCategoryStore()
    const nav = useNavigate()

    useEffect(() => {
        fetchItem()
        fetchCategory()
    }, [])

    return (
        <div className="h-screen">
            <Head title="All notes" onClick={() => setSidebar(true)} />
            <div className="grid grid-cols-2 gap-0">
                {items.map(n => {
                    return (<NoteItem bg={colors[Math.floor(Math.random()*colors.length)]} ele={n} />)
                })}
            </div>

            <div className="absolute bottom-[-275px] right-4 bg-blue-800 p-1 rounded-full" onClick={() => nav("form/add")}>
                <PlusIcon className='w-8 h-8 text-white' />
            </div>

        </div>
    )
}

export default Homepage