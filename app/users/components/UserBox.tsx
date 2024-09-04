"use client";
import AvatarComponent from "@/components/AvatarComponent";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({data}) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios.post('/api/conversations', {
      userId: data.id
    })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`)
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div onClick={handleClick} className="w-full relative flex items-center space-x-3 bg-white dark:bg-neutral-900 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-950 rounded-lg transition cursor-pointer">
      <AvatarComponent user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900 dark:text-neutral-300">
              {data?.name?.split(' ')[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBox;