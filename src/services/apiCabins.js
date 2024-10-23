import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Error fetching cabins", error);
    throw new Error(error.message);
  }
  return data;
}
