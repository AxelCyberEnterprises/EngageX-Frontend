interface Params {
  post: {
    img: string;
    date: string;
    download?: boolean;
    title: string;
    summary: string;
    video?: boolean;
  };
}

function PressCard({ post }: Params) {
  return (
    <div className="w-full lg:w-[25rem] space-y-6">
      <div className="h-[25rem] w-full lg:w-[25rem] relative overflow-clip object-cover">
        {post.video ? (
          <video className="absolute h-full w-full object-cover" controls>
            <source src={post.img} type="video/mp4" />
          </video>
        ) : (
          <img
            src={post.img}
            className="absolute h-full w-full object-cover"
            alt={post.title}
          />
        )}
      </div>
      <div className="space-y-3">
        <div>
          {/* <small className="text-green-sheen">{post.date}</small> */}
        </div>
        <div className="flex justify-between items-center">
          <h6>{post.title}</h6>
          {!post.download ? (
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
          ) : (
            <button className="py-2 px-4 bg-black text-white rounded-lg">
              Download
            </button>
          )}
        </div>
        <p className="text-[#667085] font-montserrat">{post.summary}</p>
      </div>
    </div>
  );
}

export default PressCard;
