import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useActiveList from "@/app/hooks/useActiveList";


// New Avatar component
const AvatarComponent: React.FC<{ user: User }> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  const userNameInitialLetter = user.name?.charAt(0).toUpperCase();

  return (
    <div className="relative cursor-pointer hover:opacity-75 transition ">
      <Avatar>
        <AvatarImage src={user.image! || "/images/man-avatar.jpg"} />
        <AvatarFallback className="bg-purple-800 text-white">{userNameInitialLetter}</AvatarFallback>
      </Avatar>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white dark:ring-neutral-800 top-0 right-0 h-2 w-2 " />
      )}
    </div>
  );
};

export default AvatarComponent;