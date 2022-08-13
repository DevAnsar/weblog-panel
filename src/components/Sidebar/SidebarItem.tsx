import { Link, useLocation } from "react-router-dom";

/**
 * Sidebar item component.
 *
 * This component takes each sidebar information and creates li instance to show in the sidebar.
 * @category core
 * @param title sidebar item name
 * @param link sidebar local link
 * @param Icon sidebar icon svg base component
 * @returns React component
 */
const SidebarItem = ({
  title,
  link,
  Icon,
}: {
  title: string;
  link: string;
  Icon: any;
}) => {
  const location = useLocation();
  return (
    <li className="my-2 md:my-0 w-full">
      <Link
        to={link}
        className={`flex w-full items-center p-3 rounded-2xl text-gray-600 no-underline hover:text-indigo-400 hover:bg-slate-50 ${
          location.pathname == link ? "text-indigo-600 bg-slate-100" : ""
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className="text-sm lg:text-md mr-2">{title}</span>
      </Link>
    </li>
  );
};
export default SidebarItem;
