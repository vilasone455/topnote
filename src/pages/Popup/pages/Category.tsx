import React , { FC, useEffect, useState } from "react";
import useCategoryStore from "../../../store/category";
import {nanoid} from "nanoid"
import {PencilIcon , TrashIcon , ServerIcon, PlusIcon}  from "@heroicons/react/24/outline"
import Head from "../../../components/Head";
import useShareState from "../../../store/share";

const Category : FC = () => {

    const {items , addItem , deleteItem , editItem , fetchItem} = useCategoryStore()
    const {setSidebar} = useShareState()

    const [categoryForm , setcategoryForm] = useState({
        id : "",
        title : ""
    })

    useEffect(() => {
        fetchItem()
    } , [])

    const newCategory = () => {
        let newItem = {
            id : nanoid(8),
            title : `category-${items.length+1}`
        }
        addItem(newItem)
        //wait until element is render
        setcategoryForm(newItem)
        setTimeout(() => {
            let ele : any = document.getElementById("cat-input-"+newItem.id)
            if(ele){
                ele.select()
            }
        }, 100);
    }

    const onSave = (item : any) => {
        if(item.id === categoryForm.id){
            console.log("save Id : ")
            console.log(item)
            editItem(categoryForm.id , categoryForm)
            setcategoryForm({id : "" , title : ""})
        }else{
            setcategoryForm(item)
            setTimeout(() => {
                let ele : any = document.getElementById("cat-input-"+item.id)
                if(ele){
                    ele.focus()
                }
            }, 100);
        }
    }

    const onRemoveCategory = (id : string) => {
        console.log("delete : " + id)
        deleteItem(id)
    }

    return (
        <div className="flex flex-col space-y-2">
            <Head title="Category" onClick={()=>setSidebar(true)} onRightClick={newCategory} rightIcon={<PlusIcon className="w-6 h-6 pt-0.5" />} />
            <div className="flex flex-col space-y-3 px-3 py-1">
                {items.map(item=>{
                    return (
                        <div className="flex justify-between border-b p-1">
                            <div className="text-base">{categoryForm.id === item.id ? <input 
                            className="outline-0" id={"cat-input-"+item.id} value={categoryForm.title} onChange={e=>setcategoryForm({...categoryForm , title : e.target.value})} /> : <>{item.title}</>}</div>
                            <div className="flex space-x-2">
                                <button className="w-5 h-5 " onClick={()=>onSave(item)}>{categoryForm.id === item.id ? <ServerIcon/> : <PencilIcon/>}
                                </button>
                                <button onClick={()=>onRemoveCategory(item.id)} className="h-5 w-5"><TrashIcon/></button>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Category