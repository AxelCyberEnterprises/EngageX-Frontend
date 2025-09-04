import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "..";

interface DeleteModalProps {
    show: boolean;
    onClose: () => void;
    onDelete: () => void;
    title?: string;
    message?: string;
    isPending?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    show,
    onClose,
    onDelete,
    title = "Delete Item",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    isPending,
}) => {
    return (
        <Modal show={show} onClose={onClose} className="sm:w-full w-[90%] max-w-md mx-4 p-6">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px] font-medium text-gray-900">{title}</h2>
                    <button onClick={onClose} className="p-1 bg-white">
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <p className="text-gray-700 mb-6 text-wrap">{message}</p>

                <div className="flex gap-3 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={onDelete}
                        disabled={isPending}
                        className="py-3 bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isPending ? "Deleting" : "Delete"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
