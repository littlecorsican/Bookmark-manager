import { API } from "@/utils/API";

export async function getBookmark(
    id: number
) {
    try {

        const response = await fetch(API.bookmark + "/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || "Failed to get bookmark");
        }

        const response_json = await response.json();

        return response_json;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("Error get bookmark:", e.message);
            throw new Error(`Error get bookmark: ${e.message}`);
        } else {
            console.error("Unknown error occurred:", e);
            throw new Error("Unknown error occurred while get bookmark");
        }
    }
}
