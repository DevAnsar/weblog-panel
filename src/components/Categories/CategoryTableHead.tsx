/**
 * Table tr for table head.
 *
 * This component creates tr instance to show in the category table header.
 * @category core
 * @returns <thead> HTML tag
 */
const CategoryTableRow = () => {
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
          عنوان
        </th>
        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
        >
          اسلاگ
        </th>
        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
        ></th>
      </tr>
    </thead>
  );
};

export default CategoryTableRow;
