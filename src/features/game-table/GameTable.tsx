import { useMemo } from "react";
import { Link } from "react-router-dom";
import { createColumns } from "./Columns";
import { useUserGames } from "./hooks/useUserGames";
import { DataTable } from "./DataTable";
import { useUser } from "@/hooks/useUser";

type GameTableVariant = "preview" | "full";

export type GameTableProps = {
  variant?: GameTableVariant;
  title?: string;
  actionHref?: string;
  limit?: number;
};

export const GameTable = ({
  variant = "full",
  title = "Recent Games",
  actionHref,
  limit = 10,
}: GameTableProps) => {
  const isPreview = variant === "preview";
  const { id: userId } = useUser();
  const { games, isPending, page, setPage, pagination } = useUserGames({
    defaultLimit: limit,
  });

  const columns = useMemo(() => createColumns(userId), [userId]);

  const paginationProps = useMemo(() => {
    const totalPages = pagination?.totalPages ?? 1;
    return {
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }, [page, pagination?.totalPages]);

  const showLoading = isPending && games.length === 0;

  return (
    <section className="space-y-4">
      {isPreview && actionHref && (
        <div className="flex items-center justify-between">
          <Link to={actionHref} className="text-lg font-semibold">
            {title}
          </Link>
        </div>
      )}

      <DataTable
        columns={columns}
        data={games}
        enablePagination={!isPreview}
        isLoading={showLoading}
        pageSize={limit}
        onPageChange={setPage}
        {...paginationProps}
      />
    </section>
  );
};

export default GameTable;
