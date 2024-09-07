"use client";

import { FullMessageType } from "@/app/types";
import AvatarComponent from "@/components/AvatarComponent";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  data,
  isLast
}) => {
  const session = useSession();
  const [isImageOpen, setIsImageOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
  .filter((user) => user.email !== data?.sender?.email)
  .map((user) => user.name)
  .join(', ');

  const container = clsx(
    "flex gap-3 p-4",
    isOwn && "justify-end"
  );

  const avatar = clsx(isOwn && "order-2");

  const body = clsx(
    "flex flex-col gap-2",
    isOwn && "items-end"
  );

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-neutral-200 dark:bg-violet-600/50",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  const openImageModal = () => setIsImageOpen(true);
  const closeImageModal = () => setIsImageOpen(false);
  
  return (
    <>
      <div className={container}>
        <div className={avatar}>
          <AvatarComponent user={data.sender} />
        </div>
        <div className={body}>
          <div className="flex items-center gap-1">
            <div className="text-sm text-gray-500">
              {data.sender.name}
            </div>
            <div className="text-xs text-gray-400">
              {format(new Date(data.createdAt), 'p')}
            </div>
          </div>
          <div className={message} >
            {data.image ? (
              <Image 
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              onClick={openImageModal}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
              />
            ): (
              <div >{data.body}</div>
            )}
          </div>
          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-xs font-light text-gray-500">
              {`Seen by ${seenList}`}
            </div>
          )}
        </div>
      </div>

      {data?.image && (
        <ImageModal 
          open={isImageOpen} 
          onOpenChange={setIsImageOpen}
          imageSrc={data.image} 
        />
      )}
    </>
  )
}

export default MessageBox;