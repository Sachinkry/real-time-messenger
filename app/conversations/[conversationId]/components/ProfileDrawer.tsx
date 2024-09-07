"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import AvatarComponent from "@/components/AvatarComponent";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, data }) => {
  const otherUser = useOtherUser(data);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active";
  }, [data]);

  return (
    <>
      {/* Fullscreen Gray Overlay */}
      {isConfirmModalOpen && (
        <ConfirmModal 
          isOpen={isConfirmModalOpen} 
          onClose={() => setIsConfirmModalOpen(false)} 
        />
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40 flex ">
          {/* Gray background overlay for the drawer */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={onClose}
          ></div>

          {/* Right-side drawer */}
          <div className="fixed top-0 right-0 w-screen max-w-md dark:bg-neutral-900 dark:border-l-[1px] dark:border-neutral-700 shadow-xl overflow items-end h-screen bg-white">
            <div className="p-6">
              <div className="flex justify-end align-baseline">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center">
                {data.isGroup ? (
                  <AvatarGroup users={data.users} />
                ) : (
                  <AvatarComponent user={otherUser} />
                )}
                <div className="mt-2 text-lg dark:text-neutral-300 font-medium">{title}</div>
                <div className="text-sm text-gray-500 dark:text-green-600">{statusText}</div>

                

                <div className="w-full mt-8">
                  <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                    {data.isGroup && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 dark:text-neutral-400">
                          Emails
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-neutral-500 sm:col-span-2">
                          {data.users.map(user => user.email).join(', ')}
                        </dd>
                      </div>
                    )}
                    {!data.isGroup && (
                      <>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-neutral-400">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-neutral-500">
                            {otherUser.email}
                          </dd>
                        </div>

                        <hr />

                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-neutral-400">
                            Joined
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-neutral-500">
                            <time dateTime={joinedDate}>{joinedDate}</time>
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>

              </div>
                <div className="flex  gap-10 mt-8 align-baseline  justify-center hover:text-red-500">
                  <div
                    className="flex flex-col items-center cursor-pointer hover:opacity-75 hover:text-red-500"
                    onClick={() => setIsConfirmModalOpen(true)}
                  >
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center ">
                      <IoTrash size={20} />
                    </div>
                    <span className="text-sm text-neutral-600 ">Delete Conversation</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDrawer;
