import { useContactUs } from "@/hooks/auth";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type FormValues = {
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    agreed_to_policy: boolean;
};

function Hero() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const { mutate: contactUs, status } = useContactUs({
        onSuccess: () => {
            toast.success("Email sent successfully");
            console.log("success");
            reset();
        },
        onError: () => {
            toast.error("Couldn't send email at the moment. Try again later");
            console.log("error");
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Form Data:", data);
        contactUs(data);
    };

    return (
        <section className="flex flex-col md:flex-row px-10 lg:px-20 gap-20 font-montserrat py-26">
            <div className="flex-1 flex flex-col justify-center gap-28">
                <div className="space-y-4 text-center lg:text-left">
                    <h1 className="font-montreal leading-snug">We'd love to hear from you</h1>
                    <p className="text-[#475467]">
                        Fill out the form and our friendly team would get back to you shortly
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 pb-20 gap-20 lg:gap-8">
                    <div className="space-y-4">
                        <svg
                            width="24"
                            height="24"
                            className="h-5 w-5 stroke-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
                                stroke="#64BA9F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="big font-semibold">Email</p>
                        <p className="text-green-sheen">info@engagexai.io</p>
                    </div>
                    <div className="space-y-4 mt-10">
                        <div className="flex items-center gap-5">
                            <a
                                href="https://www.linkedin.com/company/the-career-doctor-llc"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    className="size-6"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.79556 2.05066C3.34522 2.05066 2.91332 2.22956 2.59487 2.548C2.27643 2.86644 2.09753 3.29834 2.09753 3.74869C2.09753 4.19903 2.27643 4.63093 2.59487 4.94937C2.91332 5.26781 3.34522 5.44671 3.79556 5.44671C4.2459 5.44671 4.6778 5.26781 4.99625 4.94937C5.31469 4.63093 5.49359 4.19903 5.49359 3.74869C5.49359 3.29834 5.31469 2.86644 4.99625 2.548C4.6778 2.22956 4.2459 2.05066 3.79556 2.05066ZM2.19742 6.84509C2.17093 6.84509 2.14552 6.85561 2.12679 6.87434C2.10806 6.89307 2.09753 6.91848 2.09753 6.94497V17.3329C2.09753 17.388 2.14228 17.4328 2.19742 17.4328H5.3937C5.42019 17.4328 5.4456 17.4223 5.46433 17.4035C5.48306 17.3848 5.49359 17.3594 5.49359 17.3329V6.94497C5.49359 6.91848 5.48306 6.89307 5.46433 6.87434C5.4456 6.85561 5.42019 6.84509 5.3937 6.84509H2.19742ZM7.39138 6.84509C7.36489 6.84509 7.33948 6.85561 7.32075 6.87434C7.30202 6.89307 7.2915 6.91848 7.2915 6.94497V17.3329C7.2915 17.388 7.33624 17.4328 7.39138 17.4328H10.5877C10.6142 17.4328 10.6396 17.4223 10.6583 17.4035C10.677 17.3848 10.6875 17.3594 10.6875 17.3329V11.7394C10.6875 11.342 10.8454 10.9609 11.1264 10.68C11.4074 10.399 11.7884 10.2411 12.1858 10.2411C12.5832 10.2411 12.9643 10.399 13.2452 10.68C13.5262 10.9609 13.6841 11.342 13.6841 11.7394V17.3329C13.6841 17.388 13.7288 17.4328 13.7839 17.4328H16.9802C17.0067 17.4328 17.0321 17.4223 17.0509 17.4035C17.0696 17.3848 17.0801 17.3594 17.0801 17.3329V10.4449C17.0801 8.50555 15.3941 6.98892 13.4643 7.16391C12.8673 7.21868 12.2825 7.36643 11.7311 7.6018L10.6875 8.04928V6.94497C10.6875 6.91848 10.677 6.89307 10.6583 6.87434C10.6396 6.85561 10.6142 6.84509 10.5877 6.84509H7.39138Z"
                                        fill="black"
                                    />
                                </svg>
                            </a>
                            {/* <a
                href="https://www.youtube.com/@TheCareerDoctorLLC"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  className="size-6"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_3685_908)">
                    <path
                      d="M17.7151 5.76089C17.6445 5.48469 17.5093 5.22923 17.3205 5.01559C17.1317 4.80195 16.8949 4.63626 16.6295 4.53217C14.0612 3.54021 9.97344 3.5492 9.74867 3.5492C9.52391 3.5492 5.43617 3.54021 2.86785 4.53217C2.60245 4.63626 2.3656 4.80195 2.17684 5.01559C1.98808 5.22923 1.85282 5.48469 1.78223 5.76089C1.58818 6.50861 1.35742 7.87519 1.35742 10.1423C1.35742 12.4095 1.58818 13.776 1.78223 14.5238C1.85272 14.8001 1.98793 15.0557 2.17669 15.2695C2.36545 15.4833 2.60236 15.6491 2.86785 15.7532C5.32828 16.7025 9.17926 16.7354 9.69922 16.7354H9.79812C10.3181 16.7354 14.1713 16.7025 16.6295 15.7532C16.895 15.6491 17.1319 15.4833 17.3207 15.2695C17.5094 15.0557 17.6446 14.8001 17.7151 14.5238C17.9092 13.7745 18.1399 12.4095 18.1399 10.1423C18.1399 7.87519 17.9092 6.50861 17.7151 5.76089ZM12.1904 10.6308L9.1935 12.7286C9.10385 12.7914 8.99872 12.8285 8.88951 12.8358C8.78029 12.8431 8.67117 12.8203 8.57397 12.77C8.47678 12.7196 8.39522 12.6436 8.33815 12.5502C8.28108 12.4568 8.25067 12.3496 8.25023 12.2401V8.04451C8.25026 7.93486 8.28037 7.82733 8.33728 7.7336C8.39418 7.63988 8.47571 7.56356 8.57298 7.51296C8.67025 7.46235 8.77954 7.4394 8.88895 7.44659C8.99836 7.45379 9.1037 7.49086 9.1935 7.55377L12.1904 9.65158C12.2692 9.70687 12.3336 9.78033 12.378 9.86575C12.4224 9.95117 12.4456 10.046 12.4456 10.1423C12.4456 10.2386 12.4224 10.3335 12.378 10.4189C12.3336 10.5043 12.2692 10.5778 12.1904 10.6331V10.6308Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3685_908">
                      <rect
                        width="19.18"
                        height="19.18"
                        fill="black"
                        transform="translate(0.158691 0.552368)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a> */}
                            <a href="https://www.instagram.com/cd_engagex/" target="_blank" rel="noopener noreferrer">
                                <svg
                                    width="20"
                                    height="20"
                                    className="size-6"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.90838 7.54419C9.21962 7.54419 8.55907 7.8178 8.07204 8.30483C7.58501 8.79186 7.3114 9.45241 7.3114 10.1412C7.3114 10.8299 7.58501 11.4905 8.07204 11.9775C8.55907 12.4645 9.21962 12.7382 9.90838 12.7382C10.5971 12.7382 11.2577 12.4645 11.7447 11.9775C12.2318 11.4905 12.5054 10.8299 12.5054 10.1412C12.5054 9.45241 12.2318 8.79186 11.7447 8.30483C11.2577 7.8178 10.5971 7.54419 9.90838 7.54419Z"
                                        fill="black"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M5.72904 3.01508C8.50664 2.70738 11.3097 2.70738 14.0873 3.01508C15.6048 3.18448 16.8281 4.37909 17.0063 5.90212C17.3355 8.71858 17.3355 11.5638 17.0063 14.3803C16.8281 15.9033 15.6048 17.0979 14.0881 17.2681C11.3103 17.5759 8.5069 17.5759 5.72904 17.2681C4.2116 17.0979 2.98823 15.9033 2.81003 14.3811C2.4808 11.5643 2.4808 8.71885 2.81003 5.90212C2.98823 4.37909 4.2116 3.18448 5.72904 3.01508ZM13.9035 5.34677C13.6916 5.34677 13.4884 5.43095 13.3385 5.58081C13.1887 5.73066 13.1045 5.93391 13.1045 6.14584C13.1045 6.35776 13.1887 6.56101 13.3385 6.71086C13.4884 6.86072 13.6916 6.94491 13.9035 6.94491C14.1155 6.94491 14.3187 6.86072 14.4686 6.71086C14.6184 6.56101 14.7026 6.35776 14.7026 6.14584C14.7026 5.93391 14.6184 5.73066 14.4686 5.58081C14.3187 5.43095 14.1155 5.34677 13.9035 5.34677ZM6.11259 10.1412C6.11259 9.13454 6.51249 8.16912 7.2243 7.45731C7.93611 6.7455 8.90153 6.3456 9.90818 6.3456C10.9148 6.3456 11.8803 6.7455 12.5921 7.45731C13.3039 8.16912 13.7038 9.13454 13.7038 10.1412C13.7038 11.1478 13.3039 12.1133 12.5921 12.8251C11.8803 13.5369 10.9148 13.9368 9.90818 13.9368C8.90153 13.9368 7.93611 13.5369 7.2243 12.8251C6.51249 12.1133 6.11259 11.1478 6.11259 10.1412Z"
                                        fill="black"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 space-y-8 p-6 lg:p-9 border border-[#D0D5DD] rounded-2xl"
            >
                <div className="flex flex-wrap gap-6">
                    <div className="space-y-4 w-full">
                        <label className="text-[#475467] small" htmlFor="first_name">
                            First name
                        </label>
                        <input
                            type="text"
                            placeholder="First name"
                            className="mt-3 text-black"
                            {...register("first_name")}
                        />
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                    </div>
                    <div className="space-y-4 w-full">
                        <label className="text-[#475467] small" htmlFor="last_name">
                            Last name
                        </label>
                        <input
                            type="text"
                            placeholder="Last name"
                            className="mt-3 text-black"
                            {...register("last_name")}
                        />
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[#475467] small" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@company.com"
                        className="mt-3 text-black"
                        {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-4">
                    <label className="small" htmlFor="message">
                        Message
                    </label>
                    <textarea placeholder="" className="mt-3 text-black h-[8rem]" {...register("message")} />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <div className="flex w-full">
                    <input
                        className="h-6 w-6"
                        type="checkbox"
                        id="agree"
                        {...register("agreed_to_policy", {
                            required: "You must agree to continue",
                        })}
                    />
                    <label htmlFor="agree" className="ml-4">
                        You agree to our{" "}
                        <span className="underline">
                            <Link to="/privacy-policy">privacy policy</Link>
                        </span>
                    </label>
                    {errors.agreed_to_policy && (
                        <p className="text-red-500 text-sm">{errors.agreed_to_policy.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className={clsx("w-full py-4 rounded-lg", status == "pending" ? "bg-gray-400" : "bg-black")}
                >
                    {status == "pending" ? "Mailing..." : "Send message"}
                </button>
            </form>
        </section>
    );
}

export default Hero;
