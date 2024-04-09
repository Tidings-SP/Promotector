'use client'
import React, { useEffect, useState } from 'react';
import { AlignRight, ChevronsRightLeft, ShieldCheck } from 'lucide-react';
import { } from "../ui/button";
import { Button } from "@/components/ui/button"
import { ModeToggle } from '../ui/mode-toggle';
import { cn } from '@/lib/utils';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/app/authentication/firebase';
import { useRouter } from 'next/navigation';


export default function NavBar() {
  const [isClick, setisClick] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();
  const toggleNavbar = () => {
    setisClick(!isClick);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <nav className=" w-full h-full" >
      <div className=" flex  sm:flex-row justify-between" >
        <h1 className=" m-4 text-xl">
          <a href="/" className='flex gap-2'> <ShieldCheck /> Promotector</a>
        </h1>
        <div>
          <ul className="hidden sm:flex flex-row">
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="/">Home</a></li>
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="/detector">Scam Detector</a></li>
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="">Admin panel</a></li>
            <li className=" m-3 text-lg hover:border-b-2 border-blue-500"><a href="">Reports</a></li>
          </ul>
        </div>
        <div className='hidden sm:flex justify-end items-center'>
          <div className={`${cn({ hidden: isUserLoggedIn })}`}>


            <Button onClick={() => router.push('/authentication/signin')} className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500'>Sign in</Button>
            <Button onClick={() => router.push('/authentication/register')} className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500 '>Sign up</Button>
          </div>
          <Button onClick={() => signOut(auth)} className={`${cn({ hidden: !isUserLoggedIn }, 'm-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500')}`}>LogOut</Button>
          <ModeToggle />
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
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="/">Home</a></li>
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="/detector">Scam Detector</a></li>
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="">Admin panel</a></li>
              <li className=" m-4 text-lg hover:border-b-2 border-blue-500"><a href="">Reports</a></li>
            </ul>
          </div>

          <div className='m-4'>
            <div className={`${cn({ hidden: isUserLoggedIn })}`}>


              <Button onClick={() => router.push('/authentication/signin')} className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500'>Sign in</Button>
              <Button onClick={() => router.push('/authentication/register')} className='m-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500 '>Sign up</Button>
            </div>
            <Button onClick={() => signOut(auth)} className={`${cn({ hidden: !isUserLoggedIn }, 'm-2 hover:bg-white hover:ring-1 hover:text-black hover:ring-blue-500')}`}>LogOut</Button>
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}