import { useClickOutside } from '@/hooks/useClickoutside';
import React, { useRef } from 'react'

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: any
  className: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modalRef, modalRef, onClose);
  if (!show) return null;
  return (
    <div className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black/70`}>
      <div ref={modalRef} className={`sm:rounded-[20px] rounded-lg bg-white max-h-[calc(100dvh-80px)] scrollbar-hide overflow-scroll flex flex-col items-center ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Modal
