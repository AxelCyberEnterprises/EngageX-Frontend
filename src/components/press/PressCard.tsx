import React, { useState } from "react";

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
  const [showVideo, setShowVideo] = useState(false);

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
            <button
              className="py-2 px-4 bg-black text-white rounded-lg"
              onClick={() => setShowVideo(true)}
            >
              Download
            </button>
          )}
        </div>
        <p className="text-[#667085] font-montserrat">{post.summary}</p>
      </div>
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-70">
          <div className="bg-white rounded-lg p-4 relative w-full max-w-2xl">
            <button
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow transition-colors duration-200"
              onClick={() => setShowVideo(false)}
              aria-label="Close"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4.3934" y1="4.3934" x2="15.6066" y2="15.6066" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
                <line x1="15.6066" y1="4.3934" x2="4.3934" y2="15.6066" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/fEn36uc_ziA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PressCard;
