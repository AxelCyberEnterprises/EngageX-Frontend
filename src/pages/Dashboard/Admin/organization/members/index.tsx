import AddMembers from "@/components/dialogs/dialog-contents/AddMembers";
import MembersTable from "@/components/tables/members-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { Download } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Members = () => {
    const dispatch = useDispatch();

    return (
        <section className="px-4 py-3 flex flex-col gap-y-6">
            <div className="flex items-center justify-between">
                <h6>Members</h6>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="text-primary-blue">
                        <Download />
                        Export
                    </Button>
                    <Link
                        to="./set-training-goal"
                        className={cn(buttonVariants({ variant: "outline" }), "text-primary-blue border-primary-blue")}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.1492 6.69879L15.535 6.31212C15.8422 6.0048 16.2589 5.83211 16.6935 5.83203C17.128 5.83195 17.5448 6.0045 17.8521 6.31171C18.1594 6.61892 18.3321 7.03563 18.3322 7.47016C18.3323 7.9047 18.1597 8.32147 17.8525 8.62879L17.4667 9.01546M15.1492 6.69879C15.1492 6.69879 15.1975 7.51879 15.9217 8.24296C16.6458 8.96712 17.4667 9.01546 17.4667 9.01546M15.1492 6.69879L11.5992 10.2488C11.3575 10.4888 11.2375 10.6096 11.1342 10.7421C11.0119 10.8988 10.9081 11.0671 10.8225 11.2471C10.75 11.3988 10.6967 11.5596 10.5892 11.8821L10.245 12.9155L10.1333 13.2496M17.4667 9.01546L13.9167 12.5655C13.675 12.8071 13.555 12.9271 13.4225 13.0305C13.2658 13.1527 13.0975 13.2566 12.9175 13.3421C12.7658 13.4146 12.605 13.468 12.2825 13.5755L11.2492 13.9196L10.915 14.0313M10.1333 13.2496L10.0225 13.5846C9.99668 13.6624 9.993 13.7458 10.0119 13.8255C10.0307 13.9052 10.0714 13.9782 10.1294 14.0361C10.1873 14.094 10.2602 14.1347 10.3399 14.1536C10.4197 14.1725 10.5031 14.1688 10.5808 14.143L10.915 14.0313M10.1333 13.2496L10.915 14.0313"
                                stroke="#252A39"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M6.66667 10.8327H8.75M6.66667 7.49935H12.0833M6.66667 14.166H7.91667M16.5233 2.64268C15.5475 1.66602 13.9758 1.66602 10.8333 1.66602H9.16667C6.02417 1.66602 4.4525 1.66602 3.47667 2.64268C2.50083 3.61935 2.5 5.19018 2.5 8.33268V11.666C2.5 14.8085 2.5 16.3802 3.47667 17.356C4.45333 18.3318 6.02417 18.3327 9.16667 18.3327H10.8333C13.9758 18.3327 15.5475 18.3327 16.5233 17.356C17.31 16.5702 17.4625 15.3993 17.4925 13.3327"
                                stroke="#252A39"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        Set Training Goal
                    </Link>
                    <Button
                        className="bg-[#64BA9F] hover:bg-[#64BA9F]/90"
                        onClick={() =>
                            dispatch(
                                openDialog({
                                    key: "add-members",
                                    children: <AddMembers />,
                                }),
                            )
                        }
                    >
                        Add member
                    </Button>
                </div>
            </div>
            <MembersTable />
        </section>
    );
};

export default Members;
