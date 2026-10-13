import { useMemo } from "react";
import {
  Video,
  Play,
  Pencil,
  Trash2,
  Upload,
  ArrowLeft,
  ArrowRight,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { resolveMediaUrl } from "@/lib/portfolioMedia";

export function VideosTab({
  items = [],
  viewMode = "grid",
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
  onReorder,
  onAddVideo,
}) {
  const videos = useMemo(
    () =>
      items
        .filter(
          (i) =>
            i.section === "VIDEO" ||
            i.category === "MOVEMENT_VIDEO" ||
            i.category === "VIDEO"
        )
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [items]
  );

  const handleMove = (index, direction) => {
    if (!onReorder) return;
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= videos.length) return;

    const newVideos = [...videos];
    const temp = newVideos[index];
    newVideos[index] = newVideos[targetIndex];
    newVideos[targetIndex] = temp;

    const reorderedPayload = newVideos.map((v, idx) => ({
      id: v.id,
      order: idx + 1,
    }));
    onReorder(reorderedPayload);
  };

  return (
    <div className="space-y-4">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-display text-foreground flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Movement Showcase Videos (16:9 Landscape)
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cinematic movement and workout videos featured in the 3-column grid on the portfolio page.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddVideo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Upload size={14} className="text-primary" />
          Upload Showcase Video
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card/20">
          <Video size={32} className="text-muted-foreground/60 mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground">No showcase videos uploaded yet</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add 16:9 landscape movement videos to populate the See the Movement section.
          </p>
          <button
            type="button"
            onClick={onAddVideo}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Upload size={14} />
            Upload First Video
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, index) => (
            <div
              key={v.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card flex flex-col justify-between transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {/* 16:9 Landscape Video Container */}
              <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
                {v.mediaUrl ? (
                  <video
                    src={v.thumbnailUrl ? resolveMediaUrl(v.mediaUrl) : `${resolveMediaUrl(v.mediaUrl)}#t=1.2`}
                    poster={v.thumbnailUrl ? resolveMediaUrl(v.thumbnailUrl) : undefined}
                    preload="metadata"
                    className={`w-full h-full object-cover ${v.focusPosition || "object-top"}`}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                    <Video size={28} className="mb-1 text-muted-foreground/60" />
                    <span className="text-[11px]">No video source</span>
                  </div>
                )}

                {/* Play preview trigger */}
                {v.mediaUrl && (
                  <button
                    type="button"
                    onClick={() => onPreview(v)}
                    className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-primary transition-all scale-95 group-hover:scale-105 cursor-pointer shadow-lg"
                    title="Play Preview"
                  >
                    <Play size={20} className="fill-white ml-0.5" />
                  </button>
                )}

                {/* Badges on top */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-bold text-white backdrop-blur-xs">
                    #{index + 1}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(v)}
                      className="p-1.5 rounded-lg bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                      title="Edit Video"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(v)}
                      className="p-1.5 rounded-lg bg-black/70 text-red-400 hover:bg-destructive hover:text-white transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                      title="Delete Video"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Focus Position indicator on bottom-left */}
                {v.focusPosition && (
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white/80 font-mono flex items-center gap-1">
                    <SlidersHorizontal size={10} />
                    <span>{v.focusPosition}</span>
                  </div>
                )}
              </div>

              {/* Card Footer with Details & Position */}
              <div className="p-4 border-t border-border bg-card flex flex-col justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground truncate" title={v.title}>
                    {v.title}
                  </h3>
                </div>

                {/* Reorder Left / Right in 3-column Grid */}
                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                  <span>Grid Position: #{index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, "left")}
                      className={`p-1 rounded bg-muted/60 hover:bg-muted text-foreground transition-all ${
                        index === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                      }`}
                      title="Shift Left"
                    >
                      <ArrowLeft size={12} />
                    </button>
                    <button
                      type="button"
                      disabled={index === videos.length - 1}
                      onClick={() => handleMove(index, "right")}
                      className={`p-1 rounded bg-muted/60 hover:bg-muted text-foreground transition-all ${
                        index === videos.length - 1
                          ? "opacity-30 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      title="Shift Right"
                    >
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">Video Title</th>
                <th className="py-3 px-4">Focus Framing</th>
                <th className="py-3 px-4">Grid Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {videos.map((v, index) => (
                <tr key={v.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="h-10 w-16 rounded-lg overflow-hidden border border-border bg-black flex items-center justify-center relative group">
                      {v.mediaUrl ? (
                        <video src={v.mediaUrl} className="h-full w-full object-cover" />
                      ) : (
                        <Video size={14} className="text-muted-foreground" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-foreground max-w-sm truncate">
                    {v.title}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground font-mono">
                    {v.focusPosition || "object-top"}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground font-mono">#{index + 1}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {v.mediaUrl && (
                        <button
                          type="button"
                          onClick={() => onPreview(v)}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Preview"
                        >
                          <Eye size={13} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onEdit(v)}
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(v)}
                        className="p-1 rounded-md text-muted-foreground hover:text-destructive cursor-pointer"
                        title="Delete"
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
  );
}

export default VideosTab;
