'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { DarkModeToggle } from "@/components/darkModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { User } from "@prisma/client";

interface DesktopSidebarProps {
  currentUser?: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const userNameInitialLetter = currentUser?.name?.charAt(0).toUpperCase();

  console.log({currentUser});
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul className="flex flex-col items-center space-y-1 " role="list">
          {routes.map((item) => (
            <DesktopItem 
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            /> 
          ))}
          <DarkModeToggle />
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div className="relative cursor-pointer hover:opacity-75 transition ">
          {/* <Avatar user={currentUser} /> */}
          <Avatar >
            <AvatarImage src={currentUser?.image!} />
            <AvatarFallback className="bg-purple-800 text-white">{userNameInitialLetter}</AvatarFallback>
            
          </Avatar>
          <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 " />
        </div>
      </nav>
    </div>
  )
}

export default DesktopSidebar;

