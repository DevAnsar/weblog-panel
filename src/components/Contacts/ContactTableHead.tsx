/**
 * Table tr for table head.
 *
 * This component creates tr instance to show in the post table header.
 * @category core
 * @returns <thead> HTML tag
 */
const ContactTableRow = () => {
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
          متن
        </th>
        <th
          scope="col"
          className="px-5 py-3 whitespace-nowrap border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          مشاهده شده
        </th>

        <th
          scope="col"
          className="px-5 py-3 whitespace-nowrap border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          پاسخ ها{" "}
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
        ></th>
      </tr>
    </thead>
  );
};

export default ContactTableRow;
