import React, { useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickoutside';

interface AccessRestrictedModalProps {
  show: boolean;
  onClose: () => void;
}

const AccessRestrictedModal: React.FC<AccessRestrictedModalProps> = ({ show, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modalRef, modalRef, onClose);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-2xl w-[420px] max-w-full p-6 relative">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[#940803]" />
          </div>
        </div>
        <h2 className="text-2xl font-medium text-[#940803] text-center mb-4">
          Access Restricted
        </h2>
        <p className="text-[#474D63] text-center mb-8">
          The selected vertical is not available for your organization. To request access, please contact your organization admin.
        </p>
        <button 
          onClick={onClose}
          className="w-full bg-[#262B3A] text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { AccessRestrictedModal };