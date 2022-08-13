import {default as DashboardStatusCard} from "../components/Dashboard/StatusCard"
import {
  UsersIcon,
  ClipboardListIcon,
  ServerIcon,
  TagIcon,
} from "@heroicons/react/solid";

/**
 * Dashboaed page component.
 * 
 * The component created for the dashboard page. General website information is displayed on this page
 * @category pages
 * @returns React component
 */
const DashboardPage = () => {
  return (
    <div className="w-full min-h-full lg:px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardStatusCard
          title="کاربران"
          Icon={UsersIcon}
          link="/users"
          count={"10"}
        />
        <DashboardStatusCard
          title="پست ها"
          Icon={ClipboardListIcon}
          link="/posts"
          count={"6"}
        />
        <DashboardStatusCard
          title="دسته بندی ها"
          Icon={ServerIcon}
          link="/categories"
          count={"6"}
        />
        <DashboardStatusCard
          title="تگ ها"
          Icon={TagIcon}
          link="/tags"
          count={"10"}
        />
      </div>
    </div>
  );
};


export default DashboardPage;
