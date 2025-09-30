import type { profileProps } from "../pages/dashboard/student/ProfileEdit";
import { supabase } from "../supabaseClient";

export const getCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) throw error;
  return data;
};

export const getProfileData = async (userId: string|undefined) => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profiles) {
    console.log(profiles)
    return profiles;
  }
  if (error) {
    console.error(error);
  }
};



export const updateUserProfile = async (userId: string, profileData: Partial<profileProps>) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)       
    .eq("id", userId)          
    .select();

  if (data) {
    console.log("Updated profile:", data);
  }

  if (error) {
    console.error("Error updating profile:", error);
  }

  return { data, error };
};


