const DropdownItem = ({ img, title, onClick }) => {
  return (
    <div
      className="p-2 flex items-center cursor-pointer gap-1 bg-white hover:bg-blue-50 duration-200 transition"
      onClick={onClick}
    >
      {img && <img src={img} width="20" alt={title} />}
      <p className="text-sm pr-4">{title}</p>
    </div>
  );
};
export { DropdownItem };
