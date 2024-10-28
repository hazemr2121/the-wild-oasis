import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Error fetching cabins", error);
    throw new Error(error.message);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");

  // 1. Create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  const { data, error } = await query.select().single();
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  if (error) {
    console.error("Error deleting cabins", error);
    throw new Error(error.message);
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image

  if (storageError) {
    console.error("Error uploading image", storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(storageError.message);
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Error deleting cabins", error);
    throw new Error(error.message);
  }
}
