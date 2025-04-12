import React, { useMemo } from "react";
import ShadLineChart from "../../../components/dashboard/ShadLineChart";
import ShadAreaChart from "@/components/dashboard/ShadAreaChart";
import RecentSessions from "../../../components/dashboard/RecentSessionsTable";
import ShadDonutChart from "@/components/dashboard/ShadDonutChart";
import { useDashboardData } from "@/hooks/auth";
import { UseQueryResult } from "@tanstack/react-query";
import { Session } from "../../../components/dashboard/RecentSessionsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeWords, formatDate, formatTime } from "@/components/tables/session-history-table/admin";

const AdminDashboardHome: React.FC = () => {
    const { data, isLoading } = useDashboardData() as UseQueryResult<
        { recent_sessions: Session[]; active_users_count: number; inactive_users_count: number; today_new_users_count: number },
        Error
    >;

    const recentData = useMemo(
        () =>
            data?.recent_sessions?.map((item: any) => ({
                id: item.id || "N/A",
                sessionName: capitalizeWords(item.session_name || "Unknown Session"),
                sessionType: capitalizeWords(item.session_type_display || "Unknown Type"),
                date: formatDate(item.date),
                duration: formatTime(item.formatted_duration),
            })) || [],
        [data?.recent_sessions],
    );

    const cardsData = [
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.375 8.75V10.625C14.375 11.7853 13.9141 12.8981 13.0936 13.7186C12.2731 14.5391 11.1603 15 10 15C8.83968 15 7.72688 14.5391 6.90641 13.7186C6.08594 12.8981 5.625 11.7853 5.625 10.625V8.75H4.375V10.625C4.37566 12.0082 4.88591 13.3426 5.80826 14.3733C6.73062 15.4041 8.0004 16.0588 9.375 16.2125V17.5H6.875V18.75H13.125V17.5H10.625V16.2125C11.9996 16.0588 13.2694 15.4041 14.1917 14.3733C15.1141 13.3426 15.6243 12.0082 15.625 10.625V8.75H14.375Z"
                        fill="#333333"
                    />
                    <path
                        d="M10 13.75C10.8288 13.75 11.6237 13.4208 12.2097 12.8347C12.7958 12.2487 13.125 11.4538 13.125 10.625V4.375C13.125 3.5462 12.7958 2.75134 12.2097 2.16529C11.6237 1.57924 10.8288 1.25 10 1.25C9.1712 1.25 8.37634 1.57924 7.79029 2.16529C7.20424 2.75134 6.875 3.5462 6.875 4.375V10.625C6.875 11.4538 7.20424 12.2487 7.79029 12.8347C8.37634 13.4208 9.1712 13.75 10 13.75ZM8.125 4.375C8.125 3.87772 8.32254 3.40081 8.67417 3.04917C9.02581 2.69754 9.50272 2.5 10 2.5C10.4973 2.5 10.9742 2.69754 11.3258 3.04917C11.6775 3.40081 11.875 3.87772 11.875 4.375V10.625C11.875 11.1223 11.6775 11.5992 11.3258 11.9508C10.9742 12.3025 10.4973 12.5 10 12.5C9.50272 12.5 9.02581 12.3025 8.67417 11.9508C8.32254 11.5992 8.125 11.1223 8.125 10.625V4.375Z"
                        fill="#333333"
                    />
                </svg>
            ),
            title: "Total New Sessions",
            key: "total_new_sessions_count",
            value: 10,
            direction: "up",
            percent: 1.7,
        },
        {
            icon: (
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.87435 2.5C4.82453 2.5 3.81772 2.91704 3.07538 3.65937C2.33305 4.4017 1.91602 5.40852 1.91602 6.45833V12.2917C1.91602 12.7889 2.11356 13.2659 2.46519 13.6175C2.81682 13.9691 3.29373 14.1667 3.79102 14.1667H3.99935V12.9167H3.79102C3.62526 12.9167 3.46628 12.8508 3.34907 12.7336C3.23186 12.6164 3.16602 12.4574 3.16602 12.2917V6.45833C3.16602 5.74004 3.45136 5.05116 3.95927 4.54325C4.46718 4.03534 5.15605 3.75 5.87435 3.75H14.2077C14.3734 3.75 14.5324 3.81585 14.6496 3.93306C14.7668 4.05027 14.8327 4.20924 14.8327 4.375V4.58333H16.0827V4.375C16.0827 4.12877 16.0342 3.88495 15.94 3.65747C15.8457 3.42998 15.7076 3.22328 15.5335 3.04917C15.3594 2.87506 15.1527 2.73695 14.9252 2.64273C14.6977 2.5485 14.4539 2.5 14.2077 2.5H5.87435ZM16.2943 5.41667H16.7077C17.1828 5.41661 17.6402 5.59691 17.9875 5.92114C18.3348 6.24537 18.546 6.68934 18.5785 7.16333L18.5827 7.29167V8.12833C18.5824 8.28661 18.5221 8.4389 18.4139 8.55445C18.3058 8.67 18.1578 8.74021 17.9999 8.75089C17.8419 8.76157 17.6859 8.71194 17.5631 8.61201C17.4404 8.51208 17.3601 8.3693 17.3385 8.2125L17.3327 8.12833V7.29167C17.3327 7.14064 17.278 6.99472 17.1787 6.88089C17.0794 6.76707 16.9423 6.69304 16.7927 6.6725L16.7077 6.66667H16.2943C16.136 6.66662 15.9836 6.60646 15.8679 6.49836C15.7521 6.39025 15.6818 6.24225 15.671 6.08427C15.6602 5.92628 15.7098 5.77009 15.8097 5.64725C15.9096 5.52441 16.0525 5.44408 16.2093 5.4225L16.2943 5.41667ZM5.45768 9.58333C5.60884 9.58337 5.75486 9.63818 5.8687 9.73762C5.98255 9.83706 6.05649 9.97439 6.07685 10.1242L6.08268 10.2092V12.2875C6.08263 12.4459 6.02248 12.5983 5.91437 12.714C5.80627 12.8297 5.65827 12.9001 5.50028 12.9109C5.3423 12.9216 5.18611 12.8721 5.06327 12.7721C4.94043 12.6722 4.8601 12.5294 4.83852 12.3725L4.83268 12.2875V10.2092C4.83268 10.0434 4.89853 9.88444 5.01574 9.76723C5.13295 9.65001 5.29192 9.58417 5.45768 9.58417M6.07685 14.2867C6.05526 14.1298 5.97494 13.987 5.8521 13.887C5.72926 13.7871 5.57307 13.7375 5.41508 13.7483C5.2571 13.7591 5.1091 13.8295 5.00099 13.9452C4.89289 14.0609 4.83273 14.2133 4.83268 14.3717V15.2092L4.83685 15.3375C4.86957 15.8113 5.0809 16.2551 5.42816 16.5792C5.77541 16.9032 6.23271 17.0834 6.70768 17.0833H7.12435L7.20935 17.0775C7.36622 17.0559 7.50906 16.9756 7.60899 16.8527C7.70892 16.7299 7.7585 16.5737 7.7477 16.4157C7.73691 16.2577 7.66655 16.1098 7.55084 16.0016C7.43513 15.8935 7.2827 15.8334 7.12435 15.8333H6.70768L6.62268 15.8275C6.47305 15.807 6.33593 15.7329 6.23665 15.6191C6.13738 15.5053 6.08269 15.3594 6.08268 15.2083V14.3708L6.07685 14.2867ZM18.5827 14.3717C18.5827 14.2059 18.5168 14.0469 18.3996 13.9297C18.2824 13.8125 18.1234 13.7467 17.9577 13.7467C17.7919 13.7467 17.6329 13.8125 17.5157 13.9297C17.3985 14.0469 17.3327 14.2059 17.3327 14.3717V15.2092C17.3327 15.3749 17.2668 15.5339 17.1496 15.6511C17.0324 15.7683 16.8734 15.8342 16.7077 15.8342H15.8718C15.7061 15.8342 15.5471 15.9 15.4299 16.0172C15.3127 16.1344 15.2468 16.2934 15.2468 16.4592C15.2468 16.6249 15.3127 16.7839 15.4299 16.9011C15.5471 17.0183 15.7061 17.0842 15.8718 17.0842H16.7077C16.954 17.0842 17.1979 17.0356 17.4254 16.9414C17.6529 16.8471 17.8597 16.7089 18.0338 16.5347C18.2079 16.3605 18.346 16.1537 18.4402 15.9261C18.5344 15.6985 18.5828 15.4546 18.5827 15.2083V14.3717ZM12.5435 15.8333H13.7893C13.9477 15.8334 14.1001 15.8935 14.2158 16.0016C14.3316 16.1098 14.4019 16.2577 14.4127 16.4157C14.4235 16.5737 14.3739 16.7299 14.274 16.8527C14.1741 16.9756 14.0312 17.0559 13.8743 17.0775L13.7893 17.0833H12.5435C12.3852 17.0833 12.2327 17.0231 12.117 16.915C12.0013 16.8069 11.931 16.6589 11.9202 16.5009C11.9094 16.3429 11.9589 16.1868 12.0589 16.0639C12.1588 15.9411 12.3016 15.8608 12.4585 15.8392L12.5435 15.8333ZM10.4543 15.8333H9.20852L9.12352 15.8392C8.96664 15.8608 8.82381 15.9411 8.72388 16.0639C8.62394 16.1868 8.57437 16.3429 8.58516 16.5009C8.59595 16.6589 8.66631 16.8069 8.78202 16.915C8.89773 17.0231 9.05016 17.0833 9.20852 17.0833H10.4543L10.5393 17.0775C10.6962 17.0559 10.8391 16.9756 10.939 16.8527C11.0389 16.7299 11.0885 16.5737 11.0777 16.4157C11.0669 16.2577 10.9966 16.1098 10.8808 16.0016C10.7651 15.8935 10.6127 15.8334 10.4543 15.8333ZM18.5768 10.1242C18.5553 9.96729 18.4749 9.82446 18.3521 9.72453C18.2293 9.6246 18.0731 9.57502 17.9151 9.58581C17.7571 9.59661 17.6091 9.66697 17.501 9.78267C17.3929 9.89838 17.3327 10.0508 17.3327 10.2092V12.2875L17.3385 12.3725C17.3601 12.5294 17.4404 12.6722 17.5633 12.7721C17.6861 12.8721 17.8423 12.9216 18.0003 12.9109C18.1583 12.9001 18.3063 12.8297 18.4144 12.714C18.5225 12.5983 18.5826 12.4459 18.5827 12.2875V10.2092L18.5768 10.1242ZM8.16852 6.04167C8.16852 5.87591 8.10267 5.71694 7.98546 5.59973C7.86825 5.48251 7.70928 5.41667 7.54352 5.41667H6.70768C6.2104 5.41667 5.73349 5.61421 5.38186 5.96584C5.03023 6.31747 4.83268 6.79439 4.83268 7.29167V8.12833C4.83268 8.29409 4.89853 8.45307 5.01574 8.57028C5.13295 8.68749 5.29192 8.75333 5.45768 8.75333C5.62344 8.75333 5.78241 8.68749 5.89962 8.57028C6.01683 8.45307 6.08268 8.29409 6.08268 8.12833V7.29167C6.08268 7.12591 6.14853 6.96694 6.26574 6.84973C6.38295 6.73252 6.54192 6.66667 6.70768 6.66667H7.54352C7.70928 6.66667 7.86825 6.60082 7.98546 6.48361C8.10267 6.3664 8.16852 6.20743 8.16852 6.04167ZM12.9568 5.41667H14.2093C14.3677 5.41672 14.5201 5.47687 14.6358 5.58498C14.7516 5.69308 14.8219 5.84108 14.8327 5.99907C14.8435 6.15705 14.7939 6.31324 14.694 6.43608C14.5941 6.55892 14.4512 6.63925 14.2943 6.66083L14.2093 6.66667H12.9568C12.7985 6.66662 12.6461 6.60646 12.5304 6.49836C12.4146 6.39025 12.3443 6.24225 12.3335 6.08427C12.3227 5.92628 12.3723 5.77009 12.4722 5.64725C12.5721 5.52441 12.715 5.44408 12.8718 5.4225L12.9568 5.41667ZM10.8702 5.41667H9.62435L9.53935 5.4225C9.38247 5.44408 9.23964 5.52441 9.13971 5.64725C9.03978 5.77009 8.9902 5.92628 9.00099 6.08427C9.01179 6.24225 9.08215 6.39025 9.19786 6.49836C9.31357 6.60646 9.466 6.66662 9.62435 6.66667H10.8702L10.9552 6.66083C11.1121 6.63925 11.2549 6.55892 11.3548 6.43608C11.4548 6.31324 11.5043 6.15705 11.4935 5.99907C11.4827 5.84108 11.4124 5.69308 11.2967 5.58498C11.181 5.47687 11.0285 5.41672 10.8702 5.41667Z"
                        fill="#1B1E2B"
                    />
                </svg>
            ),
            key: "",
            title: "Pitch Sessions",
            value: 2,
            direction: "down",
            percent: 1.7,
        },
        {
            icon: (
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.375 3.125H11.125V1.875C11.125 1.70924 11.0592 1.55027 10.9419 1.43306C10.8247 1.31585 10.6658 1.25 10.5 1.25C10.3342 1.25 10.1753 1.31585 10.0581 1.43306C9.94085 1.55027 9.875 1.70924 9.875 1.875V3.125H3.625C3.29348 3.125 2.97554 3.2567 2.74112 3.49112C2.5067 3.72554 2.375 4.04348 2.375 4.375V13.75C2.375 14.0815 2.5067 14.3995 2.74112 14.6339C2.97554 14.8683 3.29348 15 3.625 15H6.7L5.01172 17.1094C4.90812 17.2389 4.86021 17.4042 4.87852 17.5691C4.89683 17.7339 4.97987 17.8847 5.10938 17.9883C5.23888 18.0919 5.40423 18.1398 5.56905 18.1215C5.73388 18.1032 5.88468 18.0201 5.98828 17.8906L8.3 15H12.7L15.0117 17.8906C15.063 17.9547 15.1264 18.0081 15.1984 18.0477C15.2703 18.0874 15.3493 18.1124 15.4309 18.1215C15.5126 18.1305 15.5952 18.1235 15.674 18.1006C15.7529 18.0777 15.8265 18.0396 15.8906 17.9883C15.9547 17.937 16.0081 17.8736 16.0477 17.8016C16.0874 17.7297 16.1124 17.6507 16.1215 17.5691C16.1305 17.4874 16.1235 17.4048 16.1006 17.326C16.0777 17.2471 16.0396 17.1735 15.9883 17.1094L14.3 15H17.375C17.7065 15 18.0245 14.8683 18.2589 14.6339C18.4933 14.3995 18.625 14.0815 18.625 13.75V4.375C18.625 4.04348 18.4933 3.72554 18.2589 3.49112C18.0245 3.2567 17.7065 3.125 17.375 3.125ZM17.375 13.75H3.625V4.375H17.375V13.75Z"
                        fill="#1B1E2B"
                    />
                </svg>
            ),
            title: "Presentation Sessions",
            value: 10,
            direction: "down",
            percent: 1.7,
        },
        {
            icon: (
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_480_3442)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.0005 3.75001C12.0012 3.51996 11.9383 3.29422 11.8187 3.09767C11.6992 2.90113 11.5277 2.74142 11.3231 2.63617C11.1186 2.53092 10.8889 2.48422 10.6595 2.50122C10.4301 2.51822 10.2099 2.59826 10.023 2.73251L6.84805 4.99501H3.87305C3.04425 4.99501 2.24939 5.32425 1.66334 5.9103C1.07729 6.49635 0.748047 7.2912 0.748047 8.12V11.87C0.748047 12.6988 1.07729 13.4937 1.66334 14.0797C2.24939 14.6658 3.04425 14.995 3.87305 14.995H6.84805L10.023 17.2575C10.21 17.3908 10.43 17.47 10.659 17.4866C10.8879 17.5032 11.117 17.4564 11.3212 17.3515C11.5254 17.2466 11.6968 17.0875 11.8166 16.8917C11.9364 16.6958 12.0001 16.4708 12.0005 16.2413V3.74126V3.75001ZM3.87555 6.25001H6.85055C7.11094 6.25004 7.36484 6.16876 7.5768 6.01751L10.7518 3.75501V16.255L7.5768 13.9925C7.36484 13.8413 7.11094 13.76 6.85055 13.76H3.87555C3.37827 13.76 2.90135 13.5625 2.54972 13.2108C2.19809 12.8592 2.00055 12.3823 2.00055 11.885V8.135C2.00055 7.63772 2.19809 7.16081 2.54972 6.80918C2.90135 6.45755 3.37827 6.26001 3.87555 6.26001V6.25001Z"
                            fill="#333333"
                        />
                        <path
                            d="M15.1247 2.92499C15.1589 2.85038 15.2075 2.78324 15.2677 2.72741C15.3278 2.67157 15.3984 2.62814 15.4754 2.59958C15.5523 2.57103 15.6342 2.55791 15.7162 2.56099C15.7982 2.56406 15.8788 2.58326 15.9534 2.61749C17.3665 3.26736 18.5638 4.30858 19.4034 5.61786C20.243 6.92714 20.6898 8.44962 20.6909 10.005C20.6909 11.555 20.2459 13.08 19.4034 14.3925C18.5643 15.7021 17.3669 16.7433 15.9534 17.3925C15.8028 17.4616 15.6308 17.468 15.4754 17.4104C15.3199 17.3527 15.1938 17.2357 15.1247 17.085C15.0556 16.9343 15.0491 16.7624 15.1068 16.6069C15.1645 16.4515 15.2815 16.3254 15.4322 16.2562C16.6295 15.7122 17.6418 14.8302 18.3447 13.7187C19.0536 12.6102 19.4301 11.3217 19.4296 10.0059C19.4292 8.69002 19.0518 7.40184 18.3422 6.29374C17.6304 5.18513 16.6152 4.30435 15.4172 3.75624C15.3426 3.72202 15.2754 3.67344 15.2196 3.61327C15.1638 3.5531 15.1203 3.48252 15.0918 3.40556C15.0632 3.3286 15.0501 3.24677 15.0532 3.16474C15.0562 3.08272 15.0754 3.0021 15.1097 2.92749L15.1247 2.92499Z"
                            fill="#333333"
                        />
                        <path
                            d="M14.0003 6.43748C14.0832 6.29394 14.2197 6.18919 14.3798 6.1463C14.5399 6.1034 14.7105 6.12586 14.854 6.20873C15.5193 6.59206 16.0719 7.14381 16.4563 7.80849C16.8406 8.47317 17.0432 9.22734 17.0436 9.99515C17.0439 10.763 16.8421 11.5173 16.4584 12.1824C16.0747 12.8474 15.5227 13.3997 14.8578 13.7837C14.7147 13.8614 14.5471 13.8801 14.3904 13.836C14.2337 13.7919 14.1005 13.6885 14.0189 13.5476C13.9373 13.4068 13.9139 13.2397 13.9536 13.0819C13.9933 12.9241 14.093 12.7879 14.2315 12.7025C14.7059 12.4277 15.0996 12.0331 15.3732 11.558C15.6468 11.083 15.7907 10.5444 15.7903 9.99623C15.7899 9.44778 15.6452 8.90909 15.3708 8.43427C15.0963 7.95945 14.7016 7.56524 14.2265 7.29123C14.083 7.20835 13.9783 7.07184 13.9354 6.91173C13.8925 6.75162 13.9149 6.58103 13.9978 6.43748H14.0003Z"
                            fill="#333333"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_480_3442">
                            <rect width="20" height="20" fill="white" transform="translate(0.75)" />
                        </clipPath>
                    </defs>
                </svg>
            ),
            title: "Public Speaking Sessions",
            value: 5,
            direction: "up",
            percent: 1.7,
        },
    ];

    const lineChartData = [
        { month: "January", Pitch: 186, Presentation: 80, Keynote: 90 },
        { month: "February", Pitch: 305, Presentation: 200, Keynote: 100 },
        { month: "March", Pitch: 237, Presentation: 120, Keynote: 100 },
        { month: "April", Pitch: 73, Presentation: 190, Keynote: 100 },
        { month: "May", Pitch: 209, Presentation: 130, Keynote: 100 },
        { month: "June", Pitch: 214, Presentation: 140, Keynote: 100 },
    ];

    const lineChartColors = {
        Pitch: "#252A39",
        Presentation: "#40B869",
        Keynote: "#F5B546",
    };

    const areaChartData = [
        { month: "January", currentWeek: 186, previousWeek: 80 },
        { month: "February", currentWeek: 305, previousWeek: 200 },
        { month: "March", currentWeek: 237, previousWeek: 120 },
        { month: "April", currentWeek: 73, previousWeek: 190 },
        { month: "May", currentWeek: 209, previousWeek: 130 },
        { month: "June", currentWeek: 214, previousWeek: 140 },
    ];

    const areaChartColors = {
        currentWeek: "#F5B546",
        previousWeek: "#F8DFC3",
    };

    const donutChartData = [
        { name: "ActiveUsers", value: Number(data?.active_users_count || 0), fill: "#252A39" },
        { name: "InactiveUsers", value: Number(data?.inactive_users_count || 0), fill: "#B9BCC8" },
    ];

    const donutChartColors = {
        ActiveUsers: "#252A39",
        InactiveUsers: "#B9BCC8",
    };

    const totalUsers = Number(data?.active_users_count || 0) + Number(data?.inactive_users_count || 0);
    const userPercentage = parseFloat(((Number(data?.today_new_users_count || 0) / (totalUsers || 1)) * 100).toFixed(1));

    if (isLoading) {
        return (
            <div className="admin__dashboard__index py-3 px-4 bg-ghost-white">
                {/* Header Skeleton */}
                <div className="py-4 px-2 justify-between hidden md:flex">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>

                {/* Top Cards Skeleton */}
                <div className="flex flex-wrap items-stretch">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="top__cards w-full md:w-1/2 lg:w-1/4 px-2 mb-3">
                            <div className="dash__card p-4 flex flex-col h-full justify-between rounded-[12px] relative overflow-hidden">
                                <div className="mb-4 flex items-center">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="ms-2.5 h-4 w-24" />
                                </div>
                                <Skeleton className="h-8 w-16 mb-5.5" />
                                <div className="flex items-center">
                                    <Skeleton className="h-4 w-16 me-2" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section Skeleton */}
                <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
                    {/* First Chart */}
                    <div className="w-full lg:w-1/2 mt-3 mb-3">
                        <div className="sessions__number dash__card h-full flex flex-col px-5 py-7 rounded-[8px]">
                            <div className="flex justify-between items-center mb-6">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <Skeleton className="flex-1 h-64" />
                        </div>
                    </div>

                    {/* Second Chart */}
                    <div className="w-full lg:w-1/2 mt-3 mb-3">
                        <div className="sessions__number dash__card h-full flex flex-col px-5 py-7 rounded-[8px]">
                            <div className="flex justify-between items-center mb-6">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <Skeleton className="flex-1 h-64" />
                        </div>
                    </div>
                </div>

                {/* Bottom Section Skeleton */}
                <div className="flex flex-wrap lg:items-stretch">
                    {/* Table Section */}
                    <div className="w-full lg:w-6/9 lg:pe-2 mb-4 mt-3 shad__table">
                        <div className="dash__card px-5 py-4 rounded-[8px]">
                            <div className="flex justify-between items-center mb-4">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <Skeleton className="h-64 w-full" />
                        </div>
                    </div>

                    {/* Donut Chart Section */}
                    <div className="w-full lg:w-3/9 lg:ps-2 mb-4 mt-3 h-full">
                        <div className="dash__card w-full px-5 py-4 rounded-[8px]">
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <div className="w-full h-auto donut__chart">
                                <Skeleton className="h-64 mb-3 rounded-full" />
                                <div className="donut__details p-3">
                                    <div className="flex justify-between items-center mb-2.5">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin__dashboard__index py-3 px-4 bg-ghost-white">
            <div className="py-4 px-2 justify-between hidden md:flex">
                <p>Here's an overview of your dashboard</p>
                <div className="flex items-center">
                    <select className="me-4 px-3 py-2 rounded-[8px]">
                        <option value="weekly">Today</option>
                        <option value="monthly">Last Week</option>
                        <option value="yearly">Last Month</option>
                    </select>
                </div>
            </div>

            {/* Top Cards */}
            <div className="flex flex-wrap items-stretch">
                {cardsData.map((card, index) => (
                    <div key={index} className="top__cards w-full md:w-1/2 lg:w-1/4 px-2 mb-3">
                        <div className="dash__card p-4 flex flex-col h-full justify-between rounded-[12px] relative overflow-hidden">
                            <div className="mb-4 flex items-center">
                                {card.icon}
                                <p className="ms-2.5 gunmetal">{card.title}</p>
                            </div>
                            <h4 className="gunmetal mb-5.5">{card.value}</h4>
                            <div className="flex items-center">
                                <div className="flex items-center me-2">
                                    {card.direction === "up" ? (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.7508 9C13.7508 8.80109 13.8298 8.61032 13.9705 8.46967C14.1111 8.32902 14.3019 8.25 14.5008 8.25H18.0008C18.1997 8.25 18.3905 8.32902 18.5312 8.46967C18.6718 8.61032 18.7508 8.80109 18.7508 9V12.5C18.7508 12.6989 18.6718 12.8897 18.5312 13.0303C18.3905 13.171 18.1997 13.25 18.0008 13.25C17.8019 13.25 17.6111 13.171 17.4705 13.0303C17.3298 12.8897 17.2508 12.6989 17.2508 12.5V10.81L12.5308 15.53C12.3902 15.6705 12.1996 15.7493 12.0008 15.7493C11.8021 15.7493 11.6114 15.6705 11.4708 15.53L9.00082 13.06L6.53082 15.53C6.38865 15.6625 6.2006 15.7346 6.0063 15.7312C5.812 15.7277 5.62661 15.649 5.4892 15.5116C5.35179 15.3742 5.27308 15.1888 5.26965 14.9945C5.26622 14.8002 5.33834 14.6122 5.47082 14.47L8.47082 11.47C8.61145 11.3295 8.80207 11.2507 9.00082 11.2507C9.19957 11.2507 9.3902 11.3295 9.53082 11.47L12.0008 13.94L16.1908 9.75H14.5008C14.3019 9.75 14.1111 9.67098 13.9705 9.53033C13.8298 9.38968 13.7508 9.19891 13.7508 9Z"
                                                fill="#07A042"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width="25"
                                            height="24"
                                            viewBox="0 0 25 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.72 8.46997C11.8606 8.32952 12.0512 8.25063 12.25 8.25063C12.4488 8.25063 12.6394 8.32952 12.78 8.46997L15.25 10.94L17.72 8.46997C17.7887 8.39628 17.8715 8.33718 17.9635 8.29619C18.0555 8.2552 18.1548 8.23316 18.2555 8.23138C18.3562 8.2296 18.4562 8.24813 18.5496 8.28585C18.643 8.32357 18.7278 8.37971 18.799 8.45093C18.8703 8.52215 18.9264 8.60698 18.9641 8.70037C19.0018 8.79376 19.0204 8.89379 19.0186 8.99449C19.0168 9.0952 18.9948 9.19451 18.9538 9.28651C18.9128 9.37851 18.8537 9.46131 18.78 9.52997L15.78 12.53C15.6394 12.6704 15.4488 12.7493 15.25 12.7493C15.0512 12.7493 14.8606 12.6704 14.72 12.53L12.25 10.06L8.06 14.25H9.75C9.94891 14.25 10.1397 14.329 10.2803 14.4696C10.421 14.6103 10.5 14.8011 10.5 15C10.5 15.1989 10.421 15.3896 10.2803 15.5303C10.1397 15.671 9.94891 15.75 9.75 15.75H6.25C6.05109 15.75 5.86032 15.671 5.71967 15.5303C5.57902 15.3896 5.5 15.1989 5.5 15V11.5C5.5 11.3011 5.57902 11.1103 5.71967 10.9696C5.86032 10.829 6.05109 10.75 6.25 10.75C6.44891 10.75 6.63968 10.829 6.78033 10.9696C6.92098 11.1103 7 11.3011 7 11.5V13.19L11.72 8.46997Z"
                                                fill="#940803"
                                            />
                                        </svg>
                                    )}
                                    <p style={{ color: card.direction === "up" ? "#07A042" : "#940803" }}>
                                        {card.percent}%
                                    </p>
                                </div>
                                <p className="gunmetal">
                                    {card.direction === "up" ? "more than yesterday" : "less than yesterday"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
                {/* First Column */}
                <div className="w-full lg:w-1/2 mt-3 mb-3">
                    <div className="sessions__number dash__card h-full flex flex-col px-5 py-7 rounded-[8px]">
                        <div className="flex justify-between items-center mb-6">
                            <p className="big chinese__black">Number of Sessions</p>
                            <div className="flex items-center">
                                <select className="me-4 px-3 py-2 rounded-[8px]">
                                    <option value="weekly">Past 7 Days</option>
                                    <option value="monthly">Past Month</option>
                                    <option value="yearly">Past Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="chart__div flex-1">
                            <ShadLineChart data={lineChartData} colors={lineChartColors} />
                        </div>
                    </div>
                </div>

                {/* Second Column */}
                <div className="w-full lg:w-1/2 mt-3 mb-3">
                    <div className="sessions__number dash__card h-full flex flex-col px-5 py-7 rounded-[8px]">
                        <div className="flex justify-between items-center mb-6">
                            <p className="big chinese__black">User Growth</p>
                            <div className="flex items-center">
                                <select className="me-4 px-3 py-2 rounded-[8px]">
                                    <option value="weekly">Past 7 Days</option>
                                    <option value="monthly">Past Month</option>
                                    <option value="yearly">Past Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="chart__div flex-1">
                            <ShadAreaChart data={areaChartData} colors={areaChartColors} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-wrap lg:items-stretch">
                <div className="w-full lg:w-6/9 lg:pe-2 mb-4 mt-3 shad__table">
                    <div className="dash__card px-5 py-4 rounded-[8px]">
                        {data?.recent_sessions && <RecentSessions data={recentData} />}
                    </div>
                </div>

                <div className="w-full lg:w-3/9 lg:ps-2 mb-4 mt-3 h-full">
                    <div className="dash__card w-full px-5 py-4 rounded-[8px]">
                        <div className="flex items-center justify-between mb-4">
                            <p className="big">Active Users</p>
                            <small className="underline cursor-pointer">View All</small>
                        </div>
                        <div className="w-full h-auto donut__chart">
                            <div className="h-auto mb-3">
                                <ShadDonutChart data={donutChartData} colors={donutChartColors} />
                            </div>

                            <div className="donut__details p-3">
                                {/* Total Users */}
                                <div className="flex justify-between items-center mb-2.5">
                                    <div className="flex gap-2 items-center">
                                        <h4 className="gunmetal">{totalUsers}</h4>
                                        <p className="auro__metal">Total Users</p>
                                    </div>
                                    <div className="flex items-center me-2">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.7508 9C13.7508 8.80109 13.8298 8.61032 13.9705 8.46967C14.1111 8.32902 14.3019 8.25 14.5008 8.25H18.0008C18.1997 8.25 18.3905 8.32902 18.5312 8.46967C18.6718 8.61032 18.7508 8.80109 18.7508 9V12.5C18.7508 12.6989 18.6718 12.8897 18.5312 13.0303C18.3905 13.171 18.1997 13.25 18.0008 13.25C17.8019 13.25 17.6111 13.171 17.4705 13.0303C17.3298 12.8897 17.2508 12.6989 17.2508 12.5V10.81L12.5308 15.53C12.3902 15.6705 12.1996 15.7493 12.0008 15.7493C11.8021 15.7493 11.6114 15.6705 11.4708 15.53L9.00082 13.06L6.53082 15.53C6.38865 15.6625 6.2006 15.7346 6.0063 15.7312C5.812 15.7277 5.62661 15.649 5.4892 15.5116C5.35179 15.3742 5.27308 15.1888 5.26965 14.9945C5.26622 14.8002 5.33834 14.6122 5.47082 14.47L8.47082 11.47C8.61145 11.3295 8.80207 11.2507 9.00082 11.2507C9.19957 11.2507 9.3902 11.3295 9.53082 11.47L12.0008 13.94L16.1908 9.75H14.5008C14.3019 9.75 14.1111 9.67098 13.9705 9.53033C13.8298 9.38968 13.7508 9.19891 13.7508 9Z"
                                                fill="#07A042"
                                            />
                                        </svg>
                                        <p style={{ color: "#07A042" }}>{userPercentage}%</p>
                                    </div>
                                </div>

                                {/* Active Users */}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex gap-2 items-center">
                                        <div className="gunmetal__bg h-4 w-2 rounded-[2px]"></div>
                                        <p className="auro__metal">Active Users</p>
                                    </div>
                                    <div className="flex items-center me-2">
                                        <p className="gunmetal">{data?.active_users_count}</p>
                                    </div>
                                </div>

                                {/* Inactive Users */}
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className="bg-[#B9BCC8] h-4 w-2 rounded-[2px]"></div>
                                        <p className="auro__metal">Inactive Users</p>
                                    </div>
                                    <div className="flex items-center me-2">
                                        <p className="gunmetal">{data?.inactive_users_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;