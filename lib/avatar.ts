import * as ImagePicker from "expo-image-picker";
import { supabase } from "./supabase";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function pickAndUploadAvatar(
  userId: string,
): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });
  if (result.canceled) return null;

  const asset = result.assets[0];
  const contentType = asset.mimeType ?? "image/jpeg";
  const ext = EXT_BY_MIME[contentType];
  if (!ext) throw new Error("Please choose a JPG, PNG or WebP image.");
  if (asset.fileSize && asset.fileSize > MAX_BYTES) {
    throw new Error("Image is too large. Maximum size is 5MB.");
  }

  const buffer = await (await fetch(asset.uri)).arrayBuffer();
  if (buffer.byteLength > MAX_BYTES) {
    throw new Error("Image is too large. Maximum size is 5MB.");
  }

  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, buffer, { contentType, upsert: true });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  const url = `${data.publicUrl}?t=${Date.now()}`; // cache-bust after replacing

  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: url },
  });
  if (updateError) throw updateError;

  return url;
}
