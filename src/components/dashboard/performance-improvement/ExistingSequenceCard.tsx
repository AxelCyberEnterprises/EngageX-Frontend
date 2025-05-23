import {
  Sequence,
  formatTimestamp,
  updateActiveExistingSession,
} from "@/store/slices/performance_improvement_slice";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ExistingSequenceCard({
  sequence,
  idx,
}: {
  className?: string;
  sequence: Sequence;
  idx: number;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => dispatch(updateActiveExistingSession(idx))}
      className={clsx(
        "p-4 space-y-5  border border-gray rounded-xl cursor-pointer",
        sequence.is_active ? "bg-alice-blue" : "bg-white"
      )}
    >
      <div className="flex justify-between">
        <h6 className="flex items-center capitalize">
          {sequence.sequence_name}
          <span className="inline-block ml-2">
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
          </span>
        </h6>
        <button
          className={clsx(
            "hidden border lg:block border-gray rounded-xl py-3 px-3 text-gunmetal",
            sequence.is_active ? "bg-gunmetal text-white" : "bg-transparent"
          )}
        >
          New Session
        </button>
      </div>
      <div className="flex flex-col justify-between lg:flex-row">
        <div className="flex justify-between lg:flex-col">
          <p
            className={clsx(
              "small",
              sequence.is_active ? "text-success-green" : "text-[#6B7186]"
            )}
          >
            Start Date
          </p>
          <p className="small">{formatTimestamp(sequence.start_date)}</p>
        </div>
        <div className="flex justify-between lg:flex-col">
          <p
            className={clsx(
              "small",
              sequence.is_active ? "text-success-green" : "text-[#6B7186]"
            )}
          >
            Last Updated
          </p>
          <p className="small">{formatTimestamp(sequence.updated_at)}</p>
        </div>
        <div className="flex justify-between lg:flex-col">
          <p
            className={clsx(
              "small",
              sequence.is_active ? "text-success-green" : "text-[#6B7186]"
            )}
          >
            Total Sessions
          </p>
          <p className="small">{sequence.sessions.length} sessions completed</p>
        </div>
      </div>
      <button
        disabled={sequence.sessions.length == 0}
        onClick={(e) => {
          e.stopPropagation();
          console.log("seq sessions: ", sequence.sessions);
          navigate(
            `/dashboard/user/${
              sequence.sessions[0].session_type == "public"
                ? "public-speaking"
                : sequence.sessions[0].session_type == "pitch"
                ? "pitch-practice"
                : "presentation-practice"
            }`
          );
        }}
        className="bg-transparent border-2 w-full lg:hidden disabled:border-gray-200 disabled:text-gray-200 !border-black rounded-xl py-3 px-3 text-black"
      >
        New Session
      </button>
    </div>
  );
}

export default ExistingSequenceCard;
