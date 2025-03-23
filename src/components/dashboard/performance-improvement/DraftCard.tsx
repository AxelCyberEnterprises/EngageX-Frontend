function DraftCard() {
  return (
    <div className="w-[20rem] h-[12rem]">
      <div className="w-full">
        <p className="text-black">Pitch Mastery session</p>
        <svg
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_2144_14662)">
            <path
              d="M11.168 13.0013H12.8346M12.8346 13.0013H26.168M12.8346 13.0013V24.668C12.8346 25.11 13.0102 25.5339 13.3228 25.8465C13.6354 26.159 14.0593 26.3346 14.5013 26.3346H22.8346C23.2767 26.3346 23.7006 26.159 24.0131 25.8465C24.3257 25.5339 24.5013 25.11 24.5013 24.668V13.0013M15.3346 13.0013V11.3346C15.3346 10.8926 15.5102 10.4687 15.8228 10.1561C16.1354 9.84356 16.5593 9.66797 17.0013 9.66797H20.3346C20.7767 9.66797 21.2006 9.84356 21.5131 10.1561C21.8257 10.4687 22.0013 10.8926 22.0013 11.3346V13.0013M17.0013 17.168V22.168M20.3346 17.168V22.168"
              stroke="#1E1E1E"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2144_14662"
              x="-1.33203"
              y="-1"
              width="40"
              height="40"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2144_14662"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2144_14662"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default DraftCard;
