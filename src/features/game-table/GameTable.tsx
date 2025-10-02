import { Link } from "react-router";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { getData } from "./data";

type GameTableVariant = "preview" | "full";

export type GameTableProps = {
  variant?: GameTableVariant;
  title?: string;
  actionHref?: string;
  actionLabel?: string;
  previewCount?: number;
};

export const GameTable = ({
  variant = "full",
  title = "Recent Games",
  actionHref,
  previewCount = 10,
}: GameTableProps) => {
  const data = getData();
  const isPreview = variant === "preview";
  const tableData = isPreview ? data.slice(0, previewCount) : data;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        {isPreview && actionHref && (
          <Link to={actionHref} className="text-lg font-semibold">
            {title}
          </Link>
        )}
      </div>
      <DataTable
        columns={columns}
        data={tableData}
        hidePagination={isPreview}
      />
    </section>
  );
};

export default GameTable;
