import { X } from "lucide-react";
import Modal from "..";
import noAccessAlertCircle from "../../../assets/images/svgs/alert-circle-no-access.svg";

interface NoAccessCoachingModalProps {
    show: boolean;
    onClose: () => void;
}

const NoAccessCoachingModal: React.FC<NoAccessCoachingModalProps> = ({ show, onClose }) => {
    return (
        <Modal show={show} onClose={onClose} className="sm:w-full w-[90%] max-w-md mx-4 p-6">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 ">
                    <div className="p-5 bg-[#F88A87] rounded-full">
                        <img src={noAccessAlertCircle} alt="alert circle" />
                    </div>
                    <button onClick={onClose} className="p-1 bg-white">
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <div>
                    <h2 className="text-[24px] font-medium text-gray-900">No Access</h2>
                    <p className="text-[18px] font-medium text-gray-600 mb-5 mt-3">
                        Your Organization does not have access to this feature.
                    </p>
                    <button onClick={onClose} className=" w-full py-4 px-6 rounded-lg ">
                        Back
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default NoAccessCoachingModal;
