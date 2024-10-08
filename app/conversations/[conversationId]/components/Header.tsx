"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import AvatarComponent from "@/components/AvatarComponent";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation  & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({
  conversation
}) => {

  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  let isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if(conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? 'Active': 'Offline';
  }, [conversation, isActive]);


  return (
    <>
      <div className="bg-white dark:bg-neutral-900 w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link href="/conversations" className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <AvatarComponent user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="">
              {conversation.name || otherUser.name} 
            </div>
            <div className={`text-xs font-light ${isActive ? "text-green-400": 'text-gray-500 dark:text-neutral-400'}`}>
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal 
          size={24}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </div>
      <ProfileDrawer 
         data={conversation}
         isOpen={drawerOpen}
         onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}

export default Header;