import React, { useState } from "react";
import webImage from "../../../../assets/images/pngs/web-image.png";
import helloBotImage from "../../../../assets/images/pngs/hello-bot.png";
import mailImage from "../../../../assets/images/pngs/mail-image.png";
import { Link, useNavigate } from "react-router-dom";
import GetInTouch from "@/components/help/GetInTouch";

const Help: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="m-0 p-0">
            <section className="w-full border-y flex items-start text-[#262b3a] py-2 px-7 gap-2 ">
                <button className="bg-transparent mt-0.5 hover:bg-transparent p-0" onClick={() => navigate(-1)}>
                    <svg width="18" height="18" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5 12.8945L11 6.89453M5 12.8945L11 18.8945M5 12.8945H19"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div>
                    <p className=" text-xl">Help & Support</p>
                    <p className="text-muted-foregroun text-[rgba(71,77,99,1)] text-sm">
                        Our help & support for all your questions and concerns
                    </p>
                </div>
            </section>
            {<GetInTouch isOpen={isOpen} setIsOpen={setIsOpen} />}
            <main className="px-7">
                <section>
                    <p className="font-medium text-xl my-7 text-[#474D63]">How can we help you?</p>
                    <div className="font-[montserrat] flex gap-7 flex-wrap max-md:flex-col sm:items-center text-white">
                        <Link to="safety">
                            <div className="sm:w-72 w-full hover:scale-105 duration-300 overflow-hidden  text-lg font-semibold py-4 px-6 relative rounded-3xl bg-[#10161E] h-32">
                                <p>
                                    Safety & <br /> Privacy
                                </p>
                                <img src={webImage} className="w-auto right-0 absolute bottom-0" alt="web image" />
                            </div>
                        </Link>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="sm:w-72 w-full bg-[#757575] hover:scale-105 duration-300 overflow-hidden justify-normal items-start text-left px-6 py-4 text-lg font-semibold relative rounded-3xl h-32"
                        >
                            <p className="w-fit p-0 m-0">
                                Contact <br /> Our mail
                            </p>
                            <img src={mailImage} className="absolute w-auto right-0 bottom-0" alt="mail image" />
                        </button>
                        <Link className="hidden" to="message">
                            <div className="sm:w-72 w-full py-4 bg-[#5279a2] hover:scale-105 duration-300 overflow-hidden px-6 text-lg font-semibold relative rounded-3xl h-32">
                                <p>
                                    Message <br /> Chatbot
                                </p>
                                <img
                                    src={helloBotImage}
                                    className="absolute w-auto right-0 bottom-0"
                                    alt="hello bot image"
                                />
                            </div>
                        </Link>
                    </div>
                </section>

                <section className="w-full bg-[#262b3a] text-white rounded-3xl font-[montserrat] mb-28 sm:mb-16 py-20 px-10 gap-3 mt-10 flex flex-col justify-center items-center">
                    <p className="text-4xl max-sm:text-3xl max-sm:leading-10 font-medium text-center ">
                        Still want to know more?
                    </p>
                    <p className="text-[#a5b8c3] sm:text-xl  text-center">
                        Visit our FAQs page to know more about our services at EngageX
                    </p>
                    <a href="/contact#faq" target="_blank" className="mt-5 " >
                        <div className="bg-[#6f7c8e]  text-lg flex items-center gap-0 px-8 py-3  hover:bg-[#6f7c8e90] border-dotted  !important border-[#6f7c8e] rounded-md">
                            <p className=" font-medium">Visit our FAQs</p>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.5379 10.7364C18.7034 10.7371 18.8618 10.8032 18.9788 10.9202C19.0957 11.0371 19.1618 11.1956 19.1625 11.361L19.1625 17.2535C19.1655 17.3374 19.1515 17.421 19.1215 17.4994C19.0914 17.5778 19.0459 17.6493 18.9876 17.7097C18.9293 17.7701 18.8594 17.8181 18.7822 17.8509C18.7049 17.8837 18.6219 17.9006 18.5379 17.9006C18.454 17.9006 18.3709 17.8837 18.2937 17.8509C18.2164 17.8181 18.1466 17.7701 18.0883 17.7097C18.03 17.6493 17.9844 17.5778 17.9544 17.4994C17.9243 17.421 17.9104 17.3374 17.9133 17.2535L17.9133 12.8695L11.9088 18.874C11.7916 18.9912 11.6326 19.0571 11.4669 19.0571C11.3011 19.0571 11.1421 18.9912 11.0249 18.874C10.9077 18.7568 10.8419 18.5978 10.8419 18.4321C10.8419 18.2663 10.9077 18.1073 11.0249 17.9901L17.0294 11.9856L12.6454 11.9856C12.4835 11.9799 12.3302 11.9116 12.2178 11.7951C12.1053 11.6786 12.0424 11.5229 12.0424 11.361C12.0424 11.199 12.1053 11.0434 12.2178 10.9269C12.3302 10.8104 12.4835 10.7421 12.6454 10.7364L18.5379 10.7364Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </a>
                </section>
            </main>
        </div>
    );
};

export default Help;