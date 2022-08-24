import { default as DashboardStatusCard } from "../components/Dashboard/StatusCard";
import {
  UsersIcon,
  ClipboardListIcon,
  ServerIcon,
  TagIcon,
} from "@heroicons/react/solid";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { dashboardData } from "../store/slices/dashboardSlice";
import { useEffect } from "react";

/**
 * Dashboaed page component.
 *
 * The component created for the dashboard page. General website information is displayed on this page
 * @category pages
 * @returns React component
 */
const DashboardPage = () => {
  // dispatcher for redux actions
  const dispatch = useAppDispatch();

  // take users information from redux store
  const { dashboard, spinner, success_message, error_message } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(dashboardData());
  }, []);

  return (
    <div className="w-full min-h-full lg:px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardStatusCard
          title="کاربران"
          Icon={UsersIcon}
          link="/users"
          count={dashboard.users_count}
        />
        <DashboardStatusCard
          title="پست ها"
          Icon={ClipboardListIcon}
          link="/posts"
          count={dashboard.published_posts_count}
        />
        <DashboardStatusCard
          title="دسته بندی ها"
          Icon={ServerIcon}
          link="/categories"
          count={dashboard.categories_count}
        />
        <DashboardStatusCard
          title="تگ ها"
          Icon={TagIcon}
          link="/tags"
          count={dashboard.tags_count}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
