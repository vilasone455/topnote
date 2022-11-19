import { nanoid } from "nanoid";
import React, { FC, useEffect, useState } from "react";
import Noteweb from "../../components/NoteWeb";
import LocalNoteService from "../../services/notes/LocalNote";


const TestCom: FC = () => {

    const [allNotes, setAllnotes] = useState<any[]>([])

    useEffect(() => {

        document.addEventListener("topnote-create", function (e: any) {
            console.log(e); // Prints "Example of an event"
            if (e.detail.url) {
                console.log("have url goooo : ")
                onNoteCreate(e.detail.url)
            }
        });
        onLoad()
    }, [])

    const onNoteCreate = async (url: string) => {
        let add = {
            id: nanoid(8),
            title: "",
            content: `Note here...`,
            url: url,
            position: { x: 0, y: 100 },
            createDate : new Date()
        }
        console.log("body  : ")
        console.log(add)

        let service = new LocalNoteService()
        try {
            const notes = await service.getAllNotes()
            const res = await service.newNote(notes, add)
            console.log(res)
            let url = window.location.href
            let posNotes = notes.filter(n => n.position && n.url === url)
            setAllnotes([...posNotes, add])
        } catch (error) {
            console.log("error")
            console.log(error)
        }

    }

    const filterWeb = (url : string , notes : any[]) => {
        let posNotes = notes.filter(n => {
            let noteUrl = n.url || ""
            return n.position && noteUrl === url
        })
        return posNotes
    }


    const onLoad = async () => {
       
        // chrome.action.setBadgeText({text : "1"})
        let service = new LocalNoteService()
        let notes = await service.getAllNotes()
        console.log(notes)
        let url = window.location.href
        console.log(url)
        let posNotes = notes.filter(n => {
            let noteUrl = n.url || ""
            return n.position && noteUrl === url
        })
   
        console.log(posNotes)
        setAllnotes(posNotes)
        chrome.runtime.sendMessage(
            {action : "setbadge" , num : posNotes.length.toString()},
            function (response) {
                console.log("content script send : ")
                console.log(response);
            }
        );
        // chrome.runtime.sendMessage({action: "setnum" , num : posNotes.length.toString() });
        console.log("send num")

    }

    const removeElement = async (id: string) => {
        console.log("on delete : " + id)
        setTimeout(async () => {
            let service = new LocalNoteService()
            console.log(allNotes)
            let notes =  await service.getAllNotes()
            let res = await service.removeNote(notes, id)
            console.log(res)
            setAllnotes(filterWeb(window.location.href , res))
        }, 300);
     
    }

    const onChangeEvent = async (ele: any) => {
        let newEles = [...allNotes]
        let editEle = newEles.findIndex(n => n.id === ele.id)
        if (editEle !== -1) {
            newEles[editEle] = ele
            console.log(newEles)
            setAllnotes(newEles)
            let service = new LocalNoteService()
            let notes = await service.getAllNotes()
            service.editNote(notes, ele.id, ele)
        }
      
    }

    return (
        <div className="absolute">
            
            {allNotes.map(n => {
                return (
                    <Noteweb onRemoveElement={removeElement} onChange={onChangeEvent} ele={n} key={"note-" + n.id} />
                )
            })}
        </div>
    )
}

export default TestCom