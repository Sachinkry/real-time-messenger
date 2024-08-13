import { Icon } from "lucide-react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> =({
    icon: Icon,
    onClick
}) => {
    return (
        <button
           type="button"
           onClick={onClick}
           className="inline-flex ring-1 w-full justify-center rounded-md  px-4 py-2 focus:outline-offset-0 ring-neutral-400 dark:ring-neutral-700 p-1 hover:ring-blue-500 dark:hover:ring-neutral-700 dark:hover:bg-neutral-800 hover:cursor-pointer"
        >
            <Icon />
        </button>
    )
}

export default AuthSocialButton;