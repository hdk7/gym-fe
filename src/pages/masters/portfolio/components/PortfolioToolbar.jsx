import { Search, LayoutGrid, List, Plus } from "lucide-react";

export function PortfolioToolbar({
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onAddItem,
  addItemLabel = "Add Item",
  totalCount = 0,
}) {
  return (
    <div className="shrink-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      {/* Items Count */}
      <div className="flex items-center gap-1.5">
        {totalCount > 0 && (
          <span className="text-xs font-semibold text-muted-foreground px-1">
            {totalCount} {totalCount === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {/* Search, view switcher, add action */}
      <div className="flex items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search title, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-1.5 pl-8.5 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center border border-border rounded-xl p-0.5 bg-background">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Grid View"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "table"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Table View"
          >
            <List size={15} />
          </button>
        </div>

        {/* Add button */}
        {onAddItem && (
          <button
            type="button"
            onClick={onAddItem}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-xs hover:bg-primary/90 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={15} />
            <span>{addItemLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default PortfolioToolbar;
