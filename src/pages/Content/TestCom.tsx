import { nanoid } from "nanoid";
import React  ,{ FC, useEffect, useState } from "react";
import Noteweb from "../../components/NoteWeb";
import LocalNoteService from "../../services/notes/LocalNote";


const TestCom : FC = () => {

    const [allNotes , setAllnotes] = useState<any[]>([])

    useEffect(() => {
        document.addEventListener("topnote-create", function(e:any) {
            console.log(e); // Prints "Example of an event"
            if(e.detail.url){
                console.log("have url goooo : ")
                onNoteCreate(e.detail.url)
            }
        });
        onLoad()
    } , [])

    const onNoteCreate = async (url : string) => {
        let add = {
            id : nanoid(8),
            title : "",
            content : `Hello`,
            url : url,
            position : {x : 0 , y : 100}
        }
        console.log("body  : ")
        console.log(add)

        let service = new LocalNoteService()
        try {
            const notes = await service.getAllNotes()
            const res = await service.newNote(notes , add)
            console.log(res)
            let url = window.location.href
            let posNotes = notes.filter(n=> n.position && n.url === url)
            setAllnotes([...posNotes , add])
        } catch (error) {
            console.log("error")
            console.log(error)
        }
    
    }


    const onLoad = async () => {
        console.log(window.location.hostname)
        let service = new LocalNoteService()
        let notes = await service.getAllNotes()
        console.log(notes)
        let url = window.location.href
        console.log(url)
        let posNotes = notes.filter(n=>{
            let noteUrl = n.url || ""
            return n.position && noteUrl === url
        })
        console.log(posNotes)
        setAllnotes(posNotes)
    }

    const removeElement = async (id : string) => {
        console.log("on delete : " + id)
        let service = new LocalNoteService()
        let res = await service.removeNote(allNotes , id)
        console.log(res)
    }

    return (
        <div className="absolute">
            {allNotes.map(n=>{
                return (
                    <Noteweb onRemoveElement={removeElement} ele={n} key={"note-"+n.id} />
                )
            })}
        </div>
    )
}

export default TestCom