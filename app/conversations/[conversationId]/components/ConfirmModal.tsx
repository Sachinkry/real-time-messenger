"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button"

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const {conversationId}  = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose();
      router.push('/conversations');
      router.refresh();
    })
    .catch(() => toast.error("Something went wrong!!"))
    .finally(() => setIsLoading(false))

  }, [conversationId, router, onClose])
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center w-full dark:bg-black/80 dark:bg-opacity-70 ">
      <div className="bg-white p-6 rounded-sm shadow-xl max-w-sm dark:bg-neutral-900 dark:ring-1 dark:ring-neutral-700 ">
        <p className="text-black mb-4 text-sm dark:text-neutral-300">Are you sure you want to delete this conversation? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button
          variant="destructive"
            disabled={isLoading}
            
            onClick={() => {
              onDelete();
              console.log('Confirmed delete action', conversationId);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="default"
            className="bg-gray-600 dark:bg-neutral-600 dark:text-white hover:dark:bg-neutral-700"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;