import { TablesInsert } from "@/types/supabase.types";

export type FormSpace = "formSpace";

export type FormCharacter = "formCharacter";

export type Procedure = FormSpace | FormCharacter;

// export type CreateSpaceInfo = Partial<
//   TablesInsert<"spaces"> & { space_display_name: string; space_avatar: string }
// >;
export type CreateSpaceInfo = Partial<
  TablesInsert<"spaces"> & TablesInsert<"space_members">
>;

export type UserProfile = {
  avatar: string;
  display_name: string;
  owner: string;
};
