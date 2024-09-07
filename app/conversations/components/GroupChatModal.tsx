"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Input  from "@/app/components/inputs/Input";
import { Label } from "@/components/ui/label";
import Select from "@/app/components/inputs/Select";


interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members') || [];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // setIsLoading(true);
    

    console.log("GROUP DATA--------------", data)
    axios.post(`/api/conversations`, {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error("Something went wrong!"))
    .finally(() => setIsLoading(false))

  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a group chat</DialogTitle>
          <DialogDescription>
            Crate a chat with more than 2 people.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid gap-4 py-4">
          <Input 
            register={register} 
            label="Name" disabled={isLoading} 
            id="name"
            required
            errors={errors} 
          />
          <Select 
              disabled={isLoading}
              label="Members"
              options={users.map((user) => ({
                value: user.id,
                label: user.name || "Unknown User"
              }))}
              onChange={(values) => {
                const selectedMembers = values.map((id) => {
                  const user = users.find(user => user.id === id.toString());
                  return user ? { value: user.id, label: user.name } : null;
                }).filter(Boolean); // Filter out any null values
                // console.log("lollllllllllllllll", selectedMembers)
                setSelectedValues(Array.from(new Set(values.map(value => value.toString()))));
                setValue('members', selectedMembers, {
                  shouldValidate: true
                });
              }}
              value={selectedValues}
            />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>Create Group</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GroupChatModal;