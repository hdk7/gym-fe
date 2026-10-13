import { useMemo } from "react";
import {
  Image as ImageIcon,
  Eye,
  Pencil,
  Trash2,
  Upload,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { resolveMediaUrl } from "@/lib/portfolioMedia";

export function PhotosTab({
  items = [],
  viewMode = "grid",
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
  onReorder,
  onAddPhoto,
}) {
  const photos = useMemo(
    () =>
      items
        .filter(
          (i) =>
            i.section === "PHOTO" ||
            i.category === "PHOTO" ||
            i.category === "FLOOR_PHOTO"
        )
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [items]
  );

  const handleMove = (index, direction) => {
    if (!onReorder) return;
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const newPhotos = [...photos];
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[targetIndex];
    newPhotos[targetIndex] = temp;

    const reorderedPayload = newPhotos.map((p, idx) => ({
      id: p.id,
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
            <ImageIcon className="h-5 w-5 text-primary" />
            Floor Photos Gallery
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Moments from the floor featured in the auto-scrolling gallery (4:5 portrait aspect ratio).
          </p>
        </div>
        <button
          type="button"
          onClick={onAddPhoto}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Upload size={14} className="text-primary" />
          Upload Photo
        </button>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card/20">
          <ImageIcon size={32} className="text-muted-foreground/60 mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground">No photos uploaded yet</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload high-resolution 4:5 photos to populate the Moments from the Floor section.
          </p>
          <button
            type="button"
            onClick={onAddPhoto}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Upload size={14} />
            Upload First Photo
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {photos.map((p, index) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card flex flex-col justify-between transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {/* 4:5 Portrait Photo Container */}
              <div className="relative aspect-4/5 w-full bg-black overflow-hidden flex items-center justify-center">
                {p.mediaUrl ? (
                  <img
                    src={resolveMediaUrl(p.mediaUrl)}
                    alt={p.title || p.altText || "Floor photo"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                    <ImageIcon size={28} className="mb-1 text-muted-foreground/60" />
                    <span className="text-[10px]">No image asset</span>
                  </div>
                )}

                {/* Hover overlay with zoom & actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-bold text-white backdrop-blur-xs">
                      #{index + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(p)}
                        className="p-1.5 rounded-lg bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                        title="Edit Caption"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(p)}
                        className="p-1.5 rounded-lg bg-black/70 text-red-400 hover:bg-destructive hover:text-white transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                        title="Delete Photo"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {p.mediaUrl && (
                      <button
                        type="button"
                        onClick={() => onPreview(p)}
                        className="p-2.5 rounded-xl bg-white/20 hover:bg-white text-white hover:text-black transition-all cursor-pointer shadow-md"
                        title="Zoom / Preview"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                  </div>

                  {/* Move Left / Right Reorder Buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, "left")}
                      className={`p-1.5 rounded-lg bg-black/60 text-white transition-all ${
                        index === 0
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-primary cursor-pointer"
                      }`}
                      title="Move Left in Carousel"
                    >
                      <ArrowLeft size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={index === photos.length - 1}
                      onClick={() => handleMove(index, "right")}
                      className={`p-1.5 rounded-lg bg-black/60 text-white transition-all ${
                        index === photos.length - 1
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-primary cursor-pointer"
                      }`}
                      title="Move Right in Carousel"
                    >
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-3 border-t border-border bg-card">
                <p className="text-xs font-semibold text-foreground truncate" title={p.title}>
                  {p.title}
                </p>
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
                <th className="py-3 px-4">Thumbnail</th>
                <th className="py-3 px-4">Caption / Alt Text</th>
                <th className="py-3 px-4">Carousel Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {photos.map((p, index) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="h-12 w-10 rounded-lg overflow-hidden border border-border bg-black/40 flex items-center justify-center">
                      {p.mediaUrl ? (
                        <img src={p.mediaUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <ImageIcon size={14} className="text-muted-foreground" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-foreground max-w-sm truncate">
                    {p.title}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground font-mono">#{index + 1}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {p.mediaUrl && (
                        <button
                          type="button"
                          onClick={() => onPreview(p)}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Zoom"
                        >
                          <Eye size={13} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onEdit(p)}
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(p)}
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

export default PhotosTab;
