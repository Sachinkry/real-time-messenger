"use client";

import { Input } from "@/components/ui/input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register, 
  errors
}) => {
  return (
    <div className="relative w-full ">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black  dark:text-neutral-100 font-light py-2 px-4 bg-neutral-100 dark:bg-neutral-800 w-full rounded-full focus:outline-none" 
        />
      {/* <Input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none" 
      ></Input> */}
    </div>
  );
}

export default MessageInput;