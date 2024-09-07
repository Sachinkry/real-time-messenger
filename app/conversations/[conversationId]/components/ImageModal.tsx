import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ImageModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  imageSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onOpenChange, imageSrc }) => {
  const closeImageModal = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image</DialogTitle>
          <DialogClose onClick={closeImageModal} />
        </DialogHeader>
        <div className="flex justify-center items-center">
          <Image
            alt="Full Image"
            src={imageSrc}
            height={500}
            width={500}
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;