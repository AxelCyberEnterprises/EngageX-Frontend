const CheckIcon = ({ strokeColor = "#64BA9F" }: { strokeColor?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="xl:w-[20px] md:w-[14px] xl:h-[20px] md:h-[14px]"
    >
      <path
        d="M9.9987 1.6387C9.36736 1.4404 8.6955 1.3335 7.9987 1.3335C4.3168 1.3335 1.33203 4.31826 1.33203 8.00016C1.33203 11.682 4.3168 14.6668 7.9987 14.6668C11.6806 14.6668 14.6654 11.682 14.6654 8.00016C14.6654 7.30336 14.5584 6.63152 14.3602 6.00016"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <path
        d="M5.66602 6.33333L7.99935 8.66667L13.9995 2"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
