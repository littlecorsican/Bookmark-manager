import { API } from "@/utils/API";

export async function deleteTagFn(name: string) {
  try {
    const response = await fetch(`${API.tag}/${name}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error deleting tag:", data.error);
      return;
    }

    

  } catch (error) {
    console.error("Failed to delete tag:", error);
  }
}

