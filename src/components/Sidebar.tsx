import { BookmarkIcon , Cog8ToothIcon , StarIcon , HomeIcon} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import { Link , useNavigate } from "react-router-dom"
import useCategoryStore from "../store/category";

interface Prop {
    isOpen: boolean
    onClose: () => void
}

interface ItemSidebarProp {
    id: string
    name: string
    svg: any
    onClick ?: () => void
}

const ItemSidebar: FC<ItemSidebarProp> = ({ svg, name, id , onClick }) => {
    return (
        <li key={id} onClick={onClick}>
            <div
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                {svg}
                <span className="ml-3">{name}</span>
            </div>
        </li>
    )
}

const Sidebar: FC<Prop> = ({ isOpen, onClose }) => {

    const { items: categorys } = useCategoryStore()
    const nav = useNavigate()

    return (
        <div>
            {isOpen && <div
                id="drawer-navigation"
                className="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-64 border-r dark:bg-gray-800"
                tabIndex={-1}
                aria-labelledby="drawer-navigation-label"
            >
                <h5
                    id="drawer-navigation-label"
                    className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
                >
                    Menu
                </h5>
                <button
                    type="button"
                    onClick={onClose}
                    data-drawer-dismiss="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2">
                        <ItemSidebar onClick={()=>nav("/")} name="All note" svg={<HomeIcon className="w-6 h-6" />} id="all-note" />
                        <ItemSidebar name="Favorite" svg={<StarIcon className="w-6 h-6" />} id={"favorite"} />
                        {/* <ItemSidebar name="Tags" svg={<StarIcon className="w-6 h-6" />} id={"tags"} /> */}
                        <li className="bg-gray-200 p-2 flex justify-between rounded">
                            <div className="ml-2 text-base font-normal text-gray-900">Tags</div>
                            <Link to="/category" onClick={() => onClose()} className="text-gray-500 mt-1 mr-1">
                                <PencilIcon className="w-4 h-4" />
                            </Link>
                        </li>
                        {categorys.map(c => {
                            return (<li key={"category-" + c.id} className="cursor-pointer">
                                <div
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <BookmarkIcon className={"w-6 h-6 text-"} />

                                    <span className="ml-3">{c.title}</span>
                                </div>
                            </li>)
                        })}
                        <ItemSidebar name="Setting" svg={<Cog8ToothIcon className="w-6 h-6" />} id="setting" />
                    </ul>
                </div>
            </div>}

        </div>
    )
}

export default Sidebar