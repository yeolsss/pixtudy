/* Storage */
import { supabase } from "@/supabase";

const BASE_URL =
  "https://lrklhpcxbdiunpubmvio.supabase.co/storage/v1/object/public/space_thumbnails/";
const BUCKET_NAME = "space_thumbnails";

export const uploadThumbnail = async (thumbnailFile: Blob | File) => {
  const fileName = URL.createObjectURL(thumbnailFile).split("/").at(-1);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName!, thumbnailFile);
  if (!data || !data.path) return { data: "no-path", error };
  return { data: BASE_URL + data.path, error };
};

export const deleteThumbnail = async (fileName: string) => {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);
  return !error;
};
