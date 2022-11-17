import React , { FC } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid'

interface Prop{
    onClick : () => void
}

const Head : FC<Prop> = ({onClick}) => {
    return (
        <div className="p-3 border-b flex space-x-3">
            <Bars3Icon className="h-6 w-6 mt-1 ml-1 cursor-pointer" onClick={onClick} />
            <div className="ml-1 mt-0.5 text-lg font-medium">All notes</div>
        </div>
    )
}

export default Head