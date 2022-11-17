import { PlusIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect } from "react";
import Head from "../../../components/Head";
import NoteItem from "../../../components/NoteItem";
import useNoteStore from "../../../store/note";
import useShareState from "../../../store/share";
import {useNavigate} from "react-router-dom"

const Homepage: FC = () => {

    const { items, fetchItem } = useNoteStore()
    const { setSidebar } = useShareState()
    const nav = useNavigate()

    useEffect(() => {
        fetchItem()
      },[])


    return (
        <div>
            <Head onClick={() => setSidebar(true)} />
            <div className='flex flex-col space-y-2 p-2'>
                {items.map(n => {
                    return (<NoteItem {...n} />)
                })}
            </div>
            <div className="absolute bottom-[-165px] right-2 bg-blue-800 p-1 rounded-full" onClick={() => nav("form/add")}>
          <PlusIcon className='w-8 h-8 text-white' />
        </div>
        </div>
    )
}

export default Homepage