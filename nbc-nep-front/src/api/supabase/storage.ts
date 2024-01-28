/* Storage */

import { supabase } from "@/supabase/supabase";

export const uploadThumbnail = async (
  thumbnailFile: Blob | File,
  fileName: string
) => {
  const BASE_URL =
    "https://lrklhpcxbdiunpubmvio.supabase.co/storage/v1/object/public/space_thumbnails/";
  const BUCKET_NAME = "space_thumbnails";

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, thumbnailFile, { upsert: true, cacheControl: "0" });
  return { data: BASE_URL + data?.path, error };
};
