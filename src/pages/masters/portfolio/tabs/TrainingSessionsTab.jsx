import { useMemo } from "react";
import {
  Dumbbell,
  Move,
  PawPrint,
  PersonStanding,
  Flame,
  Zap,
  HeartPulse,
  Activity,
  Play,
  Pencil,
  Trash2,
  Plus,
  Upload,
  Video,
} from "lucide-react";
import { resolveMediaUrl } from "@/lib/portfolioMedia";

const ICON_MAP = {
  Dumbbell,
  Move,
  PawPrint,
  PersonStanding,
  Flame,
  Zap,
  HeartPulse,
  Activity,
};

export function TrainingSessionsTab({
  items = [],
  viewMode = "grid",
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
  onAddProgram,
  onAddClip,
}) {
  const programs = useMemo(
    () =>
      items.filter(
        (i) => i.section === "TRAINING_SESSION" || i.category === "SESSION_DISCIPLINE"
      ),
    [items]
  );
  const clips = useMemo(
    () =>
      items.filter(
        (i) => i.section === "SESSION_CLIP" || i.category === "SESSION_CLIP"
      ),
    [items]
  );

  return (
    <div className="space-y-6">
      {/* ── Segment A: Training Programs (Cards) ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-foreground flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Workout Programs & Sessions
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Program cards displayed in the 4-column overview grid on the portfolio page.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddProgram}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus size={14} className="text-primary" />
            Add Program Card
          </button>
        </div>

        {programs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/20">
            <p className="text-xs text-muted-foreground">No program cards found.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((s) => {
              const IconComp = ICON_MAP[s.icon] || Dumbbell;
              return (
                <div
                  key={s.id}
                  className="group relative rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <IconComp size={20} />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(s)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                          title="Edit Program"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(s)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                          title="Delete Program"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 className="mt-3 font-display text-base font-bold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-3">
                      {s.subtitle || "No description provided."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="py-3 px-4">Icon & Title</th>
                  <th className="py-3 px-4">Overview</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {programs.map((s) => {
                  const IconComp = ICON_MAP[s.icon] || Dumbbell;
                  return (
                    <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <IconComp size={15} />
                        </div>
                        {s.title}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground max-w-sm truncate">
                        {s.subtitle || "—"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onEdit(s)}
                            className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(s)}
                            className="p-1 rounded-md text-muted-foreground hover:text-destructive cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Segment B: Vertical Video Clips (9:16 Reels) ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-foreground flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Session Video Reels (9:16)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Vertical video reels featured in the training sessions carousel.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddClip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <Upload size={14} className="text-primary" />
            Upload Video Reel
          </button>
        </div>

        {clips.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/20">
            <p className="text-xs text-muted-foreground">No vertical video clips uploaded yet.</p>
            <button
              type="button"
              onClick={onAddClip}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Upload size={14} />
              Upload First Video Reel
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clips.map((clip) => (
              <div
                key={clip.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card flex flex-col justify-between transition-all hover:border-primary/40 hover:shadow-md"
              >
                {/* 9:16 Reel Poster / Video Container */}
                <div className="relative aspect-9/16 w-full bg-black overflow-hidden flex items-center justify-center">
                  {clip.mediaUrl ? (
                    <video
                      src={clip.thumbnailUrl ? resolveMediaUrl(clip.mediaUrl) : `${resolveMediaUrl(clip.mediaUrl)}#t=1.2`}
                      poster={clip.thumbnailUrl ? resolveMediaUrl(clip.thumbnailUrl) : undefined}
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                      <Video size={28} className="mb-1 text-muted-foreground/60" />
                      <span className="text-[11px]">No video file</span>
                    </div>
                  )}

                  {/* Play preview overlay */}
                  {clip.mediaUrl && (
                    <button
                      type="button"
                      onClick={() => onPreview(clip)}
                      className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-primary transition-all scale-95 group-hover:scale-105 cursor-pointer shadow-lg"
                      title="Play Preview"
                    >
                      <Play size={20} className="fill-white ml-0.5" />
                    </button>
                  )}

                  {/* Action icons overlay on top right */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(clip)}
                      className="p-1.5 rounded-lg bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                      title="Edit Clip"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(clip)}
                      className="p-1.5 rounded-lg bg-black/70 text-red-400 hover:bg-destructive hover:text-white transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                      title="Delete Clip"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Footer caption */}
                <div className="p-3.5 border-t border-border bg-card">
                  <h4 className="text-xs font-bold text-foreground truncate">{clip.title}</h4>
                  {clip.subtitle && (
                    <p className="text-[10px] text-muted-foreground truncate">{clip.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainingSessionsTab;
