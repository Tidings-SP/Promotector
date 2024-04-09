'use client'
import React, { useState } from 'react';
import { AlignRight, ChevronsRightLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"


export default function NavBar() {
  const [isClick, setisClick] = useState(false);
  const toggleNavbar = () => {
    setisClick(!isClick);
  }
  return (
    <nav className=" w-full h-full" >
      <div className=" flex  sm:flex-row justify-between" >
        <h1 className=" m-4 text-xl">
          <a href="/">Promotector</a>
        </h1>
        <div>
          <ul className="hidden sm:flex flex-row">
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="">Dashboard</a></li>
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="">Scam Dectector</a></li>
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="">Admin panel</a></li>
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="">Reports</a></li>
          </ul>
        </div>
        <div className='hidden sm:flex justify-end'>
          <Button className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500'>Sign in</Button>
          <Button className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500 '>Sign up</Button>
        </div>
        <div>
          <Button className='sm:hidden m-4 ' onClick={toggleNavbar}>
            {isClick ? (<ChevronsRightLeft />) : (<AlignRight />)}
          </Button>
        </div>
      </div>
      {isClick && (
        <div className="sm:hidden gap-2">
          <div className=' m-4'>
            <ul className=" gap-4">
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="">Dashboard</a></li>
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="">Scam Dectector</a></li>
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="">Admin panel</a></li>
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="">Reports</a></li>
            </ul>
          </div>
          <div className='m-4' >
            <Button className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500'>Sign in</Button>
            <Button className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500 '>Sign up</Button>
          </div>
        </div>
      )}
    </nav>
  )
}