import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/solid";


/**
 * Exampe component for data shows.
 *
 * This component takes some information and creates Card component.
 * @category core
 * @param title the text of used in card
 * @param Icon icon svg base component
 * @param link local url link
 * @param count numerical string for show data on the card - we can use for text
 * @returns React component
 */
const StatusCard = ({
  title,
  Icon,
  link,
  count,
}: {
  title: string;
  Icon: any;
  link: string;
  count: number;
}) => {
    
  return (
    <div className="col-span-1">
      <Link to={link} className="">
        <div className="w-full p-3 bg-white border rounded-2xl hover:shadow-md transition-all ease-in-out delay-150">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center">
              <Icon className={`h-8 text-blue-500`} />
              <span
                className={`rounded-full badge bg-blue-500 text-xs flex p-1 px-2 gap-1`}
              >
                <span className="text-white">{count}</span>
                <CheckIcon className="w-3 text-slate-50" />
              </span>
            </div>
            <div className="mt-8">
              <h1 className="h5 num-4"></h1>
              <p className="text-base text-slate-800">{title}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StatusCard;
