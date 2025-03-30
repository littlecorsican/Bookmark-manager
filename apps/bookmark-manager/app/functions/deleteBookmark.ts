import { API } from "@/utils/API";

export async function deleteBookmark(
    id: number
) {
    try {

        const response = await fetch(API.bookmarks, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || "Failed to delete bookmark");
        }

        const response_json = await response.json();

        return response_json;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("Error delete bookmark:", e.message);
            throw new Error(`Error delete bookmark: ${e.message}`);
        } else {
            console.error("Unknown error occurred:", e);
            throw new Error("Unknown error occurred while delete bookmark");
        }
    }
}
