"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import AvatarComponent from "@/components/AvatarComponent";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType,
  selected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data, 
  selected
})  => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  if(otherUser) console.log(otherUser);
  const userInitialName = otherUser?.name?.split(" ")[0]

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if(!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];  // users who have seen the last message

    if(!userEmail) {
      return false;
    }

    return seenArray
    .filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if(lastMessage?.image) {
      return "Sent an image";
    }

    if(lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div onClick={handleClick} className={clsx(`
      w-full relative flex items-center space-x-3  hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3 dark:hover:bg-neutral-950`,
      selected ? "bg-neutral-100  dark:bg-neutral-950": "bg-white dark:bg-neutral-900"
      )}>
        {data.isGroup ? (
          <AvatarGroup users={data.users}/>
        ): (
          <AvatarComponent user={otherUser} />
        )}
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-md font-medium text-gray-900 dark:text-neutral-300 ">
                {data.name || userInitialName}
              </p>
              {lastMessage?.createdAt && (
                <p className="text-xs text-gray-400 dark:text-neutral-500 font-light">
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
            <p className={clsx(
              `text-xs  truncate`,
              hasSeen ? "text-gray-600/70 dark:text-neutral-200/30" : !lastMessage?.body ? "text-gray-900 dark:text-neutral-400 font-medium" : "text-green-400 dark:text-green-600"
            )}>
              {lastMessageText}
            </p>
          </div>
        </div>
    </div>
  )
}

export default ConversationBox;