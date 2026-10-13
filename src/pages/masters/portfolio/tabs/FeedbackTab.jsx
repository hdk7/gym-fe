import { useMemo } from "react";
import {
  MessageSquareQuote,
  Video,
  Play,
  Pencil,
  Trash2,
  Plus,
  Upload,
} from "lucide-react";
import { resolveMediaUrl } from "@/lib/portfolioMedia";

export function FeedbackTab({
  items = [],
  viewMode = "grid",
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
  onAddQuote,
  onAddVideo,
}) {
  const quotes = useMemo(
    () =>
      items.filter(
        (i) =>
          i.section === "FEEDBACK_QUOTE" ||
          (i.category === "FEEDBACK_STORY" && i.mediaType !== "VIDEO" && !i.mediaUrl?.endsWith(".mp4"))
      ),
    [items]
  );
  const videos = useMemo(
    () =>
      items.filter(
        (i) =>
          i.section === "FEEDBACK_VIDEO" ||
          (i.category === "FEEDBACK_STORY" && (i.mediaType === "VIDEO" || i.mediaUrl?.endsWith(".mp4")))
      ),
    [items]
  );

  return (
    <div className="space-y-6">
      {/* ── Segment A: Member Testimonial Quotes ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-foreground flex items-center gap-2">
              <MessageSquareQuote className="h-5 w-5 text-primary" />
              Member Reviews & Testimonials
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Written member feedback cards shown in the 3-column feedback section.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddQuote}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus size={14} className="text-primary" />
            Add Review Quote
          </button>
        </div>

        {quotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/20">
            <p className="text-xs text-muted-foreground">No written reviews added yet.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="group relative rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs leading-relaxed text-foreground italic line-clamp-4">
                    &ldquo;{q.quote || q.tag || q.subtitle || "No quote text provided."}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-foreground">{q.authorName || q.title}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(q)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                      title="Edit Review"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(q)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Quote Snippet</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((q) => (
                  <tr key={q.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground">{q.title}</td>
                    <td className="py-3 px-4 text-muted-foreground max-w-md truncate">
                      {q.tag || q.subtitle || "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(q)}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(q)}
                          className="p-1 rounded-md text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Segment B: Transformation Video Reels (9:16) ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-foreground flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Transformation Videos (9:16 Reels)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Member transformation video reels shown in the feedback carousel.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddVideo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <Upload size={14} className="text-primary" />
            Upload Video Reel
          </button>
        </div>

        {videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/20">
            <p className="text-xs text-muted-foreground">No transformation video reels uploaded yet.</p>
            <button
              type="button"
              onClick={onAddVideo}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Upload size={14} />
              Upload First Video Reel
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card flex flex-col justify-between transition-all hover:border-primary/40 hover:shadow-md"
              >
                {/* 9:16 Reel Player / Poster */}
                <div className="relative aspect-9/16 w-full bg-black overflow-hidden flex items-center justify-center">
                  {vid.mediaUrl ? (
                    <video
                      src={vid.thumbnailUrl ? resolveMediaUrl(vid.mediaUrl) : `${resolveMediaUrl(vid.mediaUrl)}#t=1.2`}
                      poster={vid.thumbnailUrl ? resolveMediaUrl(vid.thumbnailUrl) : undefined}
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
                  {vid.mediaUrl && (
                    <button
                      type="button"
                      onClick={() => onPreview(vid)}
                      className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-primary transition-all scale-95 group-hover:scale-105 cursor-pointer shadow-lg"
                      title="Play Preview"
                    >
                      <Play size={20} className="fill-white ml-0.5" />
                    </button>
                  )}

                </div>

                {/* Footer caption & actions */}
                <div className="p-3.5 flex items-center justify-between gap-2 border-t border-border bg-card">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground truncate">{vid.title}</h4>
                    {vid.subtitle && (
                      <p className="text-[10px] text-muted-foreground truncate">{vid.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onEdit(vid)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                      title="Edit Transformation"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(vid)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors"
                      title="Delete Transformation"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackTab;
