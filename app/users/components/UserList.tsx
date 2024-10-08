"use client";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({
  items
}) => {
  return (
    <aside className="fixed inset-y-0 dark:bg-neutral-900 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-neutral-300 dark:border-neutral-700 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 pt-4 mb-4">
            People
          </div>
        </div>
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  )
}

export default UserList;