import { Link,useLocation } from "react-router-dom";
import { TemplateIcon } from "@heroicons/react/solid";
import UserDataMenu from "./UserDataMenu";


/**
 * Header component.
 * 
 * @category layouts
 * @returns React Component
 */
function Header() {
    const location = useLocation();

    // sidebar toggler -- this function add or remove "hidden" class in to the #sidebar tag
    const handleToggleMenu = () => {
        document.getElementById("sidebar")?.classList.toggle("hidden");
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 px-6 fixed w-full z-10 top-0 h-20">
            <div className="flex items-center flex-shrink-0">
                <Link
                    className="text-white no-underline hover:text-yellow-600 hover:no-underline"
                    to="/"
                >
                    <span className="text-2xl pl-2 flex gap-x-5 ">
                        <TemplateIcon className="w-8 h-8" />
                        "د جی اس"
                    </span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <UserDataMenu />
                <div
                    className={`block  ${
                        location.pathname !== "/login" ? "lg:hidden" : ""
                    }`}
                >
                    <button
                        id="nav-toggle"
                        onClick={handleToggleMenu}
                        className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
                    >
                        <svg
                            className="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
export default Header;
