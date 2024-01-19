import { TablesInsert } from "@/types/supabase";

export type FormSpace = "formSpace";

export type FormCharacter = "formCharacter";

export type Procedure = FormSpace | FormCharacter;

export type SpaceInfo = Partial<
  TablesInsert<"spaces"> & { space_display_name: string; space_avatar: string }
>;

export type UserProfile = TablesInsert<"space_members">;
