/* Storage */

import { supabase } from "@/supabase/supabase";

export const uploadThumbnail = async (thumbnailFile: Blob | File) => {
  const BASE_URL =
    "https://lrklhpcxbdiunpubmvio.supabase.co/storage/v1/object/public/space_thumbnails/";
  const BUCKET_NAME = "space_thumbnails";

  const fileName = URL.createObjectURL(thumbnailFile).split("/").at(-1);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName!, thumbnailFile);
  return { data: BASE_URL + data?.path, error };
};
