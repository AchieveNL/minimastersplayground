import type { SupabaseClient } from "@supabase/supabase-js";

export const IMAGE_BUCKET = "site-images";

// Uploads stay well under the free storage tier and load fast on mobile.
const MAX_EDGE = 1600;
const WEBP_QUALITY = 0.82;
/** Matches the bucket's own limit, checked before we read the file. */
export const MAX_SOURCE_MB = 10;

export type ImageSlot = {
  /** Shown in the dashboard so the client knows what to upload. */
  hint: string;
  /** width / height the artwork is designed for */
  ratio: number;
};

export const IMAGE_SLOTS: Record<string, ImageSlot> = {
  slider: { hint: "900 × 1200 px (staand, 3:4)", ratio: 3 / 4 },
  fotostrook: { hint: "1200 × 800 px (liggend, 3:2)", ratio: 3 / 2 },
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Afbeelding kon niet worden gelezen"));
    };
    img.src = url;
  });
}

/** Scales down to MAX_EDGE and re-encodes as WebP so uploads stay small. */
async function compress(file: File): Promise<{ blob: Blob; ratio: number }> {
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas niet beschikbaar");
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
  );
  if (!blob) throw new Error("Comprimeren mislukt");
  return { blob, ratio: img.width / img.height };
}

export function isStoredImage(url: string) {
  return url.includes(`/storage/v1/object/public/${IMAGE_BUCKET}/`);
}

/**
 * Compresses, uploads and returns the public URL. Replacing an image also
 * removes the previous upload so the bucket does not grow without bound.
 */
export async function uploadSiteImage(
  supabase: SupabaseClient,
  file: File,
  section: string,
  previousUrl?: string,
): Promise<{ url: string; sizeKb: number; ratio: number }> {
  if (file.size > MAX_SOURCE_MB * 1024 * 1024) {
    throw new Error(
      `Deze afbeelding is ${(file.size / 1024 / 1024).toFixed(
        1,
      )} MB. Maximaal ${MAX_SOURCE_MB} MB toegestaan.`,
    );
  }
  const { blob, ratio } = await compress(file);
  const name = `${section}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.webp`;

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(name, blob, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(name);

  if (previousUrl && isStoredImage(previousUrl)) {
    const oldName = previousUrl.split(`/${IMAGE_BUCKET}/`)[1];
    if (oldName) await supabase.storage.from(IMAGE_BUCKET).remove([oldName]);
  }

  return { url: publicUrl, sizeKb: Math.round(blob.size / 1024), ratio };
}
