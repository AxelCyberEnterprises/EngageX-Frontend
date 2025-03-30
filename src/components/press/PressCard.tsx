interface Params {
  post: {
    img: string;
    date: string;
    title: string;
    summary: string;
  };
}

function PressCard({ post }: Params) {
  return (
    <div className="w-[25rem] space-y-6">
      <div className="h-[14rem] w-[25rem] relative overflow-clip object-cover">
        <img
          src={post.img}
          className="absolute h-full w-full object-cover"
          alt={post.title}
        />
      </div>
      <div className="space-y-3">
        <div>
          <small className="text-green-sheen">{post.date}</small>
        </div>
        <div className="flex justify-between items-center">
          <h6>{post.title}</h6>
          <svg
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 21L17 11M17 11H7M17 11V21"
              stroke="#1A1A1A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p className="text-[#667085]">{post.summary}</p>
      </div>
    </div>
  );
}

export default PressCard;
