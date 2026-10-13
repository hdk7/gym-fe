import { Layers, Image as ImageIcon, Video, MessageSquareQuote } from "lucide-react";

export function PortfolioStats({ stats = {} }) {
  return (
    <div className="shrink-0 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {/* Total Portfolio Items */}
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Total Items</span>
          <Layers size={16} className="text-muted-foreground" />
        </div>
        <div className="mt-1 text-xl sm:text-2xl font-extrabold text-foreground">
          {stats.total ?? 0}
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground">Across all portfolio sections</p>
      </div>

      {/* Floor Photos */}
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Floor Photos</span>
          <ImageIcon size={16} className="text-emerald-400" />
        </div>
        <div className="mt-1 text-xl sm:text-2xl font-extrabold text-emerald-400">
          {stats.photos ?? 0}
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground">Moments from the floor gallery</p>
      </div>

      {/* Videos & Reels */}
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Videos & Reels</span>
          <Video size={16} className="text-blue-400" />
        </div>
        <div className="mt-1 text-xl sm:text-2xl font-extrabold text-blue-400">
          {stats.videos ?? 0}
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground">Movement showcases & reels</p>
      </div>

      {/* Member Testimonials */}
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Feedback & Quotes</span>
          <MessageSquareQuote size={16} className="text-amber-400" />
        </div>
        <div className="mt-1 text-xl sm:text-2xl font-extrabold text-foreground">
          {stats.feedback ?? 0}
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground">Member reviews & transformations</p>
      </div>
    </div>
  );
}

export default PortfolioStats;
