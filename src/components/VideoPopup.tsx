import { useState, useEffect } from 'react';

const VideoPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative rounded-xl max-w-4xl w-full shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center"
          aria-label="Close video"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        <div className="relative pt-[56.25%]">
          <video
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            autoPlay
            controls
            src="https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/EngageX+advert.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup; 