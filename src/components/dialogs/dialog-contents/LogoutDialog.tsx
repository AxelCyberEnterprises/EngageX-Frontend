import logoutIcon from "@/assets/images/svgs/logout-alert-icon.svg";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/authSlice";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { useDispatch } from "react-redux";

const LogoutConfirmation = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(closeDialog());
        dispatch(logout());
    };

    return (
        <div className="flex flex-col justify-between">
            <div className="space-y-2">
                <img src={logoutIcon} className="w-20" alt="logout alert icon" />
                <div className="space-y-2">
                    <h6 className="font-[Neue Montreal]">Logout</h6>
                    <p className="text-independence font-[montserrat] text-sm">
                        You are about to log out of your EngageX™ account. Are you sure you want to proceed?
                    </p>
                </div>
            </div>
            <div className="flex items-center mt-2 font-[Inter] gap-x-4">
                <Button
                    variant="outline"
                    className="text-gunmetal hover:text-gunmetal border-[#D5D7DA] font-normal w-full h-11"
                    onClick={() => dispatch(closeDialog())}
                >
                    Cancel
                </Button>
                <Button className="bg-[#DD524D] hover:bg-[#DD524D]/90 font-normal w-full h-11 transition-colors" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default LogoutConfirmation;
