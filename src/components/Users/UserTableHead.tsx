/**
 * Table tr for table head.
 *
 * This component creates tr instance to show in the user table header.
 * @category core
 * @returns <thead> HTML tag
 */
const UserTableRow = () => {

  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          آیدی
        </th>
        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          تصویر
        </th>
        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          نام
        </th>
        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          ایمیل
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          ادمین
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          تاریخ عضویت
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
        ></th>
      </tr>
    </thead>
  );
};

export default UserTableRow;
