import { useLocation } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    ClipboardListIcon,
    ServerIcon,
    TagIcon,
    ChatAlt2Icon,
} from "@heroicons/react/solid";
import SideBarItem from "./SidebarItem";
import type {GetSidebarItem} from "../../types"

// Create sidebar links data
export const sidebarLinks : GetSidebarItem[] = [
    {
        id: "1",
        title: "داشبورد",
        Icon: HomeIcon,
        link: "/",
    },
    {
        id: "2",
        title: "کاربران",
        Icon: UsersIcon,
        link: "/users",
    },
    {
        id: "3",
        title: "پست ها",
        Icon: ClipboardListIcon,
        link: "/posts",
    },
    {
        id: "4",
        title: "دسته بندی ها",
        Icon: ServerIcon,
        link: "/categories",
    },

    {
        id: "5",
        title: "تگ ها",
        Icon: TagIcon,
        link: "/tags",
    },

    {
        id: "6",
        title: "کامنت ها",
        Icon: ChatAlt2Icon,
        link: "/comments",
    }
];

/**
 * Sidebar component.
 * 
 * @category layouts
 * @returns React Component
 */
function Sidebar() {
    const location = useLocation();
    return (
        <div
            id="sidebar"
            className={`h-screen hidden w-60 mt-20 hover:shadow-2xl transition-all ease-in-out delay-150 z-40 bg-white text-white pr-8 pl-4 fixed shadow ${
                location.pathname !== "/login" ? "lg:flex" : ""
            }`}
        >
            <ul className="list-reset w-full mt-7">
                {sidebarLinks.map((route) => {
                    return (
                        <SideBarItem
                            key={route.id}
                            title={route.title}
                            link={route.link}
                            Icon={route.Icon}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
export default Sidebar;
