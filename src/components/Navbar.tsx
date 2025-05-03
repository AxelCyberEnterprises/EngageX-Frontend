import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickoutside";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, menuRef, ()=>setShowMenu(false));


    return (
        <div className="h-[5rem]">
            <div className="flex justify-between bg-gunmetal h-[5rem] fixed z-30 w-full px-10 overflow-clip lg:px-20 text-white font-montserrat items-center">
                <Link to="/">
                    <img src="./assets/logo.png" alt="brand logo" className="h-8" />
                </Link>
                <div
                    ref={menuRef}
                    className={clsx(
                        "lg:block",
                        showMenu
                            ? "block fixed lg:static w-[70vw] h-[100vh] lg:w-max lg:h-max pt-10 px-5 z-40 bg-gunmetal lg:bg-transparent text-left space-y-8 top-0 left-0"
                            : "hidden",
                    )}
                >
                    <ul className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-20 font-light rounded-3xl lg:rounded-2xl lg:items-center px-4 py-2 lg:py-4 lg:px-8 border border-dark-electric-blue/20">
                        {[
                            { path: "/", label: "Home" },
                            { path: "/features", label: "Features" },
                            { path: "/pricing", label: "Pricing" },
                            { path: "/contact", label: "Contact" },
                            // { path: "/press", label: "Contact" },
                        ].map(({ path, label }) => (
                            <Link key={path} to={path} onClick={()=>setShowMenu(false)}>
                                <li className={clsx("py-4 lg:py-0", location.pathname === path ? "text-[#64BA9F]" : "")}>
                                    {label}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <button className="h-[3rem] pl-8 pr-6 lg:hidden space-x-4 rounded-lg border bg-green-sheen">
                        <p>Get started</p>
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            className="h-6 w-6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.9103 9.25591C16.0592 9.25659 16.2018 9.31604 16.3071 9.42131C16.4123 9.52659 16.4718 9.66918 16.4725 9.81806L16.4725 15.1214C16.4751 15.1968 16.4626 15.2721 16.4355 15.3426C16.4085 15.4132 16.3675 15.4775 16.315 15.5319C16.2625 15.5862 16.1997 15.6294 16.1301 15.659C16.0606 15.6885 15.9858 15.7037 15.9103 15.7037C15.8348 15.7037 15.76 15.6885 15.6905 15.659C15.6209 15.6294 15.5581 15.5862 15.5056 15.5319C15.4531 15.4775 15.4122 15.4132 15.3851 15.3426C15.3581 15.2721 15.3455 15.1968 15.3482 15.1214L15.3482 11.1757L9.9441 16.5798C9.83861 16.6853 9.69553 16.7445 9.54635 16.7445C9.39716 16.7445 9.25409 16.6853 9.1486 16.5798C9.04311 16.4743 8.98385 16.3312 8.98385 16.182C8.98385 16.0328 9.04311 15.8898 9.1486 15.7843L14.5527 10.3802L10.607 10.3802C10.4614 10.3751 10.3234 10.3136 10.2221 10.2087C10.1209 10.1039 10.0644 9.96381 10.0644 9.81806C10.0644 9.67231 10.1209 9.53225 10.2222 9.42739C10.3234 9.32253 10.4614 9.26105 10.607 9.25591L15.9103 9.25591Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex gap-2">
                    <Link to="/auth/login">
                        <button className="h-[3rem] pl-8 pr-6 hidden lg:flex space-x-4 rounded-lg border !border-green-sheen">
                            <p>Login</p>
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                className="h-6 w-6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15.9103 9.25591C16.0592 9.25659 16.2018 9.31604 16.3071 9.42131C16.4123 9.52659 16.4718 9.66918 16.4725 9.81806L16.4725 15.1214C16.4751 15.1968 16.4626 15.2721 16.4355 15.3426C16.4085 15.4132 16.3675 15.4775 16.315 15.5319C16.2625 15.5862 16.1997 15.6294 16.1301 15.659C16.0606 15.6885 15.9858 15.7037 15.9103 15.7037C15.8348 15.7037 15.76 15.6885 15.6905 15.659C15.6209 15.6294 15.5581 15.5862 15.5056 15.5319C15.4531 15.4775 15.4122 15.4132 15.3851 15.3426C15.3581 15.2721 15.3455 15.1968 15.3482 15.1214L15.3482 11.1757L9.9441 16.5798C9.83861 16.6853 9.69553 16.7445 9.54635 16.7445C9.39716 16.7445 9.25409 16.6853 9.1486 16.5798C9.04311 16.4743 8.98385 16.3312 8.98385 16.182C8.98385 16.0328 9.04311 15.8898 9.1486 15.7843L14.5527 10.3802L10.607 10.3802C10.4614 10.3751 10.3234 10.3136 10.2221 10.2087C10.1209 10.1039 10.0644 9.96381 10.0644 9.81806C10.0644 9.67231 10.1209 9.53225 10.2222 9.42739C10.3234 9.32253 10.4614 9.26105 10.607 9.25591L15.9103 9.25591Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </Link>
                    <Link to="/auth/signup">
                        <button className="h-[3rem] pl-8 pr-6 space-x-4 hidden lg:flex border rounded-lg bg-green-sheen">
                            <p>Get started</p>
                            <svg
                                width="26"
                                height="26"
                                className="h-6 w-6"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15.9103 9.25591C16.0592 9.25659 16.2018 9.31604 16.3071 9.42131C16.4123 9.52659 16.4718 9.66918 16.4725 9.81806L16.4725 15.1214C16.4751 15.1968 16.4626 15.2721 16.4355 15.3426C16.4085 15.4132 16.3675 15.4775 16.315 15.5319C16.2625 15.5862 16.1997 15.6294 16.1301 15.659C16.0606 15.6885 15.9858 15.7037 15.9103 15.7037C15.8348 15.7037 15.76 15.6885 15.6905 15.659C15.6209 15.6294 15.5581 15.5862 15.5056 15.5319C15.4531 15.4775 15.4122 15.4132 15.3851 15.3426C15.3581 15.2721 15.3455 15.1968 15.3482 15.1214L15.3482 11.1757L9.9441 16.5798C9.83861 16.6853 9.69553 16.7445 9.54635 16.7445C9.39716 16.7445 9.25409 16.6853 9.1486 16.5798C9.04311 16.4743 8.98385 16.3312 8.98385 16.182C8.98385 16.0328 9.04311 15.8898 9.1486 15.7843L14.5527 10.3802L10.607 10.3802C10.4614 10.3751 10.3234 10.3136 10.2221 10.2087C10.1209 10.1039 10.0644 9.96381 10.0644 9.81806C10.0644 9.67231 10.1209 9.53225 10.2222 9.42739C10.3234 9.32253 10.4614 9.26105 10.607 9.25591L15.9103 9.25591Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </Link>
                </div>
                <button className="p-4 border lg:hidden rounded-lg border-[#64BA9F]">
                    <Menu className="h-4" onClick={() => setShowMenu((prev) => !prev)} />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
