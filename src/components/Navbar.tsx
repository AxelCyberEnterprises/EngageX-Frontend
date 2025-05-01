import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu } from "lucide-react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  return (
    <div className="h-[5rem]">
      <div className="flex justify-between bg-gunmetal h-[5rem] fixed z-30 w-full px-10 overflow-clip lg:px-20 text-white font-montserrat items-center">
        <Link to="/">
          <img src="./assets/logo.png" alt="brand logo" className="h-8" />
        </Link>
        <div
          className={clsx(
            "lg:block",
            showMenu
              ? "block fixed lg:static w-full text-center h-[calc(100vh-5rem)] top-[5rem] lg:top-0 lg:w-max lg:h-max pt-10 px-5 z-40 bg-gunmetal lg:bg-transparent lg:text-left space-y-8 left-0"
              : "hidden"
          )}
        >
          <ul className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-20 font-light rounded-3xl lg:rounded-2xl lg:items-center px-4 py-2 lg:py-4 lg:px-8 lg:border lg:border-dark-electric-blue/20">
            {[
              { path: "/", label: "Home" },
              { path: "/features", label: "Features" },
              { path: "/pricing", label: "Pricing" },
              { path: "/contact", label: "Contact" },
              // { path: "/press", label: "Contact" },
            ].map(({ path, label }) => (
              <Link key={path} to={path}>
                <li
                  className={clsx(
                    "py-4 lg:py-0",
                    location.pathname === path ? "text-[#64BA9F]" : ""
                  )}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>
          <div className="space-y-4 flex flex-col items-center">
            <button className="h-[3rem] w-[10rem] text-center lg:hidden space-x-4 rounded-lg border border-green-sheen">
              <p>Login</p>
            </button>
            <button className="h-[3rem] w-[10rem] text-center lg:hidden space-x-4 rounded-lg border bg-green-sheen">
              <p>Get started</p>
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <Link to="/auth/login">
            <button className="h-[3rem] px-6 space-x-4 hidden lg:flex border rounded-lg border-green-sheen">
              <p>Login</p>
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="h-[3rem] px-6 space-x-4 hidden lg:flex rounded-lg text-black bg-white">
              <p>Get started</p>
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
