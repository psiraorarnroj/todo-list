import IColumn from "./IColumn";

const Column = ({ children, title }: IColumn) => {
  return (
    <div className="rounded-lg border border-gray-300 shadow">
      <h2 className="border-b border-gray-300 bg-gray-100 p-4 text-center text-lg">
        {title}
      </h2>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Column;
