import AdminLayout from "../../layouts/admin-layout";
import { useGate, useStore } from "effector-react";
import {
  $categories,
  $category,
  categoriesGate,
  changeCategory,
  deleteCategory,
  resetCategory,
  updateCategory,
} from "../../store/categories";

const backendUrl = process.env.backendUrl;

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Image",
    field: "image",
    render: (rowData) => (
      <img
        src={`${backendUrl}/uploads/categories/${rowData.image}`}
        className="w-16"
        alt=""
      />
    ),
    editComponent: (rowData) => (
      <label
        htmlFor="image"
        className="cursor-pointer w-40 text-center border-payrue-blue border rounded-xl py-2 px-4 text-payrue-blue hover:bg-blue-50 hover:border-transparent transition duration-200 "
      >
        {rowData?.file?.name || "Choose Image"}
        <input
          type="file"
          name="image"
          id="image"
          className="my-4 hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            changeCategory({ ...rowData, file: file });
          }}
        />
      </label>
    ),
  },
];

const actions = [
  {
    title: "Edit",
    classes: "bg-yellow-500 text-white",
    onClick: (rowData) => changeCategory(rowData),
  },
  {
    title: "Delete",
    classes: "bg-red-500 text-white",
    onClick: (rowData) => deleteCategory(rowData.id),
  },
];

const CategoriesPage = () => {
  useGate(categoriesGate);
  const categories = useStore($categories);
  const category = useStore($category);

  const renderField = (item, column) => {
    if (category && category.id === item.id) {
      if (column.editComponent) {
        return column.editComponent(category);
      } else {
        return (
          <input
            className="border w-full pl-2 py-3 rounded-md flex items-center"
            onChange={(e) =>
              changeCategory({
                ...category,
                [column.field]: e.target.value,
              })
            }
            value={category[column.field]}
          />
        );
      }
    } else {
      if (column.render) {
        return column.render(item);
      } else return item[column.field];
    }
  };
  return (
    <AdminLayout>
      <div className="flex justify-between border-b pb-4">
        <h2 className="text-3xl font-light">Categories</h2>
        <button
          className="py-2 px-4 rounded-md bg-blue-100 text-blue-600 hover:opacity-90"
          onClick={() => changeCategory({ name: "", isVisible: true })}
        >
          Create
        </button>
      </div>
      <table className="w-full">
        <thead className="bg-blue-50">
          <tr>
            {columns.map((column) => (
              <th className="text-left p-4 font-light" key={column.field}>
                {column.title}
              </th>
            ))}
            <th className="text-left p-4 font-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {category && !category.id && (
            <tr>
              {columns.map((column) => (
                <td key={column.field} className="p-4">
                  {renderField({ ...category }, column)}
                </td>
              ))}
              <td className="p-4">
                <div className="flex gap-0.5">
                  <button
                    onClick={() => updateCategory()}
                    className={`py-1.5 px-2 bg-blue-500 text-white rounded-md hover:opacity-90`}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => resetCategory()}
                    className={`py-1.5 px-2 bg-green-500 text-white rounded-md hover:opacity-90`}
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          )}
          {categories.map((item, index) => (
            <tr key={index} className="">
              {columns.map((column) => (
                <td key={column.field} className="p-4">
                  {renderField(item, column)}
                </td>
              ))}
              <td className="p-4">
                <div className="flex gap-0.5">
                  {category && category.id === item.id ? (
                    <>
                      <button
                        onClick={() => updateCategory()}
                        className={`py-1.5 px-2 bg-blue-500 text-white rounded-md hover:opacity-90`}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => resetCategory()}
                        className={`py-1.5 px-2 bg-green-500 text-white rounded-md hover:opacity-90`}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    actions.map((action) => (
                      <button
                        key={action.title}
                        onClick={() => action.onClick(item)}
                        className={`py-1.5 px-2 ${action.classes} rounded-md hover:opacity-90`}
                      >
                        {action.title}
                      </button>
                    ))
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default CategoriesPage;
