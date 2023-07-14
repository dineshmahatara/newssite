import {Bars3Icon} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from 'react'
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

function Header() {
  return ( <header>
    <div className="grid grid-cols-3 p-10 items-center">
    <Bars3Icon className="h-8 w-8 cursor-pointer"/>
    <Link href="/" prefetch={false}>
  <h1 className="font-serif text-2xl text-center">
    <span className="hidden sm:inline">Jhimruk Innovative Technology Center</span>
    <span className="sm:hidden">JITC</span>
  </h1>
</Link>

    { /**Darkmode */}
    <div className="flex items-center
    justify-end space-x-0">
    <button className="hidden 
                md:inline bg-slate-900 
                text-white 
                px-4 
                lg:px-8 
                py-2 lg:py-4
                rounded-full dark:bg-slate-800
                ">
        Subscibe Now
    </button>
    </div>
    </div>
    {/** Nav Link */}
    <NavLinks/>
    {/** Search Box */}
    <SearchBox/>
    </header>
  )
}

export default Header