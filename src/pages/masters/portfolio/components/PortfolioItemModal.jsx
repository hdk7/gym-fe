/* eslint-disable max-lines */
import { useState, useEffect } from "react";
import {
  Sparkles,
  Dumbbell,
  MessageSquareQuote,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import {
  FormModal,
  FormModalHeader,
  FormModalBody,
  FormModalFooter,
  FormSectionHeader,
} from "@/components/ui/FormModal";
import { InputField, SelectField, TextareaField } from "@/components/form";
import { MediaUploadDropzone } from "./MediaUploadDropzone";
import { uploadPortfolioMedia, uploadPhoto } from "@/lib/portfolioService";

const FOCUS_OPTIONS = [
  { value: "object-top", label: "Top Focused (object-top)" },
  { value: "object-center", label: "Center Focused (object-center)" },
  { value: "object-bottom", label: "Bottom Focused (object-bottom)" },
];

const EMPTY_FORM = {
  section: "TRAINING_SESSION",
  title: "",
  subtitle: "",
  mediaUrl: "",
  publicId: "",
  thumbnailUrl: "",
  duration: "50 min",
  level: "All levels",
  icon: "Dumbbell",
  rating: 5,
  focusPosition: "object-top",
  tag: "",
  order: 1,
  status: "Active",
};

export function PortfolioItemModal({
  isOpen,
  onClose,
  editingItem,
  defaultSection,
  onSave,
  isSubmitting,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingItem) {
      setForm({
        section: editingItem.section || "TRAINING_SESSION",
        title: editingItem.title || editingItem.authorName || editingItem.altText || "",
        subtitle: editingItem.subtitle || editingItem.authorRole || editingItem.description || "",
        mediaUrl: editingItem.mediaUrl || "",
        publicId: editingItem.publicId || "",
        thumbnailUrl: editingItem.thumbnailUrl || "",
        duration: editingItem.duration || editingItem.durationText || "",
        level: editingItem.level || "All levels",
        icon: editingItem.icon || editingItem.iconKey || "Dumbbell",
        rating: editingItem.rating || 5,
        focusPosition: editingItem.focusPosition || "object-top",
        tag: editingItem.tag || editingItem.quote || "",
        order: editingItem.order ?? editingItem.displayOrder ?? 1,
        status: editingItem.status || "Active",
      });
    } else {
      setForm({
        ...EMPTY_FORM,
        section: defaultSection || "TRAINING_SESSION",
      });
    }
    setErrors({});
  }, [editingItem, defaultSection, isOpen]);

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) {
      errs.title =
        form.section === "FEEDBACK_QUOTE"
          ? "Member name is required."
          : form.section === "PHOTO"
          ? "Photo caption is required."
          : "Title is required.";
    }

    // Require media upload for Photos and Videos
    if (form.section === "PHOTO" && !form.mediaUrl.trim()) {
      errs.mediaUrl = "Please upload a photo asset or enter an image URL.";
    }

    if (
      (form.section === "VIDEO" ||
        form.section === "SESSION_CLIP" ||
        form.section === "FEEDBACK_VIDEO") &&
      !form.mediaUrl.trim()
    ) {
      errs.mediaUrl = "Please upload a video file or enter a video URL.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (!validate()) return;
    onSave({
      ...form,
      authorName: form.title,
      authorRole: form.subtitle,
      quote: form.tag,
      description: form.subtitle,
      durationText: form.duration,
      iconKey: form.icon,
      altText: form.title,
      mediaUrl: form.mediaUrl,
      thumbnailUrl: form.thumbnailUrl,
      publicId: form.publicId,
    });
  };

  const getModalIcon = () => {
    switch (form.section) {
      case "TRAINING_SESSION":
        return Dumbbell;
      case "SESSION_CLIP":
      case "FEEDBACK_VIDEO":
      case "VIDEO":
        return Video;
      case "FEEDBACK_QUOTE":
        return MessageSquareQuote;
      case "PHOTO":
        return ImageIcon;
      default:
        return Sparkles;
    }
  };

  const getModalTitle = () => {
    if (editingItem) return `Edit ${form.title || "Item"}`;
    switch (form.section) {
      case "PHOTO":
        return "Upload Floor Photo";
      case "VIDEO":
        return "Upload Showcase Video";
      case "SESSION_CLIP":
        return "Upload Session Video Reel";
      case "FEEDBACK_VIDEO":
        return "Upload Transformation Video Reel";
      case "FEEDBACK_QUOTE":
        return "Add Member Review Quote";
      case "TRAINING_SESSION":
        return "Create Workout Program";
      default:
        return "Create Portfolio Item";
    }
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose} size="lg">
      <FormModalHeader
        title={getModalTitle()}
        description="Upload media assets, configure metadata, and manage portfolio visibility."
        icon={getModalIcon()}
        onClose={onClose}
      />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <FormModalBody className="space-y-6 text-xs p-5 sm:p-6 flex-1 min-h-0 overflow-y-auto">
          {/* ── Media Asset Upload Option for all subtabs ── */}
          <div className="space-y-4">
            <FormSectionHeader
              title="Media Asset Upload"
              subtitle={
                form.section === "PHOTO"
                  ? "Upload high-resolution photo file (drag & drop or browse) or enter direct URL"
                  : form.section === "VIDEO"
                  ? "Upload 16:9 widescreen video file (drag & drop or browse) or enter direct URL"
                  : form.section === "SESSION_CLIP" || form.section === "FEEDBACK_VIDEO"
                  ? "Upload 9:16 vertical video reel file (drag & drop or browse) or enter direct URL"
                  : "Upload optional image asset or enter direct URL"
              }
            />

            <MediaUploadDropzone
              label={
                form.section === "PHOTO"
                  ? "Floor Photo Asset (4:5 Portrait)"
                  : form.section === "VIDEO"
                  ? "Showcase Video Asset (16:9 Landscape)"
                  : form.section === "SESSION_CLIP"
                  ? "Session Video Reel (9:16 Vertical)"
                  : form.section === "FEEDBACK_VIDEO"
                  ? "Transformation Video Reel (9:16 Vertical)"
                  : form.section === "TRAINING_SESSION"
                  ? "Discipline Cover Asset (Optional)"
                  : "Member Photo / Avatar (Optional)"
              }
              fileType={
                form.section === "VIDEO" ||
                form.section === "SESSION_CLIP" ||
                form.section === "FEEDBACK_VIDEO"
                  ? "video"
                  : "image"
              }
              value={form.mediaUrl}
              thumbnailUrl={form.thumbnailUrl}
              onUploadSuccess={(res) => {
                handleChange("mediaUrl", res.url);
                if (res.publicId) handleChange("publicId", res.publicId);
                if (res.thumbnailUrl && !form.thumbnailUrl) {
                  handleChange("thumbnailUrl", res.thumbnailUrl);
                }
              }}
              onClear={() => {
                handleChange("mediaUrl", "");
                handleChange("publicId", "");
              }}
              aspectRecommendation={
                form.section === "PHOTO"
                  ? "Recommended: 4:5 portrait ratio (e.g., 1080×1350px). JPG, PNG, WebP up to 10MB."
                  : form.section === "VIDEO"
                  ? "Recommended: 16:9 landscape widescreen (e.g., 1920×1080px). MP4, WebM up to 50MB."
                  : form.section === "SESSION_CLIP" || form.section === "FEEDBACK_VIDEO"
                  ? "Recommended: 9:16 vertical reel format (e.g., 1080×1920px). MP4, WebM up to 50MB."
                  : "Optional image file (JPG, PNG, WebP up to 10MB)."
              }
              uploadFunction={uploadPortfolioMedia}
            />

            {errors.mediaUrl && (
              <p className="text-xs text-destructive font-medium -mt-2">{errors.mediaUrl}</p>
            )}

            {/* Optional Thumbnail / Poster for Video items */}
            {(form.section === "VIDEO" ||
              form.section === "SESSION_CLIP" ||
              form.section === "FEEDBACK_VIDEO") && (
              <div className="pt-2 border-t border-border/50">
                <MediaUploadDropzone
                  label="Custom Video Poster / Thumbnail (Optional)"
                  fileType="image"
                  value={form.thumbnailUrl}
                  onUploadSuccess={(res) => handleChange("thumbnailUrl", res.url)}
                  onClear={() => handleChange("thumbnailUrl", "")}
                  aspectRecommendation={
                    form.section === "VIDEO"
                      ? "Optional 16:9 matching poster frame. JPG, PNG up to 10MB."
                      : "Optional 9:16 vertical poster frame. JPG, PNG up to 10MB."
                  }
                  uploadFunction={uploadPhoto}
                />
              </div>
            )}
          </div>

          {/* ── Content Details ── */}
          <div className="space-y-4">
            <FormSectionHeader
              title="Content Details"
              subtitle="Configure item labels, descriptions, and metadata"
            />

            <InputField
              label={
                form.section === "FEEDBACK_QUOTE"
                  ? "Member Name"
                  : form.section === "PHOTO"
                  ? "Photo Caption / Alt Text"
                  : "Title"
              }
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder={
                form.section === "TRAINING_SESSION"
                  ? "e.g., Strength Training"
                  : form.section === "FEEDBACK_QUOTE"
                  ? "e.g., Aarav M."
                  : form.section === "PHOTO"
                  ? "e.g., Weighted pull-ups on the rig"
                  : "e.g., Rig conditioning"
              }
              error={errors.title}
              required
            />

            {/* Fields for Training Session Card */}
            {form.section === "TRAINING_SESSION" && (
              <TextareaField
                label="Program Description"
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                placeholder="Progressive overload on barbell and rig work..."
                rows={3}
              />
            )}

            {/* Fields for Session Video Reel or Feedback Video Reel */}
            {(form.section === "SESSION_CLIP" || form.section === "FEEDBACK_VIDEO") && (
              <InputField
                label="Subtitle / Caption"
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                placeholder="e.g., Morning conditioning batch executing rig pull ladders."
              />
            )}

            {/* Fields for Member Feedback Quote */}
            {form.section === "FEEDBACK_QUOTE" && (
              <TextareaField
                label="Review Quote"
                value={form.tag}
                onChange={(e) => handleChange("tag", e.target.value)}
                placeholder="Six months of Animal Flow and calisthenics here changed how my body moves..."
                rows={3}
                required
              />
            )}

            {/* Category / Tag for Photos */}
            {form.section === "PHOTO" && (
              <InputField
                label="Category / Tag"
                value={form.tag}
                onChange={(e) => handleChange("tag", e.target.value)}
                placeholder="e.g., Rig, Calisthenics, Flow, Recovery"
              />
            )}

            {/* Video Framing Alignment */}
            {form.section === "VIDEO" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectField
                  label="Video Frame Alignment"
                  value={form.focusPosition}
                  onChange={(e) => handleChange("focusPosition", e.target.value)}
                  options={FOCUS_OPTIONS}
                />
                <InputField
                  label="Secondary Tag (Optional)"
                  value={form.tag}
                  onChange={(e) => handleChange("tag", e.target.value)}
                  placeholder="e.g., Movement, Strength"
                />
              </div>
            )}
          </div>
        </FormModalBody>

        <FormModalFooter
          onCancel={onClose}
          cancelText="Cancel"
          onSubmit={handleSubmit}
          submitText={isSubmitting ? "Saving..." : editingItem ? "Update Item" : "Save & Upload"}
          isSubmitting={isSubmitting}
        />
      </form>
    </FormModal>
  );
}

export default PortfolioItemModal;
