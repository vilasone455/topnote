import React, { FC, useEffect, useState } from "react";
import Draggable, { ControlPosition, DraggableData, DraggableEvent } from "react-draggable";
import LocalNoteService from "../services/notes/LocalNote";
import ContentEditable from 'react-contenteditable'
import ContentEditableWithRef from "./ContentEditable";
import { TrashIcon } from "@heroicons/react/24/outline";

interface NoteElement {
    id: string
    title: string
    content: string
    position: ControlPosition
}

interface Prop {
    ele: NoteElement
    onRemoveElement: (id: string) => void
    onChange : (body : NoteElement) => void
}

const Noteweb: FC<Prop> = ({ ele, onRemoveElement , onChange}) => {

    const [element, setelement] = useState(ele)

    // const [pos, setpos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        console.log(`initializing interval`);
        const interval = setInterval(() => {
            onUpdateEle();
        }, 2000);

        return () => {
            console.log(`clearing interval`);
            clearInterval(interval);
        };
    }, []); // has no dependency - this will be called on-component-mount

    const onUpdateEle = () => {
        // let eleProp = {...ele}
        let posProp = ele.position
        let posEle = element.position
 
        if ((posEle.x === posProp.x && posEle.y === posProp.y) === false) {
            console.log("not equal same x y")
            let body = { ...element }
            let service = new LocalNoteService()
            service.getAllNotes().then(async notes => {
                await service.editNote(notes, body.id, body)
                console.log("edit success")
            }).catch(err => {
                console.log("erro")
                console.log(err)
            })
        }
        // if(eleProp !== element){


        // }
    }


    useEffect(() => {
        setelement(ele)
    }, [ele])

    useEffect(() => {
        console.log("use effect ele")
        // setpos(ele.position)
    }, [ele.position])

    const onSave = () => {
        console.log('save');
        onChange(element)
      };

    const onControlledDragStop = (e: DraggableEvent, position: DraggableData) => {
        let newEle = { ...element, position: {x : position.x , y : position.y} }
        console.log(newEle)
        // setelement()
        // onControlledDrag(e, position);
        onChange(newEle)
        // this.onStop();
        // let service = new LocalNoteService()

        // let body = {
        //     ...element,
        //     position: position
        // }
        // service.getAllNotes().then(async notes => {
        //     await service.editNote(notes, body.id, body)
        //     console.log("edit success")
        // }).catch(err => {
        //     console.log("erro")
        //     console.log(err)
        // })

    };

    return (
        <Draggable position={element.position} onStop={onControlledDragStop}  >
            <div
                className="absolute z-[99999] w-36 rounded-md bg-gray-600 p-2"
            >
                <ContentEditableWithRef onSave={onSave} value={element.content} onChange={e => setelement({ ...element, content: e })} />
                <div className="p-0.5  flex justify-end ">
                    <button onClick={() => onRemoveElement(element.id)} >
                        <svg

                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>

                </div>
            </div>

        </Draggable>
    )
}

export default Noteweb